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

//@routes GET api/posts
//@desc Get an Post - Lấy mottj post
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const post = await Posts.findById(id);
    console.log(post);
    if (!post) throw Error("No Item !!");
    res.status(200).json(post);
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

//@routes DELETE api/posts/:id
//@desc Delete an Post - Xoá 1 post
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const posts = await Posts.findByIdAndDelete(id);
    if (!posts) throw Error("No Post Found !!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

//@routes UPDATE api/posts/:id
//@desc update an Post - Cập nhật 1 post
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const updateValue = req.body;
    const posts = await Posts.findByIdAndUpdate(
      id,
      updateValue
      //   { new: true },
      //   () => console.log("- update post")
    );
    if (!posts) throw Error("Something went wrong while updating post !!");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

module.exports = router;
