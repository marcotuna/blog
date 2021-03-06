import { format } from 'date-fns';
import React from 'react';

const BlogPostPreview = (props: any) => {
	const { entry, widgetFor } = props;

	const title = entry.getIn(['data', 'title']);
	const date = entry.getIn(['data', 'date']) || new Date();
	const description = entry.getIn(['data', 'description']);
	const body = widgetFor('body');

	return (
		<article className="p-4 max-w-screen-lg mx-auto">
			<header className="flex flex-col justify-center items-start">
				<div className="flex items-center">
					<div className="flex-shrink-0 bg-smoke-900 w-20 h-20 rounded-full border-2 border-smoke-200">
						<span
							className="text-white cursor-pointer w-full h-full flex items-center justify-center"
						></span>
					</div>
					<aside className="ml-2">
						<p className="text-lg font-bold leading-none text-blue-600">Author Name</p>
						<small className="text-xs leading-none text-smoke-500">
							{format(date, 'LLLL dd, yyyy')} &middot; 0 min read
						</small>
						<p
							className="text-body text-blue-600 leading-snug"
							dangerouslySetInnerHTML={{
								__html: description,
							}}
						></p>
					</aside>
				</div>
				<h1 className="pt-10 font-bold text-4xl md:text-5xl leading-tight text-blue-600">
					{title}
				</h1>
			</header>
			<hr className="mt-2 mb-8" />
			<section className="markdown text-lg md:text-base tracking-wide leading-relaxed md:leading-loose text-smoke-900">
				{body}
			</section>
		</article>
	);
};

export default BlogPostPreview;
