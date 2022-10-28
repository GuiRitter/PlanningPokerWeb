import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as colorTheme from '../constant/colorTheme';

import { restoreFromLocalStorage, toggleTheme } from '../flux/action/index';

import { getLog } from '../util/log';

import Connect from './Connect';
import Vote from './Vote';

import './App.css';

const log = getLog('App.');

function setFieldFromState(themeField, theme) {
	if (themeField && (themeField.value !== theme)) {
		themeField.value = theme;
	}
}

function componentDidMount(props, dispatch, themeField, theme) {

	log('componentDidMount', { props, theme });

	dispatch(restoreFromLocalStorage());

	setFieldFromState(themeField, theme);
}

function componentDidUpdate(props, prevProps, dispatch, themeField, theme) {

	log('componentDidUpdate', { props, prevProps, theme });

	setFieldFromState(themeField, theme);

	switch (theme) {

		case colorTheme.DARK:

			document.querySelector(':root').style.setProperty('--page-background-color', '#000000');
			document.querySelector(':root').style.setProperty('--page-text-color', '#959595');
			document.querySelector(':root').style.setProperty('--input-background-color', '#101010');
			document.querySelector(':root').style.setProperty('--input-border-color', '#898989');
			document.querySelector(':root').style.setProperty('--input-text-color', '#ffffff');

			break;

		case colorTheme.LIGHT:

			document.querySelector(':root').style.setProperty('--page-background-color', 'initial');
			document.querySelector(':root').style.setProperty('--page-text-color', 'initial');
			document.querySelector(':root').style.setProperty('--input-background-color', 'initial');
			document.querySelector(':root').style.setProperty('--input-border-color', 'initial');
			document.querySelector(':root').style.setProperty('--input-text-color', 'initial');

			break;

		default: break;
	}
}

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

function App(props) {

	const didMountRef = useRef(false);
	const dispatch = useDispatch();
	const prevProps = usePrevious(props);

	const theme = useSelector(state => ((state || {}).reducer || {}).colorTheme);
	const token = useSelector(state => ((state || {}).reducer || {}).token);

	const [themeField, setThemeField] = useState(null);

	log('App', { props, prevProps, theme });

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps, dispatch, themeField, theme);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch, themeField, theme);
		}
	});

	return <><div className='main'>{token ? <Vote/> : <Connect/>}</div><select
		className='footer'
		onChange={() => dispatch(toggleTheme())}
		ref={ref => { if (ref) { setThemeField(ref); } }}
	><option>Light</option><option>Dark</option></select></>;
}

export default App;
