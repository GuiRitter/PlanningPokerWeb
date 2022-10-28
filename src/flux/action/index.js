// import { PEER_JS_SERVER_URL } from '../../constant/system';

import * as type from '../type';

// const doesNothing = ({
// 	type: type.NO_OP
// });

export const restoreFromLocalStorage = () => ({
	type: type.RESTORE_FROM_LOCAL_STORAGE
});

export const setToken = token => ({
	type: type.SET_TOKEN,
	token
});

export const toggleTheme = () => ({
	type: type.TOGGLE_THEME
});
