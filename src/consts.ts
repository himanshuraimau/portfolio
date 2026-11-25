export const SITE = {
	name: 'Himanshu Rai',
	url: 'https://enghimanshu.online',
	tagline: 'Software Engineer',
	jobTitle: 'Software Engineer',
	employer: 'Morgan Stanley',
	twitter: '@himanshura_i',
	locale: 'en_US',
	ogImage: '/og-default.png',
	description:
		'Himanshu Rai is a software engineer interested in AI infrastructure and performance engineering.',
};

export const LINKS = [
	{ label: 'GitHub', href: 'https://github.com/himanshuraimau' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-rai-246121278/' },
	{ label: 'X', href: 'https://x.com/himanshura_i' },
	{ label: 'Photography', href: 'https://instagram.com/musehimanshu' },
	{ label: 'Email', href: 'mailto:himanshuraimau9@gmail.com' },
];

export const NAV = [
	{ label: 'Home', href: '/' },
	{ label: 'Blog', href: '/blog/' },
];

// Blog structure: src/content/blog/<section>/<category>/<post>.md
// Folder names are the URL slugs. Add an entry here to give one a nice title
// and description; anything missing falls back to a title-cased folder name.
export const SECTIONS: Record<string, { title: string; description: string }> = {
	finance: {
		title: 'Finance',
		description: 'Notes and learnings on finance.',
	},
	tech: {
		title: 'Tech',
		description: 'Software, AI infrastructure and performance engineering.',
	},
};

export const CATEGORIES: Record<string, { title: string; description: string }> = {
	'finance/corporate-finance': {
		title: 'Corporate Finance',
		description:
			"My notes from Aswath Damodaran's corporate finance lectures, generated with Google NotebookLM.",
	},
	'tech/general': {
		title: 'General',
		description: 'Miscellaneous posts.',
	},
};
