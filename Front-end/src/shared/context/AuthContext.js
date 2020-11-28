import { createContext } from 'react';
import CookieCheck from './CookieCheck';

export const AuthContext = createContext({
  isLogged: CookieCheck,
  login: () => {},
  logout: () => {},
});
