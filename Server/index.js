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
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
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
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
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
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
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
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
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
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
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
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
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
    .then((resp) => res.send(resp.data))
    .catch((error) => res.send(error));
});

// Header required: Authorization token
// Param required: sku_id, (count)
// Post Request. Add sku to cart
app.post("/cart", (req, res) => {
  const { sku, count } = req.body.params;
  const data = JSON.stringify({
    sku_id: sku,
  });

  const requestDetails = {
    method: "post",
    url: "https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/cart",
    headers: {
      Authorization: `${config.TOKEN}`,
      "Content-Type": "application/json",
    },
    data,
  };

  for (let i = 0; i < count; i += 1) {
    axios(requestDetails)
      .then((response) => { res.send(response.data); })
      .catch(() => {
        res.sendStatus(500);
      });
  }
});

app.post("/reviews", (req, res) => {
  console.log(req.body);
  const {
    rating, summary,
    recommend, body, photos, email, characteristics, name,
  } = req.body.params.newReview;
  const { productId } = req.body.params.newReview.product_id;

  axios.post("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews", req.body.params.newReview,
    {
      headers: {
        Authorization: `${config.TOKEN}`,
      },
    })
    .then((resp) => res.send(resp.data))
    .catch((error) => {
      console.log(error);
    });
});

// Header required: Authorization token
// Param required: {
// widget:...,
// element:...,
// date:...,//
// }
// Post Request: add interactions data to Atelier API database
app.post("/clicks", (req, res) => {
  console.log(req.body);
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
  res.sendStatus(200);
});
// Header required: Authorization token
// Param required: sku_id, (count)
// GET Request.  equivlent to making requests to
// /reviews/meta, /reviews, /products/styles, /products
app.get("/all", (req, res) => {
  const id = req.query.product_id;
  const details = {
    params: {
      product_id: id,
    },
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  };
  axios.all([
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${id}/styles`, details),
    axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews/meta", details),
    axios.get("https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews", details),
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${id}`, details),
  ])
    .then(
      axios.spread((stylesReturn, ratingReturn, reviewsReturn, productReturn) => {
        res.send({
          stylesReturn: stylesReturn.data,
          ratingReturn: ratingReturn.data,
          reviewsReturn: reviewsReturn.data,
          productReturn: productReturn.data,
        });
      }),
    )
    .catch((err) => {
      console.log("/formated", err);
      res.sendStatus(500);
    });
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Connected to server at port", 3000);
});

module.exports = app;
