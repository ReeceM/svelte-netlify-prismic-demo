import Prismic from '@prismicio/client';
import path from 'path';
import fs from 'fs';
import { cwd } from 'process';

const apiEndpoint = "https://chexblog.cdn.prismic.io/api/v2";
const Client = Prismic.client(apiEndpoint);

const linkResolver = (doc) => {
	if (doc.type === 'blog_post') {
		return `/blog/${doc.uid}`
	}

	return `/${uid}`;
}

const build = async () => {
    let query = await Client.query(Prismic.Predicates.at('document.type', 'blog_post'));
    let pages = ['*']
    let result = query.results.map(linkResolver);
    
    pages.push(...result)
    
    fs.writeFileSync(
        path.join(cwd(), './utils/routelist.json'),
        JSON.stringify(pages)
    )

    console.log('written: ', pages);
}

build();