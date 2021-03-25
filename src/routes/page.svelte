<script context="module">
    import Client from './../../utils/client';
    import PrismicDom from 'prismic-dom';

    export async function load({}) {
        const document = await Client.getByUID('blog_post', 'hello-world');
        return {
            props: {
                document
            }
        };
    }
</script>
<script>
    export let document;
</script>
  
<main>
    <div class="container">
        <h1>{document.uid}</h1>
        {@html PrismicDom.RichText.asHtml(document.data.title)}
        <pre>{JSON.stringify(document, null, 2)}</pre>
    </div>
</main>

<style>
    main {
        font-family: sans-serif;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px 20px;
    }

    .container>* {
        width: 100%;
        max-width: 700px;
    }
</style>