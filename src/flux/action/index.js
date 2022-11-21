import { Peer } from 'peerjs';

import { PEER_JS_SERVER_HOST, PEER_JS_SERVER_PATH, PEER_JS_SERVER_PORT } from '../../constant/system';

import * as type from '../type';

import { getLog } from '../../util/log';

const log = getLog('flux.action.index.');

// const doesNothing = ({
// 	type: type.NO_OP
// });

export const connect = token => dispatch => {
	let peer;
	try {
		peer = new Peer(token, {
			host: PEER_JS_SERVER_HOST,
			port: PEER_JS_SERVER_PORT,
			path: PEER_JS_SERVER_PATH
		});
	} catch (ex) {
		log('connect', { ex });
	}
	peer.on('open', id => {
		log('connect.open', { id });
		window.history.pushState('', '', `${window.location.pathname}?id=${id}`);
		dispatch(setToken(id));
	});
	peer.on('connection', dataConnection => {
		log('connect.connection', { dataConnection });
	});
	peer.on('call', mediaConnection => {
		log('connect.call', { mediaConnection });
	});
	peer.on('close', () => {
		log('connect.close');
	});
	peer.on('disconnected', () => {
		log('connect.disconnected');
		// TODO error with type 'network' also fires this; decide what to do if it happens by other means and after finding a way to differentiate them
	});
	peer.on('error', err => {
		log('connect.error', { err });
		if (err && err.type) {
			switch (err.type) {
				// fired when the server is stopped or when creating a new Peer with the server offline
				case 'network':
					alert(err.message);
					dispatch(setToken(null));
					break;
				default:
			}
		}
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
