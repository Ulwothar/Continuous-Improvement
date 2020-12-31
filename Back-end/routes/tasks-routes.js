import express from 'express';
import { check } from 'express-validator';
import { AuthoriseUser } from '../controllers/auth-controller';

import { addTask, showTasks } from '../controllers/tasks-controller';

const router = express.Router();

router.get('/:pid', AuthoriseUser, showTasks);

router.post(
  '/:pid',
  check('title').notEmpty(),
  check('description').notEmpty(),
  check('date').notEmpty(),
  AuthoriseUser,
  addTask,
);

export default router;
