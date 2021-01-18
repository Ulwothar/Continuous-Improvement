import express from 'express';
import { check } from 'express-validator';
import { AuthoriseUser } from '../controllers/auth-controller';

import {
  addTask,
  deleteTask,
  showTasks,
  updateDescription,
  updateStatus,
  updateTitle,
} from '../controllers/tasks-controller';

const router = express.Router();

router.get('/:pid', AuthoriseUser, showTasks);

router.post(
  '/:pid',
  check('title').notEmpty(),
  check('description').notEmpty(),
  check('status').notEmpty(),
  AuthoriseUser,
  addTask,
);

router.delete('/:tid', AuthoriseUser, deleteTask);

router.patch('/title/:tid', AuthoriseUser, updateTitle);

router.patch('/description/:tid', AuthoriseUser, updateDescription);

router.patch('/status/:tid', AuthoriseUser, updateStatus);

export default router;
