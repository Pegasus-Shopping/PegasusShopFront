import React, {useState, useEffect} from "react";
import ProductOverview from "./product-overview/ProductOverview.jsx";
import RelatedProductsComparison from "./related-products/RelatedProductsComparison.jsx";
import QuestionsAnswers from "./questions-answers/QuestionsAnswers.jsx";
import ProductReviews from "./product-reviews/ProductReviews.jsx";
import DataContext from "./context";
import axios from 'axios';

function App() {

const [isBusy, setBusy] = useState(true);
const [styles, setStyles] = useState(null);
const [rating, setRating] = useState(0);
const [product, setProduct] = useState({id: 20100});

useEffect(() => {
  const id = product.id;
  // get styles
  axios.get(`/products/${id}/styles`)
    .then((res) => {
      setStyles(res.data.results);
    })
    .then( // get ratings
      () => axios.get("/reviews/meta/", { params: { product_id: id } })
        .then((res) => {
          setRating(res.data.ratings);
        }),
    ).then(
      () => ( // get details
        axios.get(`/products/${id}`)
          .then((res) => {
            console.log(res);
            setProduct(res.data);
          })
      ),
    )
    .then(() => {
      setBusy(false);
    });
}, []);
  return (
    <div>
      <h1>Shopping</h1>
      {
        !isBusy &&
        <React.Fragment >
          <DataContext.Provider value={{product: product, styles: styles, styleIndex: 0}}>
            <ProductOverview />
          </DataContext.Provider>
          <RelatedProductsComparison />
          <QuestionsAnswers />
          <ProductReviews />
        </React.Fragment>
      }
    </div>
  );
}

export default App;
