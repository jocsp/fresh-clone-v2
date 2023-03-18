import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import SingleSelect from "../components/SingleSelect";
import InputText from "../components/InputText";
import { useFiltersContext } from "../hooks/useFiltersContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "../api/axios";

const NewTicket = () => {
  const {
    state: { filters },
    loaded,
  } = useFiltersContext();

  const { agent: currentAgent } = useAuthContext();

  const navigate = useNavigate();

  // variable to only render the single selects after the states are set.
  const [render, setRender] = useState(false);
  const [error, setError] = useState(null);

  const [contact, setContact] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");

  const [subject, setSubject] = useState("");

  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [priority, setPriority] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");

  const [group, setGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [agent, setAgent] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const [description, setDescription] = useState("");
  const [createAnother, setCreateAnother] = useState(false);

  useEffect(() => {
    if (loaded) {
      setContact([...filters.contacts]);
      setType([...filters.types]);
      setStatus([...filters.status]);
      setPriority([...filters.priorities]);
      setGroup([...filters.groups]);
      setAgent([...filters.agents]);
      setRender(true);
    }
  }, [loaded, filters]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    const data = {
      contact: selectedContact,
      subject: subject,
      type: selectedType,
      status: selectedStatus,
      priority: selectedPriority,
      group: selectedGroup,
      agent: selectedAgent,
      description: description,
      date: new Date(),
      createdBy: { _id: currentAgent._id, name: currentAgent.name },
    };

    try {
      const response = await axios({
        url: "/api/ticket/new-ticket",
        method: "POST",
        data: data,
      });

      navigate("/tickets");

      console.log(response);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="new-ticket">
      <NavBar />
      <TopBar />
      {render ? (
        <form className="new-ticket-form" onSubmit={handleSubmit}>
          <SingleSelect
            label="Contact"
            options={contact}
            optionSelected={selectedContact}
            setOptionSelected={setSelectedContact}
          />

          <InputText title="subject" input={subject} setInput={setSubject} />

          <SingleSelect
            label="Type"
            options={type}
            optionSelected={selectedType}
            setOptionSelected={setSelectedType}
          />

          <SingleSelect
            label="Status"
            options={status}
            optionSelected={selectedStatus}
            setOptionSelected={setSelectedStatus}
          />

          <SingleSelect
            label="Priority"
            options={priority}
            optionSelected={selectedPriority}
            setOptionSelected={setSelectedPriority}
          />
          <SingleSelect
            label="Group"
            options={group}
            optionSelected={selectedGroup}
            setOptionSelected={setSelectedGroup}
          />
          <SingleSelect
            label="Agent"
            options={agent}
            optionSelected={selectedAgent}
            setOptionSelected={setSelectedAgent}
          />

          <div className="text-area-container">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="new-ticket-buttons">
            <div>
              <input
                type="checkbox"
                name="another"
                value={createAnother}
                onChange={(e) => setCreateAnother((prevValue) => !prevValue)}
              />
              <label htmlFor="another">Create another</label>
            </div>
            <div>
              <button>Cancel</button>
              <button className="create-button" type="submit">
                Create
              </button>
            </div>
          </div>
          {error ? (
            <span className="error error-new-ticket"> {error} </span>
          ) : null}
        </form>
      ) : null}
    </div>
  );
};

export default NewTicket;
