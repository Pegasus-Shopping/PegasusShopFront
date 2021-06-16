import React, { useContext } from "react";
import DataContext from "../context";
import helpers from "./helper-functions";
import css from "./styles.css";
import RecordClicks from "../RecordClicks";
// input: none
// output: creates empty product card that adds the current product to the user's outfit
// side effects: adds the current product to the user's outfit, modifies App's outfitCount state
function AddOutfitCard() {
  const { updateCount } = useContext(DataContext);
  const { id } = useContext(DataContext).product;
  // input: none
  // output: none
  // side effects: adds the current product to the user's outfit, modifies App's outfitCount state
  const onClickEvent = () => {
    helpers.addToOutfit(id);
    updateCount();
  };
  return (
    <RecordClicks widget="related products comparison" element="add to outfit card">
      <div role="button" onClick={onClickEvent} onKeyDown={onClickEvent} tabIndex={0} className={css.card}>
        <div className={css.outfitCard}>
<<<<<<< HEAD
          <h3>
            {" "}

            <i className="fas fa-plus" />
          </h3>
=======
          <h3 className={css.addThisProduct}>+</h3>
>>>>>>> 3280de17e6269c9a27832681de675d790296ad14
        </div>
      </div>
    </RecordClicks>
  );
}

export default AddOutfitCard;
