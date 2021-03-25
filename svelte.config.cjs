const static = require('@sveltejs/adapter-static');
const prismic = require('./adapter-prismic');
const pkg = require('./package.json');
const Prismic = require('@prismicio/client');
const apiEndpoint = "https://chexblog.cdn.prismic.io/api/v2";
const Client = Prismic.client(apiEndpoint);

const linkResolver = (doc) => {
  if (doc.type === 'blog_post') {
    return `/blog/${doc.uid}`
  }

  return `/${uid}`;
}


/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: prismic({
			prefetch: async (config) => {
				let query = await Client.query(Prismic.Predicates.at('document.type', 'blog_post'));

				let result = query.results.map(linkResolver);
		  
				config.kit.prerender.pages.push(...result)
		  
				return config
			}
		}),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		prerender: {
			crawl: true,
			enabled: true,
			force: true,
			pages: ['*'],
		},

		vite: {
			ssr: {
				// external: keep,
				noExternal: Object.keys(pkg.dependencies || {})/*.filter(t => !keep.includes(t) )*/
			}
		}
	}
};
