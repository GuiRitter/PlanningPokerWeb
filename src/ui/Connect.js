import React, { useEffect, useRef, useState } from 'react';

import { getLog } from '../util/log';

import './Connect.css';

const log = getLog('Connect.');

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

function Connect(props) {

	const didMountRef = useRef(false);
	const prevProps = usePrevious(props);

	const [idField, setIdField] = useState(null);

	log('Connect', { props, prevProps });

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps/*, dispatch*/, idField);
		} else {
			didMountRef.current = true;
			// componentDidMount(props, dispatch, themeField, theme);
		}
	});

	return <><input className='user-name-input' /><input className='connect-button' type='button' value='Connect' /><input
		className='id-input'
		ref={ref => { if (ref) { setIdField(ref); } }}
	/></>;
}

export default Connect;
