const express = require('express');
const Payment = require('../models/Payments');
// const Payment = require('../models/Payment');
const stripe = require('stripe')('sk_test_51PZQ6TSFXT29tkA3styQv0zbk6vNi6NlM5GU9Kvonp1dSNeOiMQ9ODGhOPEb5i2CSqgTCnMvmQipdzk0JHZ20HvO002bqWTb4X');
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { items, email } = req.body; // Assuming email is also sent in the body
    console.log(items);
    const lineItems = items.map((item) => {
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Stripe expects the amount in paisa
            },
            quantity: item.quantity,
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:6001/checkout/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:6001/checkout/cancel',
            customer_email: email,
            payment_intent_data: {
                receipt_email: email,
                shipping: {
                    name: 'John Doe',
                    address: {
                        line1: '1234 Main Street',
                        city: 'Mumbai',
                        state: 'MH',
                        postal_code: '400001',
                        country: 'IN',
                    },
                },
            },
        });
        console.log(session.url);
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/success', async (req, res) => {
    const { session_id } = req.query;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items'],
        });

        const payment = new Payment({
            transitionId: session.id,
            email: session.customer_email,
            price: session.amount_total / 100,
            quantity: session.line_items.data.reduce((total, item) => total + item.quantity, 0),
            status: session.payment_status,
            itemsName: session.line_items.data.map(item => item.description),
            cartItems: session.line_items.data,
            menuItems: session.line_items.data, // Adjust based on your actual structure
        });

        await payment.save();

        res.send(`
            <html>
                <body>
                    <h1>Payment Successful!</h1>
                    <p>Thank you for your purchase. Your transaction was successful.</p>
                    <a href="http://localhost:5173/">Go back to the home page</a>
                </body>
            </html>
        `);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/cancel', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Payment Cancelled</h1>
                <p>Your payment was cancelled. Please try again.</p>
                <a href="http://localhost:5173/">Go back to the home page</a>
            </body>
        </html>
    `);
});

module.exports = router;
