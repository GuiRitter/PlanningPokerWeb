import { HOME_PAGE } from '../constant/system';

export const getTokenFromPathName = () => window.location.pathname.replaceAll(HOME_PAGE, '').replaceAll('/', '');
