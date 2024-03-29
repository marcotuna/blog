const { resolve } = require('path');
const { theme } = require('./tailwind.config');

// Load dotenv configuration
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV || 'development'}`
})

const SITE_METADATA = {
	title: 'marcopsantos',
	author: 'Marco Santos',
	description: 'Discovering the undiscovered... with technology',
	siteUrl: 'https://marcopsantos.com',
	logoUrl: 'https://res.cloudinary.com/marcopsantos/image/upload/v1623336937/marcopsantos_nwb00h.png',
};

module.exports = {
	siteMetadata: SITE_METADATA,
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-typescript',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: resolve('content/blog'),
				name: 'blog',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: resolve('content/assets'),
				name: `assets`,
			},
		},
		'gatsby-plugin-image',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					`gatsby-remark-autolink-headers`,
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 768,
							backgroundColor: 'transparent',
							wrapperStyle:
								'white-space: normal; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border-radius: 0.25rem; overflow:hidden;',
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					'gatsby-remark-reading-time-2',
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
					{
						site {
							siteMetadata {
								title
								description
								author
								siteUrl
							}
						}
					}
				`,
				feeds: [
					{
						output: '/rss.xml',
						title: SITE_METADATA.title,
						site_url: SITE_METADATA.siteUrl,
						feed_url: `${SITE_METADATA.siteUrl}/rss.xml`,
						language: 'en',
						ttl: 10080,
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.edges.map(edge => {
								return Object.assign({}, edge.node.frontmatter, {
									description: edge.node.frontmatter.description || edge.node.excerpt,
									date: edge.node.frontmatter.date,
									author: site.siteMetadata.author,
									title: edge.node.frontmatter.title,
									categories: [edge.node.frontmatter.category],
									url: site.siteMetadata.siteUrl + edge.node.fields.slug,
									guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
									custom_elements: [
										{ 'content:encoded': edge.node.html },
										{ reading_time: edge.node.fields.readingTime.text },
									],
								});
							});
						},
						query: `
							{
								allMarkdownRemark(
									filter: { frontmatter: { published: { eq: true } } },
									sort: { order: DESC, fields: [frontmatter___date] },
								) {
									edges {
										node {
											excerpt
											html
											fields {
												slug
												readingTime {
													text
												}
											}
											frontmatter {
												title
												date
												description
												category
											}
										}
									}
								}
							}
						`,
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: SITE_METADATA.title,
				short_name: SITE_METADATA.title,
				description: SITE_METADATA.description,
				start_url: '/',
				lang: 'en',
				background_color: theme.extend.colors.smoke[900],
				theme_color: theme.extend.colors.smoke[900],
				display: 'standalone',
				orientation: 'portrait',
				icon: 'content/favicon.png',
			},
		},
		'gatsby-plugin-sitemap'
	],
};
