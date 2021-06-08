/* eslint-disable import/extensions */
import PropTypes from "prop-types";
import React from "react";
import css from "./styles.css";
import ProductCard from "./ProductCard.jsx";

function CardCarousol({
  productInfo, title, buttonOnClickEvent, onClickEvent,
}) {
  let count = 0;
  const cardArray = productInfo.map((product) => {
    count += 1;
    return (
      <ProductCard
        product={product}
        key={title + count}
        buttonOnClickEvent={buttonOnClickEvent}
        onClickEvent={onClickEvent}
      />
    );
  });
  return (
    <div className={css.carousel}>
      <h3 className={css.thinHeading3}>
        {title}
      </h3>
      {/* <button type="button" className={css.chevronLeft}>
        {"<"}
      </button> */}
      <div className={css.cardContainer}>
        {cardArray}

      </div>
      <button type="button" className={css.chevronRight}>
        &gt;
      </button>
    </div>
  );
}

CardCarousol.propTypes = {
  productInfo: PropTypes.arrayOf(PropTypes.objects).isRequired,
  title: PropTypes.string.isRequired,
  buttonOnClickEvent: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func.isRequired,
};
export default CardCarousol;
