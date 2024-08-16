import { Router } from 'express';
import { createBooking, getBookingById, updateBookingById } from '../Controllers/bookingController.js';
import { authenticate, allowOnly } from '../auth/verifyToken.js';

const router = Router();

// create booking
router.post('/create', authenticate, allowOnly(['customer', 'service-provider', 'services-provider']), createBooking);

// get booking by id
router.get('/:id', authenticate, allowOnly(['customer', 'service-provider', 'services-provider']), getBookingById);

// update booking by id
router.patch('/:id', authenticate, allowOnly(['customer', 'service-provider', 'services-provider']), updateBookingById);

export default router;