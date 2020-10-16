import express from 'express';

import {
  changeStatus,
  deleteProject,
  getProjectById,
  getProjectsByStatus,
} from '../controllers/projects-controller';

const router = express.Router();

router.get('/status/:status', getProjectsByStatus);

router.patch('/status/:pid', changeStatus);

router.post('/'); //Add middleware to add new suggestion

router.delete('/:pid', deleteProject);

router.get('/:pid', getProjectById);

export default router;
