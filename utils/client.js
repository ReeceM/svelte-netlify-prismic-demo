import Prismic from '@prismicio/client';
// Update your repo name in the endpoint, below.
const apiEndpoint = "https://chexblog.cdn.prismic.io/api/v2";
const Client = Prismic.client(apiEndpoint);

export default Client;