import React from "react";
import PropTypes from "prop-types";
import css from "./styles.css";

// Reponse takes in props.response which is a string that is the message of the sellers response
// to the reviewer. If props.response is not null or an empty string, the Response function
// will display the message of the sellers.
function Response({ response }) {
  if (response !== null && response !== "") {
    return (
      <div align="center">
        <div className={css.response}>
          <span>Response: </span>
          <br />
          { response }
        </div>
      </div>
    );
  }
  return null;
}

Response.propTypes = {
  response: PropTypes.bool.isRequired,
};

export default Response;
