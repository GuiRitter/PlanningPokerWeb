import * as type from './type';

import * as theme from '../constant/colorTheme';
import { LOCAL_STORAGE_NAME } from '../constant/system';

import { getLog } from '../util/log';
import { updateLocalStorage } from '../util/persistence';

const log = getLog('flux.reducer.');

const initialState =
{
	abortMethod: null,
	colorTheme: theme.LIGHT,
	isLoading: false,
	peerList: [],
	token: null,
};

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	let peerList = currentState.peerList;

	switch (action.type) {

		case type.ABORT_REQUEST:
			return updateLocalStorage({
				...currentState,
				abortController: null,
				isLoading: false,
			});

		case type.ADD_PEER:
			if (!peerList.includes(action.peer)) {
				peerList = peerList.concat(action.peer);
			}
			return updateLocalStorage({
				...currentState,
				peerList
			});

		case type.ENABLE_ABORT_REQUEST:
			return updateLocalStorage({
				...currentState,
				abortMethod: currentState.isLoading ? action.abortMethod : null
			});

		case type.LOADING:
			return updateLocalStorage({
				...currentState,
				abortController: action.isLoading ? currentState.abortController : null,
				isLoading: action.isLoading
			});

		case type.REMOVE_PEER:
			peerList = peerList.filter(peer => peer !== action.peer);
			return updateLocalStorage({
				...currentState,
				peerList
			});

		case type.RESTORE_FROM_LOCAL_STORAGE:
			return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || initialState;

		case type.SET_TOKEN:
			if (!action.token) {
				peerList = [];
			}
			return updateLocalStorage({
				...currentState,
				token: action.token,
				peerList
			});

		case type.TOGGLE_THEME:
			return updateLocalStorage({
				...currentState,
				colorTheme: (currentState.colorTheme === theme.DARK) ? theme.LIGHT : theme.DARK
			});

		default: return currentState;
	}
};

export default reducer;
