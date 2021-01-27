# Simple CRUD by Express, MongoDB. RESTful API

Cái này mình test lại cái express, mongoose vs học xài thử MongoDB trên cloud mongodb atlas là chính

Download: [File Json test PostMan](http://khanhnoi.mobie.in/json/Test+API+CRUD+Express+MongoDB.postman_collection.json)

Cách tải file .Json bằng url rất dễ. Bạn chỉ cần Ctrl - S là được.

## How to build ?

```bash
# development
$ npm init -y
$ npm i express
$ npm i nodemon -D
$ npm i mongoose

```

```bash
# package.json
"scripts": {
        "start": "nodemon server.js"
    },

```

Sau đó ta cần có tài khoản cloud mongodb atlas.
Hay đăng kí bằng tk Google.
\+newProject => đặt tên => next => Build a Cluster => Chọn hàng Free => Chọn vùng (asian) => Create Cluster

NetWork Access => Add IP address => Allow Access From AnyWhere => Confirm

Database Access => Add New DataBase User => Đặt tên và pass => Add User

(Vô lại NetWork Access => Xem Status đã Active chưa)

Clusters => Connect => Connect to your application => copy string Code đó để đưa vô config pj nhé

```bash
# cofig.js - uri mongDB
module.exports = {
  MONGO_URI:
    "mongodb+srv://khanhnoi:nu0wBzIW7GJtApku@cluster0.914jm.mongodb.net/khanhnoi?retryWrites=true&w=majority",
};
```

```bash
# server.js
onst express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
//Routes
const postRoutes = require("./routes/api/post");

const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares
//Body Parser
app.use(express.json());

//Connect to mongoDB
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MONGODB connected"))
  .catch((error) => console.log(error));

// User routes
app.use("/api/posts", postRoutes);

//test
// app.get("", (req, res) => {
//   res.send("test kn");
// });

//how to we start listing to the server
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

```

```bash
# model/Post.js
module.exports = {
const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model("Posts", PostSchema);

module.exports = Posts;

```

```bash
# routes/api/post.js
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

```
