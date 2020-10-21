import express from 'express';
import { check } from 'express-validator';

import {
  addComment,
  deleteComment,
  showComments,
  updateComment,
} from '../controllers/comments-controller';

const router = express.Router();

router.get('/:pid', showComments);

router.post('/:pid', check('comment').notEmpty(), addComment);

router.delete('/:cid', deleteComment);

router.patch('/:cid', check('comment').notEmpty(), updateComment);

export default router;
