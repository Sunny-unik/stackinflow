import React from "react";

export default function Error({ message, statusCode }) {
  return (
    <div className="alert m-4 w-75 mx-auto alert-danger" role="alert">
      <h4 className="alert-heading">Server Error!</h4>
      <svg
        className="bi flex-shrink-0 me-2"
        width="24"
        height="24"
        role="img"
        aria-label="Danger:"
      >
        <use href="#exclamation-triangle-fill" />
      </svg>
      <p>
        {message
          ? message
          : `Server responded with ${
              statusCode ? statusCode : "500"
            } status code. Try again later.`}
      </p>
      <hr />
    </div>
  );
}
