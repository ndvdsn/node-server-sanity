const client = require('../config/sanityConfig')

const listPosts = async () => {
    const query = `*[_type == "post"]{
        _id,
        title, 
        slug, 
        author, 
        "categories": categories[]->{
            title, 
            description
        }, 
        body}`
    const results = await client.fetch(query)
    return results
}

const getAPost = async (postSlug) => {
    const query = `*[_type == "post" && slug.current == ${JSON.stringify(postSlug)}]{
        title,
        author, 
        "categories": categories[]->{
            title, 
            description
        }, 
        body
    }`
    const results = await client.fetch(query)
    return results
}


module.exports = {
    listPosts,
    getAPost
}