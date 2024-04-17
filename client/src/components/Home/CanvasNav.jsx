import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaHome, FaTags, FaUsers } from "react-icons/fa";
import { RiQuestionnaireFill } from "react-icons/ri";
import { TbPencilQuestion } from "react-icons/tb";

export default function CanvasNav(props) {
  const user = useSelector((state) => state.user);

  const sideLink = useCallback(() => {
    user
      ? props.history.push("/question/create")
      : alert("User need to login first");
  }, [user, props]);

  return (
    <ul id="canvasNav" className="p-1">
      <li className="mt-2 p-1">
        <NavLink exact to="/">
          <FaHome /> Home
        </NavLink>
      </li>
      <li className="mt-2 p-1">
        <NavLink to="/questions">
          <RiQuestionnaireFill /> Questions
        </NavLink>
      </li>
      <li className="mt-2 p-1">
        <NavLink to="/tags">
          <FaTags /> Tags
        </NavLink>
      </li>
      <li className="mt-2 p-1">
        <NavLink to="/users">
          <FaUsers /> Users
        </NavLink>
      </li>
      <li className="mt-2 p-1">
        <div className="extraLink" onClick={sideLink}>
          <TbPencilQuestion /> Ask Question
        </div>
      </li>
    </ul>
  );
}
