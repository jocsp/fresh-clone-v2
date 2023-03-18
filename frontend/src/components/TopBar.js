import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const TopBar = ({ title }) => {
  const { agent: currentAgent } = useAuthContext();

  return (
    <div className="top-bar">
      <span className="bold">{title}</span>
      <div className="flex-center">
        <Link to="/tickets/new">
          <button className="new-button">New</button>
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="standard-input search-input"
        />
        <div className="profile-image m-right-10">{currentAgent.name[0]}</div>
      </div>
    </div>
  );
};

export default TopBar;
