import express from 'express';
import { check } from 'express-validator';
import { userRegister } from '../controllers/users-controller';

const router = express.Router();

router.post(
  '/register',
  check('login').notEmpty(),
  check('password').notEmpty(),
  userRegister,
); //Add middleware for user login

export default router;
