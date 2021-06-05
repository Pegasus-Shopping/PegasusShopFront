const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "./../Client/dist")));

app.listen(port, () => {
  console.log("Connected to server at port", 3000);
});

function sum(a, b) {
  return a + b;
}
module.exports = sum;
