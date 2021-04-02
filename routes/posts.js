const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const{
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require('../controller/posts');

// router.get('/', );
// router.post('/', );
// router.get('/:id', );
// router.put('/:id', );
// router.delete('/:id', );

router.route('/')
.get(protect, getPosts)
.post(protect, createPost);

router.route('/:id')
.get(protect, getPost)
.put(protect, updatePost)
.delete(protect, deletePost);


module.exports = router;