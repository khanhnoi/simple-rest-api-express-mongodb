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
