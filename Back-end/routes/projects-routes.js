import express from 'express';

import {
  deleteProject,
  getProjectById,
  getProjectsByStatus,
} from '../controllers/projects-controller';

const router = express.Router();

router.get('/status/:status', getProjectsByStatus); //Add middleware to get all projects with selected status

router.patch('/:pid'); //Add middleware to change status of project

router.post('/'); //Add middleware to add new suggestion

router.delete('/:pid', deleteProject); //Add middleware to delete rejected suggsetions

router.get('/:pid', getProjectById); //Add middleware to get specified project

export default router;
