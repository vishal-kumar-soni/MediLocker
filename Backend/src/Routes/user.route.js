import { Router } from 'express';
const router = Router();
import { login, register, logout, editUser } from '../Controller/user.controller.js';
import { isAuth } from '../Middleware/isAuth.middleware.js';


router.route('/login').post(login)
router.post('/logout',  logout)
router.post('/signup',register);
router.post('/updateuser',isAuth, editUser);

export default router
