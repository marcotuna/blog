import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';
import '../styles/main.scss';

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query LayoutQuery {
			site {
				siteMetadata {
					title
					description
					logoUrl
				}
			}
		}
	`);

	const { title, description, logoUrl } = data.site.siteMetadata;

	const LayoutHeader = () => {
		return (
			<header className="w-full h-20 fixed z-50 border-b border-smoke-200 bg-gray-50">
				<nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
					<Link to={`/`}>
						<img src={logoUrl} alt="MarcoPSantos logo" width="128" height="36"/>
					</Link>
					<span className="text-blue-800 p-5">{description}</span>
				</nav>
			</header>
		);
	};

	const LayoutFooter = () => {
		return (
			<footer className="mx-auto pt-16 pb-6 px-4 sm:px-6 lg:px-8">
				<p className="text-center">
					<Link
						to={`/`}
						className="underline font-mono font-bold text-smoke-900 hover:text-smoke-400 dark-hover:text-smoke-400"
					>
						{title}
					</Link>
					<span className="mx-2 text-base leading-6 text-smoke-600">{description}</span>
					<a
						href="/rss.xml"
						className="inline-flex h-4 w-4 md:h-3 md:w-3 text-smoke-600 hover:text-smoke-400 dark-hover:text-smoke-400"
					>
						<svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
							<path d="M3.429 24a3.429 3.429 0 100-6.857 3.429 3.429 0 000 6.857zM24 24h-4.629C19.371 13.371 10.63 4.629 0 4.629V0c13.2 0 24 10.8 24 24z" />
							<path d="M15.943 24h-4.457c0-6.343-5.143-11.486-11.486-11.486V8.057c8.743 0 15.943 7.2 15.943 15.943z" />
						</svg>
					</a>
				</p>
				<p className="text-center pt-2 text-sm leading-6 text-smoke-400">
					&copy; {new Date().getFullYear()}{' '}
					<a
						className="underline font-mono font-bold hover:text-smoke-800 dark-hover:text-smoke-200"
						href="https://marcopsantos.com"
					>
						Marco Santos
					</a>
					. All rights reserved.
				</p>
			</footer>
		);
	};

	return (
		<div className="min-h-screen w-full flex flex-col">
			<LayoutHeader />
			<main className="container mx-auto flex-grow pt-24 px-4 sm:px-6 lg:px-8">{children}</main>
			<hr className="mt-16" />
			<LayoutFooter />
		</div>
	);
};

export default Layout;
