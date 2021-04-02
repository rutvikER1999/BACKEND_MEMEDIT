const Post = require('../models/Post');
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse');

//@desc         GET ALL POSTS
//@route        GET /api/v1/posts
//access        Public
exports.getPosts = asyncHandler(async (req, res, next) => {
    
        posts = await Post.find();
        return res.
            status(200).
            json({ success: true, count: posts.length, data: posts });
});

//@desc         CREATE SINGLE POST
//@route        POST /api/v1/posts
//access        Private
exports.createPost = asyncHandler(async (req, res, next) => {
    
        post = await Post.create(req.body);
        return res.
            status(200).
            json({ success: true, data: post });
});

//@desc         GET SINGLE POSTS
//@route        GET /api/v1/posts/:id
//access        Private
exports.getPost = asyncHandler(async (req, res, next) => {
        post = await Post.findById(req.params.id);
        if (!post) {
            return next(new ErrorResponse(`post not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({ success: true, data: post });
});

//@desc         DELETE SINGLE POSTS
//@route        DELETE /api/v1/posts/:id
//access        Private
exports.deletePost = asyncHandler(async (req, res, next) => {
        post = await Post.findOneAndDelete(req.params.id);
        if (!post) {
            return next(new ErrorResponse(`post not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({ success: true, data: {} });
    
});

//@desc         UPDATE SINGLE POSTS
//@route        PUT /api/v1/posts/:id
//access        Private
exports.updatePost = asyncHandler(async (req, res, next) => {
        post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!post) {
            return next(new ErrorResponse(`post not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({ success: true, data: post });
});

