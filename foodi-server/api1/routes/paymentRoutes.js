const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Payment = require('../models/Payments');
const Cart = require('../models/Carts'); // Import your Cart model
const ObjectId = mongoose.Types.ObjectId;
const verifyToken = require('../middleware/verifyToken');
require('dotenv').config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// Create Order using Razorpay
router.post('/order', verifyToken, async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something went wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Save Payment Information and Clear Cart
router.post('/', async (req, res) => {
    const payment = req.body;

    try {
        // Create a new payment using Mongoose model
        const paymentResult = await Payment.create(payment);

        // Delete items from the cart
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deleteResult = await Cart.deleteMany({ _id: { $in: cartIds } });

        res.status(200).json({ paymentResult, deleteResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Payment Information for Specific User
router.get('/', verifyToken, async (req, res) => {
    const email = req.query.email;
    const query = { email: email };

    try {
        const decodedEmail = req.decoded.email;

        if (email !== decodedEmail) {
            return res.status(403).json({ message: "Forbidden access!" });
        }

        const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Payment Information
router.get('/all', async (req, res) => {
    try {
        const payments = await Payment.find({}).sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Confirm Payment Status
router.patch('/:id', verifyToken, async (req, res) => {
    const payId = req.params.id;
    const { status } = req.body;

    try {
        const updatedStatus = await Payment.findByIdAndUpdate(
            payId,
            { status: status },
            { new: true, runValidators: true }
        );

        if (!updatedStatus) {
            return res.status(404).json({ message: 'Payment ID not found' });
        }

        res.status(200).json(updatedStatus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
