import { graphql } from 'gatsby';
import React from 'react';
import ArticleItem from '../components/article-item';
import Layout from '../components/layout';
import { Head } from '../components/layout/head';

const BlogIndex = ({ data }) => {
	const IS_DEV = process.env.NODE_ENV === 'development';
	const posts = data.allMarkdownRemark.edges;

	return (
		<Layout>
			<Head title="All posts" slug="" />
			<section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{posts
					.filter(({ node }: any) => IS_DEV || node.frontmatter.published)
					.map(({ node }) => (
						<ArticleItem
							key={node.fields.slug}
							title={node.frontmatter.title || node.fields.slug}
							slug={node.fields.slug}
							readingTime={node.fields.readingTime.text}
							excerpt={node.excerpt}
							frontmatter={node.frontmatter}
						/>
					))}
			</section>
		</Layout>
	);
};

export default BlogIndex;

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
      description
    }
  }
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        excerpt
        fields {
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          datetime: date
          title
          description
          category
          published
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 500, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
}
`;
