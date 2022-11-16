import { Peer } from 'peerjs';

import { PEER_JS_SERVER_HOST, PEER_JS_SERVER_PATH, PEER_JS_SERVER_PORT } from '../../constant/system';

import * as type from '../type';

import { getLog } from '../../util/log';

const log = getLog('flux.action.index.');

// const doesNothing = ({
// 	type: type.NO_OP
// });

export const connect = token => dispatch => {
	const peer = new Peer(token, {
		host: PEER_JS_SERVER_HOST,
		port: PEER_JS_SERVER_PORT,
		path: PEER_JS_SERVER_PATH
	});
	peer.on('open', id => {
		window.history.pushState('', '', `${window.location.pathname}?id=${token}`);
		dispatch(setToken(id));
	});
};

export const disconnect = () => dispatch => {
	window.history.pushState('', '', window.location.pathname);
	dispatch(setToken(null));
};

export const restoreFromLocalStorage = () => ({
	type: type.RESTORE_FROM_LOCAL_STORAGE
});

export const setToken = token => dispatch => {
	log('setToken', { token });
	dispatch({
		type: type.SET_TOKEN,
		token
	});
};

export const toggleTheme = () => ({
	type: type.TOGGLE_THEME
});
