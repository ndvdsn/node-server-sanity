const asyncHandler = require('express-async-handler')
const {listPosts, getAPost} = require('../queries/postQueries')
const {createPost, updateAPost, deleteAPost} = require('../mutations/postMutations')

// @desc Get posts
// @route GET /api/posts
// @access Private
const getPosts = asyncHandler(async (req, res) => {
    const posts = await listPosts()
    res.status(200).json(posts)
})

// @desc Get a post
// @route GET /api/posts/:slug
// @access Private
const getSinglePost = asyncHandler(async (req, res) => {
    const posts = await getAPost(req.params.slug)
    res.status(200).json(posts)
})

// @desc Set posts
// @route POST /api/posts
// @access Private
const setPost = asyncHandler(async(req, res) => {
    if(!req.body.title){
        res.status(400)
        throw new Error('Please add a title field')
    }
    createPost(req.body)
    res.status(200).json({message: "Set Posts"})
})

// @desc Update post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async(req, res) => {
    updateAPost(req)
    res.status(200).json({message: `Update post ${req.params.id}`})
})

// @desc Delete post
// @route DELETE /api/post/:id
// @access Private
const deletePost = asyncHandler(async(req, res) => {
    deleteAPost(req.params.id)
    res.status(200).json({message: `Delete post ${req.params.id}`})
})

module.exports = {
    getPosts,
    getSinglePost,
    setPost, 
    updatePost,
    deletePost
}