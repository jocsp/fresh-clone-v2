import { useEffect, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

function SingleSelect({ label, options, state }) {
  const [optionSelected, setOptionSelected] = state;
  const [queriedOptions, setQueriedOptions] = useState([...options]);
  const edit = useRef(null);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    edit.current.value = optionSelected.name;
  }, [optionSelected]);

  function selectOption(e) {
    const { id, textContent } = e.target;

    setOptionSelected({ name: textContent, _id: id });
    edit.current.value = e.target.textContent;
  }

  function handleFocus(e) {
    setDisplay(true);
    e.target.select();
  }

  function handleBlur(e) {
    setDisplay(false);
    setQueriedOptions([...options]);

    e.target.value =
      optionSelected.name === undefined ? '' : optionSelected.name;
  }

  function makeQuery(e) {
    setQueriedOptions((prevArray) => {
      const newArray = options.filter((element) => {
        const rx = new RegExp(e.target.value, 'i');
        const variable = element.name.search(rx) >= 0;

        return variable;
      });

      return newArray;
    });
  }

  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input
        className="input"
        ref={edit}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={makeQuery}
        name={label}
      />

      {display ? (
        <div className="options options-single">
          {queriedOptions.map((option) => {
            const selected = Boolean(optionSelected._id === option._id);

            return (
              <div
                className={selected ? 'option selected' : 'option'}
                id={option._id}
                onMouseDown={selectOption}
                key={option._id}
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
}

export default SingleSelect;
