//controller - posts.js

const Post = require('../models/Post');

//@desc         GET ALL POSTS
//@route        GET /api/v1/posts
//access        Public
exports.getPosts = async (req, res, next) => {
    try {
        posts = await Post.find();
        return res.
            status(200).
            json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

//@desc         CREATE SINGLE POST
//@route        POST /api/v1/posts
//access        Private
exports.createPost = async (req, res, next) => {
    try {
        post = await Post.create(req.body);
        return res.
            status(200).
            json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false });
    }

};

//@desc         GET SINGLE POSTS
//@route        GET /api/v1/posts/:id
//access        Private
exports.getPost = async (req, res, next) => {
    try {
        post = await Post.findById(req.params.id);
        if(!post){
            return res.status(400).json({ success: false });
        }
        return res.
            status(200).
            json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

//@desc         DELETE SINGLE POSTS
//@route        DELETE /api/v1/posts/:id
//access        Private
exports.deletePost = async (req, res, next) => {
    try {
        post = await Post.findOneAndDelete(req.params.id);
        if(!post){
            return res.status(400).json({ success: false });
        }
        return res.
            status(200).
            json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

//@desc         UPDATE SINGLE POSTS
//@route        PUT /api/v1/posts/:id
//access        Private
exports.updatePost = async(req, res, next) => {
    try {
        post = await Post.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!post){
            return res.status(400).json({ success: false });
        }
        return res.
            status(200).
            json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

//normal test........
const testSChema = new mongoose.Schema({
    description:{
        type: String,
        length:500
    }
    
});
const Tmp = mongoose.model('Tesast', testSChema);
const dd = await Tmp.createCollection();