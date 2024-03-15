import { Router } from 'express';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';
import { addAddress, deleteAddress, listAddress, updateUser } from '../controllers/users';

const authRoutes: Router = Router();

authRoutes.post('/address', [authMiddleware], errorHandler(addAddress));
authRoutes.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
authRoutes.get('/address', [authMiddleware], errorHandler(listAddress));
authRoutes.put('/', [authMiddleware], errorHandler(updateUser));


export default authRoutes;