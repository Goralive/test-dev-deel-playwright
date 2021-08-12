
import { Browser } from '../lib/browser/Browser';
import { makeSingleton } from '../lib/helpers/makeSingleton';
import { LoginPage } from './pages/login/LoginPage';

export const pageProvider = (page) => {
  return {
    main: (): LoginPage => makeSingleton(LoginPage, page),
  }
}

export const provider = {
  browser: new Browser(),
}
