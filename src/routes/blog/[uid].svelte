<script context="module">
  // export const prerender = true;
  
  /**
   * @param {import('@sveltejs/kit).LoadOptions} options
   * @returns {import('@sveltejs/kit').Loaded}
   */
  export async function load({
    page,
    fetch
  }) {
    
    const url = `/blog/${page.params.uid}.json`;
    const res = await fetch(url);
    
    if (res.ok) {
      return {
        props: {
          document: await res.json()
        }
      };
    }
    
    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    };
  }
</script>

<script>
  import Counter from "$lib/Counter.svelte";

  import PrismicDOM from "prismic-dom";
  export let document;
</script>

<svelte:head>
  <title>{document.uid}</title>
</svelte:head>
<div>
  {@html PrismicDOM.RichText.asHtml(document.data.title)}
  <Counter />
</div>