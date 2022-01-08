import express from 'express'
import { registerController, loginController, userController } from '../controllers'
import auth from '../middalware/auth';

const router = express.Router();

router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/me',auth,userController.me);
router.get("/users", auth, userController.users);


export default router;