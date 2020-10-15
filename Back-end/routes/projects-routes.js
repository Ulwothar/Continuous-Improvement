import express from 'express';

import { getProjectById } from '../controllers/projects-controller';

const router = express.Router();

router.get('/status/:status'); //Add middleware to get all projects with selected status

router.patch('/:pid'); //Add middleware to change status of project

router.post('/'); //Add middleware to add new suggestion

router.delete('/:pid'); //Add middleware to delete rejected suggsetions

router.get('/:pid', getProjectById); //Add middleware to get specified project

export default router;
