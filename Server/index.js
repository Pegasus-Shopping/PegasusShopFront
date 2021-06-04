/* const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../Client/Dist')); */

function sum(a, b) {
  return a + b;
}
module.exports = sum;

