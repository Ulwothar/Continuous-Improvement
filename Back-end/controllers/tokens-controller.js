const jwt = require('jsonwebtoken');
import Token from '../models/token';
import HttpError from '../models/http-error';

function genereateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export const CheckToken = async (token) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) return false;
    else return true;
  });
};

export const RefreshAccessToken = async (token, user) => {
  if (token == null) return null;
  try {
    const refreshToken = await Token.findOne({
      refreshToken: token,
      name: user,
    });
    if (!refreshToken) return null;

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return err;
      const accessToken = genereateToken(user);
      return accessToken;
    });
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
  const tokens = { accessToken: accessToken, refreshToken: refreshToken };
  try {
    await token.save();
  } catch (err) {
    console.log(err);
  }
  return tokens;
};
