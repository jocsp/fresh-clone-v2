import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ContactsIcon from "@mui/icons-material/Contacts";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

function NavBar() {
  return (
    <div className="vertical-nav">
      <Link className="dashboard-icon" to="/dashboard">
        <HeadsetMicIcon />
      </Link>

      <Link to="/dashboard">
        <DashboardIcon />
      </Link>

      <Link to="/tickets">
        <ConfirmationNumberIcon />
      </Link>

      <Link to="/contacts">
        <ContactsIcon />
      </Link>

      {/* <Link to="/settings">
        <SettingsIcon />
      </Link> */}
    </div>
  );
}

export default NavBar;
