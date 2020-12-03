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

export const DeleteToken = async (refreshToken, user) => {
  try {
    const name = user;
    //const token = new Token({ name, refreshToken });
    await Token.findOneAndDelete({ refreshToken });
    return null;
  } catch (err) {
    return err;
  }
};

export const CreateTokens = async (user) => {
  const accessToken = genereateToken(user);
  const name = user.login;
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  const token = new Token({ name, refreshToken });
  try {
    const checkToken = await Token.findOne({ name: name });
    if (!checkToken) {
      try {
        await token.save();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await Token.findOneAndUpdate(
          { name },
          { refreshToken },
          { new: true, useFindAndModify: false },
        );
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    console.log(error);
  }

  const tokens = { accessToken: accessToken, refreshToken: refreshToken };

  return tokens;
};
