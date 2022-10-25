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
	isLoading: false
};

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	switch (action.type) {

		case type.ABORT_REQUEST:
			return updateLocalStorage({
				...currentState,
				abortController: null,
				isLoading: false,
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

		case type.RESTORE_FROM_LOCAL_STORAGE:
			return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || initialState;

		case type.TOGGLE_THEME:
			return updateLocalStorage({
				...currentState,
				colorTheme: (currentState.colorTheme === theme.DARK) ? theme.LIGHT : theme.DARK
			});

		default: return currentState;
	}
};

export default reducer;
