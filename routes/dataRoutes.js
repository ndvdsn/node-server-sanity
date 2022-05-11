const express = require('express')
const router = express.Router()
const { getPosts, getSinglePost, setPost, updatePost, deletePost } = require('../controllers/dataController')

router.route('/').get(getPosts).post(setPost)
router.route('/:id').put(updatePost).delete(deletePost)
router.route('/:slug').get(getSinglePost)


module.exports = router