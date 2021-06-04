const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use(express.static('./../Client/dist'));

app.listen(port, () => {
  console.log('Connected to server at port', 3000);
});

function sum(a, b) {
  return a + b;
}
<<<<<<< HEAD
module.exports = sum;
=======
module.exports = sum;

console.log("hello world");
>>>>>>> Added changes to make eslint compatable for Jest
