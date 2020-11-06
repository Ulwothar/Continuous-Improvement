import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-error';
import User from '../models/user';

export const userRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    );
  }
  const password = await bcrypt.hash(req.body.password, 10);
  const login = req.body.login;
  const user = new User({ login, password });
  let users;

  try {
    users = await User.findOne({ login: login });
    if (users) {
      const error = new HttpError(
        'User with this login already exists, please choose diffrent one.',
        500,
      );
      next(error);
    }
    await user.save();
    res.status(201).send(user);
    console.log(password);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, please try again...',
      500,
    );
    next(error);
  }
};
