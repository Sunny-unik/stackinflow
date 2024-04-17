import React from "react";
import { NavLink } from "react-router-dom";

export default function AskQuestionGuide() {
  return (
    <div className="col-md-4 col-sm-11 d-inline-block mb-4 mx-1 card">
      <div className="card-header text-center">
        <h4>Tips for your question</h4>
      </div>
      <p className="p-2">
        The community is here to help you with specific coding, algorithm, or
        language problems.
        <br />
        Avoid asking opinion-based questions.
      </p>
      <details className="p-2">
        <summary style={{ fontFamily: "sans-serif" }}>
          <h5 className="d-inline-block">1. Summarize the problem</h5>
        </summary>
        <p className="px-3 py-1">
          Include details about your goal Describe expected and actual results
          Include any error messages
        </p>
      </details>
      <details className="p-2">
        <summary style={{ fontFamily: "sans-serif" }}>
          <h5 className="d-inline-block">2. Describe what you’ve tried</h5>
        </summary>
        <p className="px-3 py-1">
          Show what you’ve tried and tell us what you found (on this site or
          elsewhere) and why it didn’t meet your needs. You can get better
          answers when you provide research.
        </p>
      </details>
      <details className="p-2">
        <summary style={{ fontFamily: "sans-serif" }}>
          <h5 className="d-inline-block">3. How to tag</h5>
        </summary>
        <p>Tags help the right people find and answer your question.</p>
        <li>
          Include tags that are crucial to your question only, like{" "}
          <NavLink to="/tagged/test" target="_blank">
            test
          </NavLink>
        </li>
        <li>
          Only include version numbers, like php-4.0, when absolutely necessary
        </li>
        <li>Use existing popular tags</li>
        <li>
          To create new tags you have to submit your request{" "}
          <NavLink to="/request/tag" target="_blank">
            Here
          </NavLink>
        </li>
      </details>
    </div>
  );
}
