import { Router } from 'express';
const router = Router();
import { login, register, logout, editUser, getMe } from '../Controller/user.controller.js';
import { isAuth } from '../Middleware/isAuth.middleware.js';


router.route('/login').post(login)
router.post('/logout', logout)
router.post('/signup', register);
router.post('/updateuser', isAuth, editUser);
router.get('/getme', isAuth, getMe);

export default router
