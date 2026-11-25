import { getCollection, type CollectionEntry } from 'astro:content';
import { SECTIONS, CATEGORIES } from '../consts';

export type Post = CollectionEntry<'blog'> & {
	section: string;
	category: string;
	slug: string;
};

const titleCase = (s: string) =>
	s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const sectionInfo = (section: string) =>
	SECTIONS[section] ?? { title: titleCase(section), description: '' };

export const categoryInfo = (section: string, category: string) =>
	CATEGORIES[`${section}/${category}`] ?? { title: titleCase(category), description: '' };

/** All published posts. An id looks like "finance/corporate-finance/introduction". */
export async function getPosts(): Promise<Post[]> {
	const entries = await getCollection('blog', ({ data }) => !data.draft);
	return entries
		.map((entry) => {
			const [section, category, slug] = entry.id.split('/');
			return { ...entry, section, category, slug };
		})
		.filter((p) => {
			if (!p.slug) {
				console.warn(`[blog] "${p.id}" must live in <section>/<category>/ - skipped`);
				return false;
			}
			return true;
		});
}

export const byDateDesc = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

/** Reading order inside a category: explicit `order` first, then oldest first. */
export const bySeries = (a: Post, b: Post) =>
	(a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
	a.data.date.valueOf() - b.data.date.valueOf();

export const unique = <T>(items: T[]) => [...new Set(items)].sort();
