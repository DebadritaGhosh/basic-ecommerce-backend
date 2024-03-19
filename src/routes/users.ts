import { Router } from 'express';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';
import { addAddress, changeUserRole, deleteAddress, getUserById, listAddress, listUsers, updateUser } from '../controllers/users';
import adminMiddleware from '../middlewares/admin';

const authRoutes: Router = Router();

authRoutes.post('/address', [authMiddleware], errorHandler(addAddress));
authRoutes.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
authRoutes.get('/address', [authMiddleware], errorHandler(listAddress));
authRoutes.put('/', [authMiddleware], errorHandler(updateUser));

// Admin
authRoutes.put('/:id/role', [authMiddleware, adminMiddleware], errorHandler(listUsers));
authRoutes.get('/', [authMiddleware, adminMiddleware], errorHandler(getUserById));
authRoutes.get('/:id', [authMiddleware, adminMiddleware], errorHandler(changeUserRole));


export default authRoutes;