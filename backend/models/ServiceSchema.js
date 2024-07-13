import mongoose from "mongoose";


const ServiceSchema = new mongoose.Schema({
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true
    },
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    averageRating: {
        type: Number,
        default: 0,
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;


