import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setToken } from '../flux/action';

import { getTokenFromPathName } from '../util/http';
import { getLog } from '../util/log';

import './Vote.css';

const log = getLog('Vote.');

function disconnectOnDifferentPathName(dispatch, token) {
	const pathName = getTokenFromPathName();
	log('setFieldFromPathName', { token, pathName });
	if (pathName && (token !== pathName)) {
		dispatch(setToken(null));
	}
}

function componentDidUpdate(props, prevProps, dispatch, token) {

	log('componentDidUpdate', { props, prevProps });

	disconnectOnDifferentPathName(dispatch, token);
}

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function Vote(props) {

	const didMountRef = useRef(false);
	const dispatch = useDispatch();
	const prevProps = usePrevious(props);

	const token = useSelector(state => ((state || {}).reducer || {}).token);

	log('Vote', { props, prevProps, token });

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps, dispatch, token);
		} else {
			didMountRef.current = true;
			// componentDidMount(props, dispatch, themeField, theme);
		}
	});

	return <div className='vote-main'><div className='placeholder' /><input
		className='disconnect-button'
		onClick={() => dispatch(setToken(null))}
		type='button'
		value='Disconnect'
	/></div>;
}

export default Vote;
