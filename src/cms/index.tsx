import { render } from 'react-dom';
import '../styles/main.scss';

const createRoot = () => {
	const $root = document.createElement('div');
	const styleOverrides = document.createElement('style');
	styleOverrides.textContent = `
	.Pane1 [class*='ControlPaneContainer']:not([class*='PreviewPaneContainer']) {
		padding-bottom: 40vh;
	}
	`;
	document.body.appendChild(styleOverrides);
	document.body.appendChild($root);
	return $root;
};

render(createRoot());
