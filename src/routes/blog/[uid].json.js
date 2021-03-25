import Client from '../../../utils/client';
export async function get(req) {
    const { uid } = req.params
    
    /**
	 * @param {import('@sveltejs/kit).LoadOptions} options
	 * @returns {import('@sveltejs/kit').Loaded}
	 */
    const document = await Client.getByUID('blog_post', uid)

	if (document) {
        
        return {
            body: { 
                ...document
            }
        }

	} else {
        return {
            message: `Not found`
        };
	}
}
