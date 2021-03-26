const static = require('@sveltejs/adapter-static');
// const prismic = require('./adapter-prismic');
const pkg = require('./package.json');
const pages = require('./utils/routelist.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: static(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		prerender: {
			crawl: true,
			enabled: true,
			force: true,
			pages: [...pages],
		},

		vite: {
			ssr: {
				// external: keep,
				noExternal: Object.keys(pkg.dependencies || {})/*.filter(t => !keep.includes(t) )*/
			}
		}
	}
};
