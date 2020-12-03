import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-error';
import User from '../models/user';
import { CreateTokens, DeleteToken } from './tokens-controller';
import Cookies from 'cookies';

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

export const userLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    );
  }

  const password = req.body.password;
  const login = req.body.login;
  const user = { login: login };

  try {
    const checkUser = await User.findOne({ login: login });
    if (!checkUser) {
      res.send({
        message: 'User does not exist, please check your login details.',
      });
    }

    if (await bcrypt.compare(password, checkUser.password)) {
      const tokens = await CreateTokens(user);
      //Setting auth cookies
      const cookies = new Cookies(req, res);
      cookies.set('accessToken', tokens.accessToken);
      cookies.set('refreshToken', tokens.refreshToken);
      cookies.set('user', checkUser.login, { httpOnly: false });
      // console.log({
      //   accessToken: tokens.accessToken,
      //   refreshToken: tokens.refreshToken,
      //   user: checkUser.login,
      // });
      res.send({
        message: 'Logging successful!',
      });
    } else {
      res.send({ message: 'Invalid password.' });
    }
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
  }
};

export const userLogout = async (req, res, next) => {
  let cookies = new Cookies(req, res);
  const refreshToken = cookies.get('refreshToken');
  const name = cookies.get('user');
  const tokenDelete = await DeleteToken(refreshToken, name);
  cookies.set('user');
  cookies.set('accessToken');
  cookies.set('refreshToken');
  res.status(200).json({ message: 'Loggin out successful' });
};
