import { Router } from 'express';
import { addItemToCart, getCart, deleteItemFromCart, changeQuantity } from '../controllers/cart';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';

const cartRoutes: Router = Router();

cartRoutes.post('/', [authMiddleware], errorHandler(addItemToCart));
cartRoutes.get('/', [authMiddleware], errorHandler(getCart));
cartRoutes.delete('/:id', [authMiddleware], errorHandler(deleteItemFromCart));
cartRoutes.put('/:id', [authMiddleware], errorHandler(changeQuantity));

export default cartRoutes;