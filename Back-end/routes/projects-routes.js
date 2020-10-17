import express from 'express';
import { check } from 'express-validator';

import {
  changeStatus,
  createProject,
  deleteProject,
  getProjectById,
  getProjectsByStatus,
} from '../controllers/projects-controller';

const router = express.Router();

router.get('/status/:status', getProjectsByStatus);

router.patch('/status/:pid', changeStatus);

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

router.delete('/:pid', deleteProject);

router.get('/:pid', getProjectById);

export default router;
