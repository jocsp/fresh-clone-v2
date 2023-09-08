import React, { useEffect, useRef, useState } from "react";
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
        <table className="contacts-table">
          <thead className="contacts-heading">
            <tr>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>

          <tbody className="contacts-body">
            {contacts.map((contact, index) => {
              let trClassName = index % 2 === 0 ? "tr-light" : "tr-dark";

              return (
                <tr key={contact._id} className={`${trClassName} contact-row`}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>---</td>
                  <td>{parsePhoneNumber(contact.number).formatNational()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsPage;
