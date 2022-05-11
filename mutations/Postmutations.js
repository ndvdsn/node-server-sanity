const client = require('../config/sanityConfig')
const {v4: uuidV4} = require('uuid')

// Utilities
const formatSlug = (text) => {
    return text.replace(/ /g, "-").toLowerCase()
    // write a more comprehensive slugify function to exclude problem chars
}

const createPost = async (post) => {
    console.log(post)
    const submission = {
        _type: "post",
        title: post.title,
        body: [{
            _type: "block",
            _key: uuidV4(),
            style: "normal",
            children: [{
                _key: uuidV4(),
                _type: "span",
                text: post.body,
                marks: []
            }],
            markDefs: []
        }],
        author: {
            _type: 'reference',
            _ref: "685cb637-f8db-42af-b78b-35a3ba73074d"
        },
        slug: {
            current: formatSlug(post.title)
        },
        publishedAt: new Date().toISOString()
    }
    client.create(submission)
}

const updateAPost = async (req) => {
    client.patch(req.params.id)
    .set({
        title: req.body.title,
        body: [{
            _type: "block",
            _key: uuidV4(),
            style: "normal",
            children: [{
                _key: uuidV4(),
                _type: "span",
                text: req.body.body,
                marks: []
            }],
            markDefs: []
        }],
        // currently leaves slug unchanged once title is changed. consider updating the slug based on published title (would allow front end correction of bad slug...)
        publishedAt: new Date().toISOString()
    })
    .commit()
    .then((updatedPost) => console.log(updatedPost))
    .catch((err) => console.error(err.message))
}

const deleteAPost = async (id) => {
    client.delete(id)
    .then(console.log(`Item ${id} deleted`))
    .catch((err) => {
        console.error("Delate failed", err.message)
    })
}

module.exports = {
    createPost,
    updateAPost,
    deleteAPost
}