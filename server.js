const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares

//Routes
app.get("", (req, res) => {
  res.send("test kn");
});

//how to we start listing to the server
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
