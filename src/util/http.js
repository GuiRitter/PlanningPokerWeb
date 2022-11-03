import { HOME_PAGE } from '../constant/system';

export const getTokenFromPathName = () => window.location.pathname.replace(HOME_PAGE, '').replace('/', '');
