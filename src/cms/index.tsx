import CMS from 'netlify-cms-app';
// import cloudinary from 'netlify-cms-media-library-cloudinary';
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import '../styles/main.scss';
import BlogPostPreview from './blog.preview';

const IS_DEV = process.env.NODE_ENV === 'development';

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

const CMS_APP = () => {
	CMS.registerPreviewTemplate('blog', BlogPostPreview);
	console.log(process.env.CMS_PROXY_URL)
	console.log(process.env.GATSBY_CMS_PROXY_URL)
	// For some reason this isn't working properly
	CMS.init({
		config: {
			backend: {
				name: 'proxy',
				proxy_url: (process.env.CMS_PROXY_URL || 'http://localhost:8000') + '/api/v1'
			} 
		},	
	} as any);

	return <div id="nc-root" className="stencilbook-custom-cms"></div>;
};

render(<CMS_APP />, createRoot());
