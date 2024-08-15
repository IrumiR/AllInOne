import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            serviceProvider: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ServiceProvider',
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        address_line_1: {
            type: String,
            required: true,
        },
        address_line_2: {
            type: String,
        },
        city: {
            type: String,
        },
        district: {
            type: String,
        },
        province: {
            type: String,
        },
        postal_code: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'dispatched', 'delivered', 'cancelled'],
        default: 'pending',
    },
    stripeSessionId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Order', OrderSchema);
