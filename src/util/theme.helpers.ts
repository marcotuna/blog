import { ThemeState } from '../types';
import { ACTION_TYPES, DARK_MODE_INDICATOR_CLASS, DARK_MODE_STORAGE_KEY } from './theme.constants';

export function themeReducer(state: ThemeState, action: any): ThemeState {
	switch (action.type) {
		case ACTION_TYPES.MARK_THEME_AS_LOADED:
			return { ...state, loaded: true };
		default:
			return { ...state };
	}
}
