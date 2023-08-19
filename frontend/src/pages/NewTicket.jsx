import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import SingleSelect from '../components/SingleSelect';
import InputText from '../components/InputText';
import { useFiltersContext } from '../hooks/useFiltersContext';
import { useAuthContext } from '../hooks/useAuthContext';
import useRequest from '../hooks/useRequest';

function NewTicket() {
  const {
    state: { filters },
    loaded,
  } = useFiltersContext();

  const { agent: currentAgent, dispatch, addTicketAssigned } = useAuthContext();

  const navigate = useNavigate();

  // variable to only render the single selects after the states are set.
  const [render, setRender] = useState(false);
  const [error, setError] = useState(null);

  const [contact, setContactOptions] = useState([]);
  const contactState = useState({ name: '' });

  const [subject, setSubject] = useState('');

  const [typeOptions, setTypeOptions] = useState([]);
  const typeState = useState({ name: '' });

  const [statusOptions, setStatusOptions] = useState([]);
  const statusState = useState({ name: '' });

  const [priorityOptions, setPriorityOptions] = useState([]);
  const priorityState = useState({ name: '' });

  const [groupOptions, setGroupOptions] = useState([]);
  const groupState = useState({ name: '' });

  const [agentOptions, setAgentOptions] = useState([]);
  const agentState = useState({ name: '' });

  const [description, setDescription] = useState('');
  const [createAnother, setCreateAnother] = useState(false);

  const { sendRequest } = useRequest();

  useEffect(() => {
    if (loaded) {
      setContactOptions([...filters.contacts]);
      setTypeOptions([...filters.types]);
      setStatusOptions([...filters.status]);
      setPriorityOptions([...filters.priorities]);
      setGroupOptions([...filters.groups]);
      setAgentOptions([...filters.agents]);
      setRender(true);
    }
  }, [loaded, filters]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    const data = {
      contact: contactState[0],
      subject,
      type: typeState[0],
      status: statusState[0],
      priority: priorityState[0],
      group: groupState[0],
      agent: agentState[0],
      description,
      date: new Date(),
      createdBy: { _id: currentAgent._id, name: currentAgent.name },
    };

    try {
      const response = await sendRequest({
        url: '/api/ticket/new-ticket',
        method: 'POST',
        data,
      });

      const { _id, agent, status } = response.data;

      addTicketAssigned(_id, agent, status);

      navigate('/tickets');
    } catch (error) {
      console.log(error);
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
            state={contactState}
          />

          <InputText title="subject" input={subject} setInput={setSubject} />

          <SingleSelect label="Type" options={typeOptions} state={typeState} />

          <SingleSelect
            label="Status"
            options={statusOptions}
            state={statusState}
          />

          <SingleSelect
            label="Priority"
            options={priorityOptions}
            state={priorityState}
          />
          <SingleSelect
            label="Group"
            options={groupOptions}
            state={groupState}
          />
          <SingleSelect
            label="Agent"
            options={agentOptions}
            state={agentState}
          />

          <div className="text-area-container">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
}

export default NewTicket;
