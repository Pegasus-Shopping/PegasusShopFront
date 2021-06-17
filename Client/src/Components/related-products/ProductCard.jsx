import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import css from "./styles.css";
import helper from "./helper-functions";
import StarList from "../product-reviews/star-rating/StarList";
import RecordClicks from "../RecordClicks";

const { getTruePrice } = helper;

// input:
// id: type: number, content: product id
// buttonOnClickEvent: type: function, content: callback behavior for clicking on a card's icon
// buttonCharacter: type: string, content: either "star" or "circledX",
// should correspond to icon used in card
// onClickEvent: type: function, content: callback behavior for clicking on a card's image
// output: product card
// side effects: makes api requests
function ProductCard({
  id, buttonOnClickEvent, buttonCharacter, onClickEvent,
}) {
  let buttonClass = "fa fa-star-o";
  if (buttonCharacter === "circledX") {
    buttonClass = "fa fa-times-circle-o";
  }
  const [isBusy, setBusy] = useState(true);
  const [style, setStyle] = useState(null);
  const [rating, setRating] = useState([0, 0]);
  const [details, setDetails] = useState(null);
  useEffect(() => {
    // get styles
    axios.get(`/products/${id}/styles`)
      .then((res) => {
        setStyle(res.data.results);
      })
      .then( // get ratings
        () => axios.get("/reviews", { params: { product_id: id } })
          .then((res) => {
            const list = res.data.results;
            const ratingList = [];
            // console.log("res.data.results", res.data.results);
            list.forEach((review) => {
              ratingList.push(review.rating);
            });
            // console.log("list", ratingList);
            setRating(ratingList);
          }),
      ).then(
        () => ( // get details
          axios.get(`/products/${id}`)
            .then((res) => {
              setDetails({
                name: res.data.name,
                id,
                category: res.data.category,
                default_price: res.data.default_price,
                features: res.data.features,
              });
            })
        ),
      )
      .then(() => {
        setBusy(false);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const widget = "related products comparison";
  return (

    <div className={css.card}>
      {!isBusy
      && (
        <div className={css.cardContents}>
          <RecordClicks widget={widget} element="card button">
            <button type="button" className={css.iconContainer} onClick={() => buttonOnClickEvent(details)}>
              <i className={buttonClass} />
            </button>
          </RecordClicks>
          <RecordClicks widget={widget} element="card body">
            <div className={css.imgBox} onClick={() => onClickEvent(id)} onKeyUp={() => onClickEvent(id)} role="button" tabIndex="0">
              <img
                src={style[0].photos[0].thumbnail_url}
                alt={details.name}
                className={css.cardImage}
              />
            </div>
          </RecordClicks>
          <div className={css.cardDetails}>
            <h3 className={css.thinHeading1}>{details.category.toUpperCase()}</h3>
            <h3 className={css.thinHeading2}>{details.name}</h3>
            <h3 className={css.thinHeading1}>{`$${getTruePrice(details, style)}`}</h3>
            <StarList list={rating} />
          </div>
        </div>
      )}
    </div>
  );
}
ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  buttonOnClickEvent: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func,
  buttonCharacter: PropTypes.string.isRequired,
};
ProductCard.defaultProps = {
  onClickEvent: () => {},
};
export default ProductCard;
