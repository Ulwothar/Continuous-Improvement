import express from 'express';
import { check } from 'express-validator';
import { AuthoriseUser } from '../controllers/auth-controller';

import {
  addActivity,
  deleteActivity,
  showActivities,
  updateActivity,
} from '../controllers/activity-controller';

const router = express.Router();

router.post(
  '/',
  check('taskId').notEmpty(),
  check('activity').notEmpty(),
  AuthoriseUser,
  addActivity,
);

router.get('/', AuthoriseUser, showActivities);

router.patch(
  '/:aid',
  check('activity').notEmpty(),
  AuthoriseUser,
  updateActivity,
);

router.delete('/:aid', AuthoriseUser, deleteActivity);

export default router;
