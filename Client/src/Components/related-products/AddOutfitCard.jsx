import React, { useContext } from "react";
import DataContext from "../context";
import helpers from "./helper-functions";
import css from "./styles.css";
// import LocalStorageContext from "./LocalStorageContext";

// input: none
// output: product car
// side effects: makes api requests
function AddOutfitCard() {
  // const { outfitCount, setOutfitCount } = useContext(LocalStorageContext);
  const { updateCount } = useContext(DataContext);
  const { id } = useContext(DataContext).product;
  const onClickEvent = () => {
    helpers.addToOutfit(id);
    // setOutfitCount(outfitCount + 1);
    updateCount();
  };
  return (
    <div role="button" onClick={onClickEvent} onKeyDown={onClickEvent} tabIndex={0} className={css.card}>
      <div className={css.outfitCard}>
        <h3 className={css.addThisProduct}>  ADD THIS PRODUCT</h3>
      </div>
    </div>

  );
}

export default AddOutfitCard;
