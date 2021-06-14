import PropTypes from "prop-types";
import React, { useState } from "react";
import css from "./styles.css";
import ProductCard from "./ProductCard";

// input:
// title: type: string, content: text the carousel should be labeled with
// buttonOnClickEvent: type: function, content: callback behavior for clicking on a card's icon
// onClickEvent: type: function, content: callback behavior for clicking on a card's image
// buttonCharacter: type: string, content: either "star" or "circledX",
// should correspond to icon used in card
// ids: type: array of numbers, content: ids of products appearing in carousel
// output: carousel containing product cards
// dafaultCard: type: React element, content: child element that will
// appear as first item in carousel
// side effects: none
function CardCarousel({
  title, buttonOnClickEvent, onClickEvent = () => true, buttonCharacter = "star", ids, defaultCard,
}) {
  let cardArray = ids.map((id, index) => (
    <ProductCard
      key={title + index.toString()}
      id={id}
      buttonCharacter={buttonCharacter}
      buttonOnClickEvent={buttonOnClickEvent}
      onClickEvent={onClickEvent}
    />
  ));
  cardArray = [defaultCard].concat(cardArray);
  const [currentIndex, setCurrentIndex] = useState(0);
  // increments index
  const incrementIndex = () => {
    if (currentIndex < cardArray.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  // decrements index
  const decrementIndex = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className={css.carousel}>
      <h3 className={css.thinHeading3}>
        {title}
      </h3>
      {currentIndex !== 0
      && (
      <button type="button" className={css.chevronLeft} onClick={decrementIndex}>
        <i className="fa fa-chevron-left" aria-hidden="true" />
      </button>
      )}
      <div className={css.cardContainer}>
        {cardArray.slice(currentIndex, currentIndex + 6)}
      </div>
      {currentIndex < cardArray.length - 4
      && (
      <button type="button" className={css.chevronRight} onClick={incrementIndex}>
        <i className="fa fa-chevron-right" aria-hidden="true" />
      </button>
      )}
    </div>
  );
}

CardCarousel.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  buttonOnClickEvent: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func,
  buttonCharacter: PropTypes.string.isRequired,
  defaultCard: PropTypes.node,
};
CardCarousel.defaultProps = {
  onClickEvent: () => {},
  defaultCard: null,
};
export default CardCarousel;
