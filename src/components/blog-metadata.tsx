import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import React from 'react';

const BlogMetadata = ({ children, imgClasses = '', stackClasses = '', authorClasses = '' }) => {
	const data = useStaticQuery(graphql`query BioQuery {
  avatar: file(absolutePath: {regex: "/author-avatar.png/"}) {
    childImageSharp {
      gatsbyImageData(width: 80, height: 80, layout: FIXED)
    }
  }
  site {
    siteMetadata {
      author
    }
  }
}
`);

	const { author } = data.site.siteMetadata;

	return (
        <div className="flex items-center">
			<GatsbyImage
                image={data.avatar.childImageSharp.gatsbyImageData}
                className={`flex-shrink-0 h-20 w-20 ${imgClasses}`}
                alt={author} />
			<aside className={`ml-2 ${stackClasses}`}>
				<p className={authorClasses}>{author}</p>
				{children}
			</aside>
		</div>
    );
};

export default BlogMetadata;
