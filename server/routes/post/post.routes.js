import express from 'express';
import { getPosts, createPost, updatePost, increaseLike, deletePost } from './post.controllers.js';
import { checkExistPost, SingleImageUploadChecking } from './post.middlewares.js';
import { formValid } from '../../middlewares/form.js';
import { postFormValidator } from './post.validators.js';
const route = express.Router();

//origin: /posts

//lấy toàn bộ posts
route.get("/",getPosts);

//thêm post
route.post("/",SingleImageUploadChecking,postFormValidator,formValid,createPost);

//update post
route.post("/update",SingleImageUploadChecking,postFormValidator,formValid,updatePost)

//increase like
route.post("/increase-like",checkExistPost,increaseLike);

//remove post
route.delete("/",checkExistPost,deletePost);


export default route;