import express from 'express';
import { check } from 'express-validator';

import {
  changeStatus,
  createProject,
  deleteProject,
  getProjectById,
  getProjectsByStatus,
} from '../controllers/projects-controller';

import { AuthoriseUser } from '../controllers/auth-controller';

const router = express.Router();

router.get('/status/:status', AuthoriseUser, getProjectsByStatus);

router.patch('/status/:pid', AuthoriseUser, changeStatus);

router.post(
  '/',
  check('title').not().isEmpty(),
  check('name').not().isEmpty(),
  check('department').notEmpty(),
  check('shift').notEmpty(),
  check('type').notEmpty(),
  check('status').notEmpty(),
  check('currentSituation').notEmpty(),
  check('improvementSuggestion').notEmpty(),
  createProject,
);

router.delete('/:pid', AuthoriseUser, deleteProject);

router.get('/:pid', AuthoriseUser, getProjectById);

export default router;
