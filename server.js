const express = require("express");
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
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
