import { Peer } from 'peerjs';

import { PEER_JS_SERVER_HOST, PEER_JS_SERVER_PATH, PEER_JS_SERVER_PORT } from '../../constant/system';

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

export const test = token => dispatch => {
	const peer = new Peer({
		host: PEER_JS_SERVER_HOST,
		port: PEER_JS_SERVER_PORT,
		path: PEER_JS_SERVER_PATH
	});
	peer.on('open', id => dispatch(setToken(id)));
};

export const toggleTheme = () => ({
	type: type.TOGGLE_THEME
});
