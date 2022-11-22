import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { connect } from '../flux/action';

import { getTokenFromPathName } from '../util/http';
import { getLog } from '../util/log';

import './Connect.css';

const log = getLog('Connect.');

function setFieldFromPathName(tokerPeerField) {
	if (tokerPeerField) {
		const tokenPeer = getTokenFromPathName();
		if (tokenPeer) {
			tokerPeerField.value = tokenPeer;
		}
	}
}

function componentDidUpdate(props, prevProps/*, dispatch*/, tokerPeerField) {

	log('componentDidUpdate', { props, prevProps, tokerPeerField });

	setFieldFromPathName(tokerPeerField);
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
	const dispatch = useDispatch();
	const prevProps = usePrevious(props);

	const [tokerPeerField, setTokenPeerField] = useState(null);

	log('Connect', { props, prevProps });

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps/*, dispatch*/, tokerPeerField);
		} else {
			didMountRef.current = true;
			// componentDidMount(props, dispatch, themeField, theme);
		}
	});

	return <div className='connect-main' ><input className='user-name-input' /><input
		className='connect-button'
		onClick={() => dispatch(connect(tokerPeerField.value))}
		type='button'
		value='Connect'
	/><input
		className='token-peer-input'
		ref={ref => { if (ref) { setTokenPeerField(ref); } }}
	/></div>;
}

export default Connect;
