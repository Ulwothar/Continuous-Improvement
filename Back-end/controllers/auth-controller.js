import { CheckToken, RefreshAccessToken } from './tokens-controller';
import Cookies from 'cookies';
//Not working yet, need to find a way to work this out
export const AuthoriseUser = async (req, res, next) => {
  let accessToken = req.headers['accesstoken'];
  const refreshToken = req.headers['refreshtoken'];
  const login = req.headers['user'];
  const user = { login: login };
  let accessTokenValid = await CheckToken(accessToken);
  console.log(accessTokenValid);
  if (accessTokenValid === false) {
    let newAccessToken = await RefreshAccessToken(refreshToken, user);
    console.log({ newAccessToken: newAccessToken });
    if (newAccessToken != null) {
      accessToken = newAccessToken;
    } else {
      return res.json({
        message:
          'Something went wrong and we could not authenticate you. If this problem persists, please contact server administrator.',
      });
    }
  }
  let cookies = new Cookies(req, res);
  cookies.set('accessToken', accessToken);
  next();
};
