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
// Get request. Get specfic product using product id.
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${id}`, {
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data));
});

// Headers required: Authorization token
// Get Request. Get all styles of a product using product id.
app.get("/products/:id/styles", (req, res) => {
  const { id } = req.params;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${id}/styles`, {
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data));
});

// Headers required: Authorization token
// Get Request. Get related items of a product using product id.
app.get("/products/:id/related", (req, res) => {
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

// Header required: Authorization token
// Param required:
// Get Request. All skus in cart
app.get("/cart", (req, res) => {
  axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/cart", {
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data));
});

// Header required: Authorization token
// Param required: sku_id, (count)
// Post Request. Add sku to cart
app.post("/cart", (req, res) => {
  const { sku, count } = req.query;
  axios.post("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/cart", {
    params: {
      sku_id: Number(sku),
      count: Number(count),
    },
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data))
    .catch((resp) => res.send(resp.error));
});


app.post("/reviews", (req, res) => {
  const {
    rating, summary,
    recommend, body, date, helpfulness, photos,
  } = req.query;
  const { reviewerName } = req.query.reviewer_name;
  const { ratingId } = req.query.rating_id;

  axios.post("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews", {
    params: {
      rating_id: ratingId,
      rating,
      summary,
      recommend,
      body,
      date,
      reviewer_name: reviewerName,
      helpfulness,
      photos,
    },
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  })
    .then((resp) => res.send(resp.data))
    .catch((resp) => res.send(resp.error));
});


// Header required: Authorization token
// Param required: {
// widget:...,
// element:...,
// date:...,//
// }
// Post Request: add interactions data to Atelier API database
app.post("/clicks", (req, res) => {
  // console.log(req.body);
  axios.post("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/interactions", req.body,
    {
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Connected to server at port", 3000);
});

module.exports = app;
