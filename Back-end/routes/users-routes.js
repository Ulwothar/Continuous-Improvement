import express from 'express';
import { check } from 'express-validator';
import {
  userLogin,
  userLogout,
  userRegister,
} from '../controllers/users-controller';

const router = express.Router();

router.post(
  '/register',
  check('login').notEmpty(),
  check('password').notEmpty(),
  userRegister,
);

router.post(
  '/login',
  check('login').notEmpty(),
  check('password').notEmpty(),
  userLogin,
);

router.delete('/logout', userLogout);

export default router;
