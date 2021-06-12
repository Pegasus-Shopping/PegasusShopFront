/* eslint-disable import/extensions */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import css from "./styles.css";
import helper from "./helper-functions";

const { getTruePrice } = helper;

// input:
// buttonOnClickEvent: type: function, content: callback behavior for clicking on a card's icon
// onClickEvent: type: function, content: callback behavior for clicking on a card's image
// buttonCharacter: type: string, content: either "star" or "circledX",
// should correspond to icon used in card
// id: type: number, content: product id
// output: product car
// side effects: makes api requests
function ProductCards({
  id, buttonOnClickEvent, buttonCharacter, onClickEvent,
}) {
  let buttonClass = "fa fa-star-o";
  if (buttonCharacter === "circledX") {
    buttonClass = "fa fa-times-circle-o";
  }
  const [isBusy, setBusy] = useState(true);
  const [style, setStyle] = useState(null);
  const [rating, setRating] = useState(0);
  const [details, setDetails] = useState(null);
  useEffect(() => {
    // get styles
    axios.get(`/products/${id}/styles`)
      .then((res) => {
        setStyle(res.data.results);
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
      });
  }, [id]);
  return (

    <div className={css.card}>
      {!isBusy
      && (
      <div className={css.cardContents}>
        <button type="button" className={css.iconContainer} onClick={() => buttonOnClickEvent(details)}>
          <i className={buttonClass} />
        </button>
        <div className={css.imgBox} onClick={() => onClickEvent(id)} onKeyUp={() => onClickEvent(id)} role="button" tabIndex="0">
          <img
            src={style[0].photos[0].thumbnail_url}
            alt={details.name}
            className={css.cardImage}
          />
        </div>
        <div className={css.cardDetails}>
          <h3 className={css.thinHeading1}>{details.category.toUpperCase()}</h3>
          <h3 className={css.thinHeading2}>{details.name}</h3>
          <h3 className={css.thinHeading1}>{`$${getTruePrice(details, style)}`}</h3>
          <h3 className={css.thinHeading1}>{rating["3"]}</h3>
        </div>
      </div>
      )}
    </div>
  );
}
ProductCards.propTypes = {
  id: PropTypes.number.isRequired,
  buttonOnClickEvent: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func.isRequired,
  buttonCharacter: PropTypes.string.isRequired,
};
export default ProductCards;
