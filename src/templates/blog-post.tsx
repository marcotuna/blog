import { graphql, Link } from 'gatsby';
import React from 'react';
import BlogMetadata from '../components/blog-metadata';
import Layout from '../components/layout';
import { Head } from '../components/layout/head';

const BlogPostTemplate = ({ data, pageContext }) => {
	const post = data.markdownRemark;

	const { previous, next, slug } = pageContext;

	const featuredImage = post.frontmatter.featuredImage;

	return (
		<Layout>
			<Head
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
				previewImage={featuredImage ? featuredImage.childImageSharp.gatsbyImageData.src : ''}
				isBlogPost={true}
				slug={slug}
				datePublished={post.frontmatter.date}
			/>
			<article className="max-w-screen-lg mx-auto">
				<header className="flex flex-col justify-center items-start">
					<BlogMetadata
						imgClasses="rounded-full border-2 border-smoke-200"
						authorClasses="text-lg font-bold leading-none text-blue-700"
					>
						<small className="text-xs leading-none text-smoke-500">
							{post.frontmatter.date} &middot; {post.fields.readingTime.text}
						</small>
						<p
							className="text-body text-blue-600 leading-snug"
							dangerouslySetInnerHTML={{
								__html: post.frontmatter.description || post.excerpt,
							}}
						></p>
					</BlogMetadata>
					<h1 className="pt-10 font-bold text-4xl md:text-5xl leading-tight text-blue-700">
						{post.frontmatter.title}
					</h1>
				</header>
				<hr className="mt-2 mb-8" />
				<section
					className="markdown text-lg md:text-base tracking-wide leading-relaxed md:leading-loose text-smoke-900"
					dangerouslySetInnerHTML={{ __html: post.html }}
				/>
			</article>

			<hr className="my-16" />

			<nav className="flex flex-wrap justify-between">
				{previous ? (
					<div className="mr-auto">
						<p className="text-sm text-left text-smoke-400">Previous</p>
						<Link
							to={previous.fields.slug}
							className="break-word text-smoke-900 hover:text-blue-900 dark-hover:text-smoke-400"
							rel="prev"
						>
							← {previous.frontmatter.title}
						</Link>
					</div>
				) : (
					<span></span>
				)}
				{next ? (
					<div className="ml-auto">
						<p className="text-sm text-right text-smoke-400">Next</p>
						<Link
							to={next.fields.slug}
							className="break-word text-smoke-900 hover:text-blue-900 dark-hover:text-smoke-400"
							rel="next"
						>
							{next.frontmatter.title} →
						</Link>
					</div>
				) : (
					<span></span>
				)}
			</nav>
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
				published
				featuredImage {
					childImageSharp {
						gatsbyImageData(width: 600, layout: FIXED)
					}
				}
			}
			fields {
				readingTime {
					text
				}
			}
		}
	}
`;
