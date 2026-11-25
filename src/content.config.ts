import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			// Position inside a category (1 = first). Posts without one sort by date.
			order: z.number().optional(),
			draft: z.boolean().default(false),
			// Social preview image, e.g. ./images/foo.png. Falls back to the site default.
			image: image().optional(),
		}),
});

export const collections = { blog };
