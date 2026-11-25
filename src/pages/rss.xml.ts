import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts, byDateDesc } from '../lib/blog';
import { SITE } from '../consts';

export const GET: APIRoute = async ({ site }) => {
	const posts = (await getPosts()).sort(byDateDesc);
	return rss({
		title: `${SITE.name} - Blog`,
		description: 'Notes on finance, software, AI infrastructure and performance.',
		site: site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/blog/${post.id}/`,
			categories: [post.section, post.category],
		})),
	});
};
