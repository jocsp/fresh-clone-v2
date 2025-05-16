import React from "react";
import { Link } from "react-router-dom";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useTicketContext } from "../hooks/useTicketContext";
import ProfileImage from "./ProfileImage";
import LaunchIcon from "@mui/icons-material/Launch";
import Timeline from "./Timeline/Timeline";
import Loading from "./Loading";

const ContactDetails = () => {
  const { ticket } = useTicketContext();

  return (
    <>
      {ticket ? (
        <div className="contact-details-container">
          <div className="contact-details-heading flex">
            <PermContactCalendarIcon />
            <p>Contact Details</p>{" "}
          </div>

          <div className="contact-details-content">
            <div className="flex">
              <ProfileImage profile={ticket?.contact} />
              <p style={{ color: "#4F69C1" }}>{ticket?.contact.name}</p>
            </div>
            <p className="email-heading">Email</p>
            <p className="contact-email"> {ticket?.contact.email} </p>
            <Link
              to={`/contact/${ticket?.contact._id}`}
              className="view-more-link">
              <LaunchIcon style={{ fontSize: "medium" }} />
              View more info
            </Link>
            {ticket ? (
              <Timeline tickets={ticket?.contact.tickets} limit={5} />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ContactDetails;
