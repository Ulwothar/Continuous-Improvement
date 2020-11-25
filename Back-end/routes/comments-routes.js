import express from 'express';
import { check } from 'express-validator';
import { AuthoriseUser } from '../controllers/auth-controller';

import {
  addComment,
  deleteComment,
  showComments,
  updateComment,
} from '../controllers/comments-controller';

const router = express.Router();

router.get('/:pid', AuthoriseUser, showComments);

router.post('/:pid', check('comment').notEmpty(), AuthoriseUser, addComment);

router.delete('/:cid', AuthoriseUser, deleteComment);

router.patch(
  '/:cid',
  check('comment').notEmpty(),
  AuthoriseUser,
  updateComment,
);

export default router;
