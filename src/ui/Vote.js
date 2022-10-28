import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setToken } from '../flux/action';

import { getLog } from '../util/log';

import './Vote.css';

const log = getLog('Vote.');

function setFieldFromPathName(idField) {
	if (idField) {
		const pathName = window.location.pathname;
		if (pathName) {
			idField.value = pathName.replace('/', '');
		}
	}
}

function componentDidUpdate(props, prevProps/*, dispatch*/, idField) {

	log('componentDidUpdate', { props, prevProps, idField });

	setFieldFromPathName(idField);
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

	log('Vote', { props, prevProps });

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps/*, dispatch*/);
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
