import React, { useEffect, useReducer } from 'react';
import { ThemeState } from './types';
import { ACTION_TYPES } from './util/theme.constants';
import { themeReducer } from './util/theme.helpers';

const THEME_STATE: ThemeState = {
	loaded: false,
};

export const ThemeContext = React.createContext({ ...THEME_STATE });

export const ThemeProvider = ({ children }) => {
	const [theme, dispatch] = useReducer(themeReducer, THEME_STATE);

	useEffect(() => {
		// Inline script in index will apply dark mode initially
		dispatch({ type: ACTION_TYPES.MARK_THEME_AS_LOADED });
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				loaded: theme.loaded,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
