import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as colorTheme from '../constant/colorTheme';

import { restoreFromLocalStorage, toggleTheme } from '../flux/action/index';

import { getLog } from '../util/log';

import './App.css';

const log = getLog('App.');

function setFieldFromState(themeField, theme) {
	if (themeField && (themeField.value !== theme)) {
		themeField.value = theme;
	}
}

function setFieldFromPathName(idField) {
	if (idField) {
		const pathName = window.location.pathname;
		if (pathName) {
			idField.value = pathName.replace('/', '');
		}
	}
}

function componentDidMount(props, dispatch, themeField, theme) {

	log('componentDidMount', { props, theme });

	dispatch(restoreFromLocalStorage());

	setFieldFromState(themeField, theme);
}

function componentDidUpdate(props, prevProps, dispatch, themeField, theme, idField) {

	log('componentDidUpdate', { props, prevProps, theme });

	setFieldFromState(themeField, theme);
	setFieldFromPathName(idField);

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

	const [themeField, setThemeField] = useState(null);
	const [idField, setIdField] = useState(null);

	log('App', { theme });

	useEffect(() => {
		if (didMountRef.current) {
			componentDidUpdate(props, prevProps, dispatch, themeField, theme, idField);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch, themeField, theme);
		}
	});

	return <><input className='user-name-input' /><input className='connect-button' type='button' value='Connect' /><input
		className='id-input'
		ref={ref => { if (ref) { setIdField(ref); } }}
	/><select
		className='color-theme-select'
		onChange={() => dispatch(toggleTheme())}
		ref={ref => { if (ref) { setThemeField(ref); } }}
	><option>Light</option><option>Dark</option></select></>;
}

export default App;