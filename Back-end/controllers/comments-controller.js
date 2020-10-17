import { validationResult } from 'express-validator';

import HttpError from '../models/http-error';
import Comment from '../models/comment';

export const showComments = async (req, res, next) => {
  const projectId = req.params.pid;
  let comments;
  try {
    comments = await Comment.find({ projectId: projectId });
  } catch (err) {
    const error = new HttpError('Could not find any comments here...', 500);
    next(error);
  }

  if (comments.length === 0) {
    const error = new HttpError(
      'This suggestion has not been reviewed yet.',
      404,
    );
    next(error);
  }

  res.json({
    comments: comments.map((comment) => comment.toObject({ getters: true })),
  });
};

export const addComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    );
  }

  const projectId = req.params.pid;
  const { comment } = req.body;

  const createdComment = new Comment({ projectId, comment });

  try {
    await createdComment.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not add your comment.',
      500,
    );
    console.log(err);
    next(error);
  }

  res.status(201).json(createdComment);
};
