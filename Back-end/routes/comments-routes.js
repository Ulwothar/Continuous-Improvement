import express from 'express';
import { check } from 'express-validator';

import { addComment, showComments } from '../controllers/comments-controller';

const router = express.Router();

router.get('/:pid', showComments); //Add middleware to get comments for specified project

router.post('/:pid', check('comment').notEmpty(), addComment); //Add middleware to post new comments for specified project

router.delete('/:cid'); //Add middleware to delete specific comment

router.patch('/:cid'); //Add middleware to update specific comment

export default router;
