const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post=require('../models/post');

const PostRouter = express.Router();

PostRouter.use(bodyParser.json());

PostRouter.route('/')
.get((req,res,next)=>{
    Post.find({})
    .then((posts)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(posts);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    Post.create(req.body)
    .then((posts)=>{
        console.log('Posts Created',posts);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(posts);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = PostRouter;