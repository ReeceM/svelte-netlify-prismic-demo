module.exports = function ({ dest = 'build', prefetch = null } = {}) {
  /** @type {import('@sveltejs/kit').Adapter} */
  const adapter = {
    name: '@reecem/adapter-prismic',

    async adapt(builder, config) {

      console.info(config.kit.prerender);

      if (!prefetch) {
        await builder.prerender({
          force: true,
          dest: dest
        })

        return;
      }

      let modifiedConfig = await prefetch(config);

      await builder.prerender({
        force: true,
        dest: dest,
        modifiedConfig
      });
    }
  };

  return adapter;
};
