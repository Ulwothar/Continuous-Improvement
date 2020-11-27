import { CheckToken, RefreshAccessToken } from './tokens-controller';
import Cookies from 'cookies';

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
    if (newAccessToken != null) {
      accessToken = newAccessToken;
    } else {
      return res.json({
        message:
          'Something went wrong and we could not authenticate you. If this problem persists, please contact server administrator.',
      });
    }
  }

  cookies.set('accessToken', accessToken);
  next();
};
