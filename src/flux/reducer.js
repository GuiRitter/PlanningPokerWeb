import * as type from './type';

import * as theme from '../constant/colorTheme';

import { getLog } from '../util/log';

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
			return {
				...currentState,
				abortController: null,
				isLoading: false,
			};

		case type.ENABLE_ABORT_REQUEST:
			return {
				...currentState,
				abortMethod: currentState.isLoading ? action.abortMethod : null
			};

		case type.LOADING:
			return {
				...currentState,
				abortController: action.isLoading ? currentState.abortController : null,
				isLoading: action.isLoading
			};

		case type.TOGGLE_THEME:
			return {
				...currentState,
				colorTheme: (currentState.colorTheme === theme.DARK) ? theme.LIGHT : theme.DARK
			};

		default: return currentState;
	}
};

export default reducer;
