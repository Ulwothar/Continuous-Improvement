import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-error';
import User from '../models/user';
import { CreateTokens } from './tokens-controller';
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
  //const jwt = new JsonWebToken();

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
      // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      //   expiresIn: '15m',
      // });
      // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      const tokens = await CreateTokens(user);
      const cookies = new Cookies(req, res);
      cookies.set('accessToken', tokens.accessToken);
      cookies.set('refreshToken', tokens.refreshToken);
      cookies.set('user', checkUser.login);
      res.send({
        message: 'Logging successful!',
      });
      //res.send({ message: `Welcome ${checkUser.login}` });
    } else {
      res.send({ message: 'Invalid password.' });
    }
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
  }
};
