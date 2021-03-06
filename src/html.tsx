import React from 'react';

const HTML = ({ htmlAttributes, postBodyComponents, headComponents, bodyAttributes, preBodyComponents, body }) => (
	<html className={`antialiased font-sans`} {...htmlAttributes}>
		<head>
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			{headComponents}
		</head>
		<body {...bodyAttributes}>
			{preBodyComponents}
			<div key={'body'} id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
			{postBodyComponents}
		</body>
	</html>
);

export default HTML;
