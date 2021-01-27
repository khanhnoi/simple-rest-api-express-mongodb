const express = require("express");

const router = express.Router();

//post Model
const Posts = require("../../models/Post");

//@routes GET api/posts
//@desc Get All Post - Lấy tất cả post
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("No Item !!");
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

//@routes POST api/posts
//@desc Create An Post - Thêm 1 post
router.post("/", async (req, res) => {
  //   res.send(`let's create post`);
  //   console.log(req.body);
  const newPost = new Posts(req.body);

  try {
    const post = await newPost.save();
    if (!post) throw Error("Something went wrong while saving the post");
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

module.exports = router;
