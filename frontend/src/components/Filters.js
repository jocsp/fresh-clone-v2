import React, { useEffect, useState, useContext } from 'react';
import { useFiltersContext } from '../hooks/useFiltersContext';
import MultiTag from './MultiTag';
import axios from 'axios';

const Filters = () => {
  const { state: filters, loaded, dispatch } = useFiltersContext();

  const [render, setRender] = useState(false);

  const [contacts, setContact] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const [types, setType] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [statuses, setStatus] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const [priorities, setPriority] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  const [groups, setGroup] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const [agents, setAgent] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);

  useEffect(() => {
    if (loaded) {
      setContact([...filters.filters.contacts]);
      setType([...filters.filters.types]);
      setStatus([...filters.filters.status]);
      setPriority([...filters.filters.priorities]);
      setGroup([...filters.filters.groups]);
      setAgent([...filters.filters.agents]);

      if (filters?.selected) {
        setSelectedAgents([...filters.selected.agents]);
        setSelectedGroups([...filters.selected.group]);
        setSelectedPriorities([...filters.selected.priority]);
        setSelectedStatuses([...filters.selected.status]);
        setSelectedTypes([...filters.selected.type]);
        setSelectedContacts([...filters.selected.contacts]);
      }

      setRender(true);
    }
  }, [loaded, filters]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      agents: selectedAgents,
      group: selectedGroups,
      status: selectedStatuses,
      priority: selectedPriorities,
      type: selectedTypes,
      contacts: selectedContacts,
    };

    dispatch({
      type: 'UPDATE-SELECTED',
      payload: data,
    });

    localStorage.setItem('filters', JSON.stringify(data));
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <p className="bold">Filters</p>
      {render ? (
        <div>
          <MultiTag
            label="Agents"
            options={agents}
            optionsSelected={selectedAgents}
            setOptionsSelected={setSelectedAgents}
          />

          <MultiTag
            label="Group"
            options={groups}
            optionsSelected={selectedGroups}
            setOptionsSelected={setSelectedGroups}
          />
          <MultiTag
            label="Status"
            options={statuses}
            optionsSelected={selectedStatuses}
            setOptionsSelected={setSelectedStatuses}
          />
          <MultiTag
            label="Priority"
            options={priorities}
            optionsSelected={selectedPriorities}
            setOptionsSelected={setSelectedPriorities}
          />
          <MultiTag
            label="Type"
            options={types}
            optionsSelected={selectedTypes}
            setOptionsSelected={setSelectedTypes}
          />

          <MultiTag
            label="Contacts"
            options={contacts}
            optionsSelected={selectedContacts}
            setOptionsSelected={setSelectedContacts}
          />

          <input
            type="submit"
            value="Apply"
            className="submit-filters m-top-20"
          />
        </div>
      ) : (
        <div className="loading-component"></div>
      )}
    </form>
  );
};

export default Filters;
