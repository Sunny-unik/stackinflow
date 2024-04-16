import "./spinner.css";
import React from "react";

export default function Spinner() {
  return (
    <div className="mt-sm-2 mt-md-2 mt-lg-2 loading text-center">
      <br />
      <span className="spinner"></span>
      <br />
      <h5 className="rounded text-warning bg-primary w-75 m-auto py-2">
        🙄 Wait for a while, arranging all pieces together. 🙃
      </h5>
      <br />
    </div>
  );
}
