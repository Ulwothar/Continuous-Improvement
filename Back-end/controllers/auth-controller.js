import { CheckToken, RefreshAccessToken } from './tokens-controller';
//Not working yet, need to find a way to work thiss out
export const AuthoriseUser = async (req, res) => {
  let accessToken = req.accessToken;
  const refreshToken = req.refreshToken;
  const login = req.login;
  const user = { login: login };
  let accessTokenValid = await CheckToken(accessToken);
  console.log(accessTokenValid);
  if (accessTokenValid === false) {
    let newAccessToken = await RefreshAccessToken(refreshToken, user);
    console.log({ newAccessToken: newAccessToken });
    if (newAccessToken != null) {
      accessToken = newAccessToken;
      return accessToken;
    } else {
      return res.json({
        message:
          'Something went wrong and we could not authenticate you. If this problem persists, please contact server administrator.',
      });
    }
  }
  return null;
};
