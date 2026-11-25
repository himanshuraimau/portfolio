// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://enghimanshu.online',
	// One canonical URL per page: /blog/ not /blog.
	trailingSlash: 'always',
	integrations: [sitemap()],
});
