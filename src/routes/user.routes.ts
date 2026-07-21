import { Router } from 'express';
import { getUsers, register, login, deleteUser } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getUsers);
router.post('/register', register);
router.post('/login', login);
router.delete('/:id', deleteUser);

export default router;