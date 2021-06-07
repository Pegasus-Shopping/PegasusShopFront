const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const config = require("../config");

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "./../Client/dist")));

// Headers required: Authorization token
// Get Request. Retrieves a list of avaliable products
app.get("/products", (req, res) => {
  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products", {
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data));
});

// Headers required: Authorization token
// Patch request. Get specfic product using product id.
app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${id}`, {
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data));
});

// Headers required: Authorization token
// Patch Request. Get all styles of a product using product id.
app.patch("/products/:id/styles", (req, res) => {
  const { id } = req.params;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${id}/styles`, {
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data));
});

// Headers required: Authorization token
// Patch Request. Get related items of a product using product id.
app.patch("/products/:id/related", (req, res) => {
  const { id } = req.params;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${id}/related`, {
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data));
});

// Headers required: Authorization token
// Param required: product_id
// Get Request. Get all reviews for a particular product using its product ID.
app.get("/reviews", (req, res) => {
  const id = req.query.product_id;
  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews", {
    params: {
      product_id: id,
    },
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data));
});

// Headers required: Authorization token
// Param required: product_id
// Get Request. Get all reviews meta data for a particular product using its product ID.
// (meta data include ratings, recommended, and characteristics)
app.get("/reviews/meta", (req, res) => {
  const id = req.query.product_id;
  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews/meta", {
    params: {
      product_id: id,
    },
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Connected to server at port", 3000);
});

module.exports = app;
