import Booking from '../models/BookingSchema.js';
import Service from '../models/ServiceSchema.js';

const createBooking = async (req, res) => {
    const { clientId, serviceProviderId, date, price, bookingStatus, paymentType, isPaid, serviceId } = req.body;

    try {
        // Validate required fields
        if (!clientId || !serviceProviderId || !date || !price || !paymentType) {
            return res.status(400).json({
                type: 'error',
                message: 'Missing required fields',
            });
        }

        // Create a new booking
        const newBooking = new Booking({
            clientId,
            serviceProviderId,
            date,
            price,
            bookingStatus ,
            paymentType,
            isPaid,
        });

        // Save the booking to the database
        const savedBooking = await newBooking.save();

        await Service.findByIdAndUpdate(serviceId, {
            $push: { bookings: savedBooking._id }
        });

        // add service id to booking response
        savedBooking.serviceId = serviceId;

        // get service name by service id
        const {title} = await Service.findById(serviceId);

        const bookingData = { ...savedBooking._doc, serviceId, serviceName: title };

        return res.status(201).json({
            type: 'success',
            message: 'Booking created successfully',
            data: bookingData,
        });
    } catch (error) {
        return res.status(500).json({
            type: 'error',
            message: 'Failed to create booking',
            error: error.message,
        });
    }
};

const getBookingById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the booking by ID and populate the service provider and client details
        const booking = await Booking.findById(id)
            // .populate('serviceProviderId', 'businessName')
            .populate('clientId', 'name email');

        if (!booking) {
            return res.status(404).json({
                type: 'error',
                message: 'Booking not found',
            });
        }

        res.status(200).json({
            type: 'success',
            message: 'Booking retrieved successfully',
            data: booking,
        });
    } catch (error) {
        res.status(500).json({
            type: 'error',
            message: 'Failed to retrieve booking',
            error: error.message,
        });
    }
};

const updateBookingById = async (req, res) => {
    const { id } = req.params;
    const { price, date, bookingStatus, paymentType, isPaid } = req.body;

    try {
        // Find the booking by ID and update it with the new data
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            {
                price,
                date,
                bookingStatus,
                paymentType,
                isPaid,
            },
            { new: true } // Return the updated document
        )
        // .populate('serviceProvider', 'businessName')
        .populate('clientId', 'name email');

        if (!updatedBooking) {
            return res.status(404).json({
                type: 'error',
                message: 'Booking not found',
            });
        }

        res.status(200).json({
            type: 'success',
            message: 'Booking updated successfully',
            data: updatedBooking,
        });
    } catch (error) {
        res.status(500).json({
            type: 'error',
            message: 'Failed to update booking',
            error: error.message,
        });
    }
};

// get booking by user ID (for customers)
const getBookingsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ clientId: userId })
            .populate('clientId', 'name email') // Populate user details if needed
            .populate('serviceProviderId', 'businessName') // Populate service provider details if needed
            .exec();

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user.' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error while fetching bookings.' });
    }
};


const getBookingsByServiceProviderId = async (req, res) => {
    const { serviceProviderId } = req.params;

    try {
        const bookings = await Booking.find({ serviceProviderId })
            .populate('clientId', 'name email') // Populate user details if needed
            // .populate('serviceProviderId', 'businessName') // Populate service provider details if needed
            .exec();

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this service provider.' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error while fetching bookings.' });
    }
};

export { createBooking, getBookingById, updateBookingById, getBookingsByUserId, getBookingsByServiceProviderId };
