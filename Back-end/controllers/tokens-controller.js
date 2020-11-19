const jwt = require('jsonwebtoken');
import Token from '../models/token';
import HttpError from '../models/http-error';

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
  let accessToken;
  try {
    const refreshToken = await Token.findOne({
      refreshToken: token,
      name: user.login,
    });
    if (!refreshToken) {
      console.log('Refresh token does not exist!');
      return null;
    }
    //console.log({ refreshToken: refreshToken.refreshToken });   //Checking if I'm getting correct info from DB

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log('Something went wrong, could not verify your tokens!');
        return err;
      }
      accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30000',
      });

      //console.log(accessToken);     //Checking if I'm correctly getting to this point and generating new access token
      //return genereateToken(user);
    });
  } catch (err) {
    return err;
  }

  return accessToken;
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
