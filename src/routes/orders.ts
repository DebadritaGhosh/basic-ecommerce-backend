import { Router } from 'express';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrders, listUserOrders } from '../controllers/orders';
import adminMiddleware from '../middlewares/admin';

const orderRoutes: Router = Router();

// User
orderRoutes.post('/', [authMiddleware], errorHandler(createOrder));
orderRoutes.get('/', [authMiddleware], errorHandler(listOrders));
orderRoutes.put('/:id/cancel', [authMiddleware], errorHandler(cancelOrder));
// Admin
orderRoutes.get('/index', [authMiddleware,adminMiddleware], errorHandler(listAllOrders));
orderRoutes.get('/users/:id', [authMiddleware,adminMiddleware], errorHandler(listUserOrders));
orderRoutes.put('/:id/status', [authMiddleware,adminMiddleware], errorHandler(changeStatus));
// User
orderRoutes.get('/:id', [authMiddleware], errorHandler(getOrderById));

export default orderRoutes;