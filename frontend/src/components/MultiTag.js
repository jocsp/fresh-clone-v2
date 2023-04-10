import React from 'react';
import { useState, useRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';

const MultiTag = ({ label, options, optionsSelected, setOptionsSelected }) => {
  const [queriedOptions, setQueriedOptions] = useState([...options]);
  const [display, setDisplay] = useState(false);

  const edit = useRef(null);

  function inputContainerClick(e) {
    if (e.target.className !== 'delete-button') {
      edit.current.focus();
      setDisplay(true);
    }
  }

  function selectoption(e) {
    edit.current.textContent = '';
    setQueriedOptions([...options]);
    setOptionsSelected((prevoptions) => {
      if (prevoptions.includes(e.target.textContent)) {
        return [...prevoptions];
      } else {
        return [...prevoptions, e.target.textContent];
      }
    });
  }

  function makeQuery(e) {
    setQueriedOptions((prevArray) => {
      const newArray = options.filter((element) => {
        const rx = new RegExp(e.target.textContent, 'i');
        const variable = element.name.search(rx) >= 0;

        return variable;
      });

      return newArray;
    });
  }

  function delteoption(e) {
    setOptionsSelected((prevoptions) => {
      return [...prevoptions.filter((option) => option !== e.target?.id)];
    });
  }
  return (
    <div className="select-container m-top-5">
      <label htmlFor={label}>{label}</label>
      <div
        className="input-container-multitag m-top-5"
        name={label}
        onClick={inputContainerClick}
      >
        <div className="selected-container">
          {optionsSelected.map((optionSelected) => {
            return (
              <div key={optionSelected} className="option-selected-container">
                <span key={optionSelected} className="option-selected">
                  {optionSelected}
                </span>
                <span
                  className="delete-button"
                  id={optionSelected}
                  onClick={delteoption}
                >
                  x
                </span>
              </div>
            );
          })}
        </div>

        <div
          ref={edit}
          className="editable"
          onBlur={() => setDisplay(false)}
          contentEditable="true"
          onInput={(e) => makeQuery(e)}
        ></div>
      </div>

      {display ? (
        <div className="options">
          {queriedOptions.map((option) => {
            let selected = Boolean(optionsSelected.includes(option.name));

            return (
              <div
                key={option._id}
                className={selected ? 'option selected' : 'option'}
                onMouseDown={selectoption}
              >
                {option.name}
                <CheckIcon
                  className="check-icon"
                  style={selected ? { display: 'block' } : { display: 'none' }}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MultiTag;
