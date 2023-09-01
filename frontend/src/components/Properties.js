import React, { useEffect, useState } from "react";
import SingleSelect from "./SingleSelect";
import { useFiltersContext } from "../hooks/useFiltersContext";
import { useTicketContext } from "../hooks/useTicketContext";
import useRequest from "../hooks/useRequest";
import { useAuthContext } from "../hooks/useAuthContext";

const Properties = () => {
  const { sendRequest } = useRequest();
  const {
    state: { filters },
    loaded,
  } = useFiltersContext();

  const { updateTicketsAssigned } = useAuthContext();

  const { ticket, updateTicket } = useTicketContext();

  const [isDisabled, setIsDisabled] = useState(true);

  const typeState = useState(ticket.type);
  const statusState = useState(ticket.status);
  const priorityState = useState(ticket.priority);
  const groupState = useState(ticket.group);
  const agentState = useState({
    name: ticket.agent.name,
    _id: ticket.agent._id,
  });

  // function to check if the single selects have been modified.
  // Also returns the data that has to be updated in the ticket.
  const isModified = () => {
    let modified = true;

    let dataModified = {};

    if (typeState[0]._id !== ticket.type._id) {
      modified = false;
      dataModified.type = typeState[0];
    }

    if (statusState[0]._id !== ticket.status._id) {
      modified = false;
      dataModified.status = statusState[0];
    }

    if (priorityState[0]._id !== ticket.priority._id) {
      modified = false;
      dataModified.priority = priorityState[0];
    }

    if (groupState[0]._id !== ticket.group._id) {
      modified = false;
      dataModified.group = groupState[0];
    }

    if (agentState[0]._id !== ticket.agent._id) {
      modified = false;
      dataModified.agent = agentState[0];
    }

    return { modified, dataModified };
  };

  useEffect(() => {
    const { modified } = isModified();
    setIsDisabled(modified);
  }, [
    typeState,
    statusState,
    priorityState,
    groupState,
    agentState,
    ticket,
    filters,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { dataModified } = isModified();

    const response = await sendRequest({
      method: "PATCH",
      url: "/api/ticket/update",
      data: { data: dataModified, ticket_id: ticket._id },
    });

    updateTicketsAssigned(response.data);

    updateTicket(dataModified);
  };

  return (
    <div className="properties-container">
      {ticket && loaded ? (
        <form className="properties" onSubmit={handleSubmit}>
          <p className="status-properties">{ticket.status.name}</p>
          <span className="title-properties">Properties</span>
          <SingleSelect
            label="Type"
            options={filters.types}
            state={typeState}
          />
          <SingleSelect
            label="Status"
            options={filters.status}
            state={statusState}
          />
          <SingleSelect
            label="Priority"
            options={filters.priorities}
            state={priorityState}
          />
          <SingleSelect
            label="Group"
            options={filters.groups}
            state={groupState}
          />
          <SingleSelect
            label="Agent"
            options={filters.agents}
            state={agentState}
          />

          <button
            type="submit"
            className="standard-button dark-bc update-button"
            disabled={isDisabled}
          >
            Update
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Properties;
