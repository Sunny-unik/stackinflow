import React from "react";

const Toast = ({ toastClass, title, brief }) => {
  return (
    <div
      className={"toast show " + toastClass}
      role="alert"
      animation={true}
      autohide={true}
      delay={2500}
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{title}</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">{brief}</div>
    </div>
  );
};

export default Toast;
