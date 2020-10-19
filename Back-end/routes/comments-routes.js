import express from 'express';
import { check } from 'express-validator';

import {
  addComment,
  deleteComment,
  showComments,
  updateComment,
} from '../controllers/comments-controller';

const router = express.Router();

router.get('/:pid', showComments); //Add middleware to get comments for specified project

router.post('/:pid', check('comment').notEmpty(), addComment); //Add middleware to post new comments for specified project

router.delete('/:cid', deleteComment); //Add middleware to delete specific comment

router.patch('/:cid', check('comment').notEmpty(), updateComment); //Add middleware to update specific comment

export default router;
