const jwt = require('jsonwebtoken');
import Token from '../models/token';
import Cookies from 'cookies';
//import HttpError from '../models/http-error';

function genereateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

export const CheckToken = async (token) => {
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const RefreshAccessToken = async (token, user) => {
  if (token == null) return null;
  try {
    const refreshToken = await Token.findOne({
      refreshToken: token,
      name: user.login,
    });
    if (!refreshToken) {
      console.log('Refresh token does not exist!');
      return null;
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return null;
      }
    });
    const accessToken = genereateToken(user);
    return accessToken;
  } catch (err) {
    return err;
  }
};

export const DeleteToken = async (token, user) => {
  try {
    Token.findOneAndDelete({ refreshToken: token, name: user });
    return null;
  } catch (err) {
    return err;
  }
};

export const CreateTokens = async (user) => {
  const accessToken = genereateToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  const token = new Token({ name: user.login, refreshToken });
  const checkToken = Token.find({ name: user.login });
  if (!checkToken) {
    try {
      await token.save();
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      await Token.findOneAndUpdate(
        { name: user.login },
        { refreshToken: refreshToken },
        { new: true, useFindAndModify: false },
      );
    } catch (err) {
      console.log(err);
    }
  }

  const tokens = { accessToken: accessToken, refreshToken: refreshToken };

  return tokens;
};
