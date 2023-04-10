import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import ProfileImage from './ProfileImage';

function TopBar({ title }) {
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
        <ProfileImage profile={currentAgent} />
      </div>
    </div>
  );
}

export default TopBar;
