import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import ProfileImage from "./ProfileImage";
import useRequest from "../hooks/useRequest";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function TopBar({ title }) {
  const { agent: currentAgent, dispatch } = useAuthContext();
  const { sendRequest } = useRequest();
  const [displaySubMenu, setDisplaySubMenu] = useState(false);

  const submenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef && !submenuRef.current.contains(event.target)) {
        setDisplaySubMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const logoutAgent = async () => {
    const response = await sendRequest({
      method: "GET",
      url: "api/user/logout",
    });

    if (response.data.loggedOut) {
      dispatch({ type: "LOGOUT" });
    }
  };

  return (
    <div className="top-bar">
      <span className="bold">{title}</span>
      <div className="flex-center">
        <Link to="/tickets/new">
          <button className="new-button">New Ticket</button>
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="standard-input search-input"
        />
        <div ref={submenuRef}>
          <ProfileImage
            profile={currentAgent}
            handleClick={() => setDisplaySubMenu((prevValue) => !prevValue)}
            clickable={true}
          />
          {displaySubMenu ? (
            <div className="profile-image-submenu">
              <div
                onClick={logoutAgent}
                className="flex hover:bg-gray-100 px-1 py-0.5 hover:cursor-pointer">
                <ExitToAppIcon className="mr-1" />
                <p>Log out</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
