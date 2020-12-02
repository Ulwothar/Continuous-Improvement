import { CheckToken, RefreshAccessToken } from './tokens-controller';
import Cookies from 'cookies';
//Using cookies to authorise user
export const AuthoriseUser = async (req, res, next) => {
  let cookies = new Cookies(req, res);
  let accessToken = cookies.get('accessToken');
  const refreshToken = cookies.get('refreshToken');
  const login = cookies.get('user');
  const user = { login: login };
  let accessTokenValid = await CheckToken(accessToken);
  console.log(accessTokenValid);
  if (accessTokenValid === false) {
    let newAccessToken = await RefreshAccessToken(refreshToken, user);
    console.log(newAccessToken);
    if (newAccessToken != null) {
      accessToken = newAccessToken;
    } else {
      cookies.set('user');
      cookies.set('accessToken');
      cookies.set('refreshToken');
      return res.status(401).json({
        message: 'Invalid tokens, please try logging in again.',
      });
    }
  }

  cookies.set('accessToken', accessToken);
  next();
};
