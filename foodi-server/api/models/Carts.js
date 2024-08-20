const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    menuItemId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    },
    recipe: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
}, {
    timestamps: true,
});

const Carts = mongoose.model('Cart', cartSchema);

module.exports = Carts;
