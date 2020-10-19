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
    res.json({ message: 'There are no comments for this suggestion.' });
  } else {
    res.json({
      comments: comments.map((comment) => comment.toObject({ getters: true })),
    });
  }
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

export const deleteComment = async (req, res, next) => {
  const id = req.params.cid;

  try {
    await Comment.deleteOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete this comment. Please try again.',
      500,
    );
    next(error);
  }

  res.status(200).json({ message: 'Comment deleted.' });
};

export const updateComment = async (req, res, next) => {
  const id = req.params.cid;
  const comment = req.body;
  let updatedComment;

  try {
    updatedComment = await Comment.findByIdAndUpdate(id, comment, {
      new: true,
      useFindAndModify: false,
    });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update your comment',
      500,
    );
    next(error);
  }

  res.status(200).json({ comment: updatedComment.toObject({ getters: true }) });
};
