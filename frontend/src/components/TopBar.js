import React from "react";
import { Link } from "react-router-dom";

const TopBar = ({ title }) => {
  return (
    <div className="top-bar">
      <span className="bold">{title}</span>
      <div className="flex">
        <Link to="/tickets/new">
          <button className="new-button">New</button>
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="standard-input search-input"
        />
        <div className="profile-image m-right-10">J</div>
      </div>
    </div>
  );
};

export default TopBar;
