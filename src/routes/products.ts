import { Router } from 'express';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';
import { createProduct, deleteProduct, getProductById, listProduct, searchProducts, updateProduct } from '../controllers/products';

const authRoutes: Router = Router();

authRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createProduct));
authRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateProduct));
authRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteProduct));
authRoutes.get('/', [authMiddleware, adminMiddleware], errorHandler(listProduct));
// For Admin & User
authRoutes.get('/search', [authMiddleware], errorHandler(searchProducts));
authRoutes.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getProductById));

export default authRoutes;