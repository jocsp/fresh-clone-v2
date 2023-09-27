import React from "react";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import useFetchData from "../hooks/useFetchData";
import { parsePhoneNumber } from "libphonenumber-js";
import { Link } from "react-router-dom";

const ContactsPage = () => {
  const { data: contacts } = useFetchData("/api/contacts/all", []);

  return (
    <div className="contacts-page">
      <NavBar />
      <TopBar title="Contacts" />

      <div className="table-container">
        <div className="table contacts-table">
          <div className="table-row contacts-heading">
            <div className="table-cell">Contact</div>
            <div className="table-cell">Email</div>
            <div className="table-cell">Address</div>
            <div className="table-cell">Phone Number</div>
          </div>
          {contacts.map((contact) => {
            return (
              <Link
                to={`/contact/${contact._id}`}
                key={contact._id}
                className="table-row"
              >
                <div className="table-cell">{contact.name}</div>
                <div className="table-cell">{contact.email}</div>
                <div className="table-cell">---</div>
                <div className="table-cell">
                  {parsePhoneNumber(contact.number).formatNational()}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
