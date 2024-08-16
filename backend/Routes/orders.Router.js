import { Router } from 'express';
import { createOrder, getAllOrders, getOrderById, editOrder, deleteOrder, getOrdersByUserId } from '../Controllers/orderController.js';

const router = Router();

// create order
router.post('/create', createOrder);

// delete order
router.delete('/delete/:id', deleteOrder);

// edit order
router.patch('/edit/:id', editOrder);

// get all orders
router.get('/', getAllOrders);

// get order by id
router.get('/:id', getOrderById);

// get order by order id
router.get('/user/:userId', getOrdersByUserId);


export default router;