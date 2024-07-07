import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    address_line_1: {
        type: String,
        required: true
    },
    address_line_2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    postal_code: {
        type: Number,
        required: true
    },
    photo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        role: { type: String, enum: ['customer', 'service-provider', 'super-admin', 'delivery-person'], default: 'customer' },
        default: "customer"
    },
    // bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }]
});


export default mongoose.model("User", UserSchema);