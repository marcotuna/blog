import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { startCase } from 'lodash';
import React from 'react';

const ArticleItem = ({ title, slug, frontmatter, readingTime, excerpt }) => {
	const { placeholder } = useStaticQuery(
		graphql`
			{
				placeholder: file(absolutePath: { regex: "/blog-placeholder.png/" }) {
					childImageSharp {
						gatsbyImageData(width: 600, layout: CONSTRAINED)
					}
				}
			}
		`
	);

	return (
		<Link
			to={slug}
			title={title}
			className="flex outline-none rounded-lg focus:shadow-outline-gray hover:shadow-2xl transition-shadow duration-200"
		>
			<article className="flex-auto flex flex-col border-2 border-transparent rounded-lg shadow-lg overflow-hidden">
				<div className="flex-shrink-0">
					{frontmatter.featuredImage ? (
						<GatsbyImage image={frontmatter.featuredImage.childImageSharp.gatsbyImageData} className="h-48" alt="" />
					) : (
						<GatsbyImage image={placeholder.childImageSharp.gatsbyImageData} className="h-48" alt="" />
					)}
				</div>
				<div className="flex-1 bg-white p-6 flex flex-col justify-between">
					<div className="flex-1">
						<p className="text-sm leading-5 font-medium text-blue-600 flex justify-between">
							<span className="underline">
								{frontmatter.category ? startCase(frontmatter.category) : 'Miscellaneous'}
							</span>
							{!frontmatter.published && (
								<span className="px-1 rounded no-underline bg-blue-200 text-blue-800">
									unpublished
								</span>
							)}
						</p>
						<div>
							<h3 className="mt-2 text-2xl leading-7 font-semibold text-smoke-900">{title}</h3>
							<p
								className="mt-3 text-base leading-5 text-smoke-500"
								dangerouslySetInnerHTML={{
									__html: frontmatter.description || excerpt,
								}}
							></p>
						</div>
					</div>
					<div className="mt-6 flex items-center">
						<div className="flex text-sm leading-5 text-smoke-500">
							<time dateTime={frontmatter.datetime}>{frontmatter.date}</time>
							<span className="mx-1">&middot;</span>
							<span>{readingTime}</span>
						</div>
					</div>
				</div>
			</article>
		</Link>
	);
};

export default ArticleItem;
