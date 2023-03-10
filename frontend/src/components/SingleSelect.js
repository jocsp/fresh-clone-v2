import { useEffect, useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const SingleSelect = ({
  label,
  options,
  optionSelected,
  setOptionSelected,
}) => {
  const [queriedOptions, setQueriedOptions] = useState([...options]);
  const edit = useRef(null);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    edit.current.value = optionSelected;
  }, [optionSelected]);

  function selectOption(e) {
    setOptionSelected(e.target.textContent);
    edit.current.value = e.target.textContent;
  }

  function handleFocus(e) {
    setDisplay(true);
    e.target.select();
  }

  function handleBlur(e) {
    setDisplay(false);
    setQueriedOptions([...options]);
    e.target.value = optionSelected;
  }

  function makeQuery(e) {
    setQueriedOptions((prevArray) => {
      const newArray = options.filter((element) => {
        const rx = new RegExp(e.target.value, "i");
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
            let selected = Boolean(optionSelected.includes(option.name));
            return (
              <div
                className={selected ? "option selected" : "option"}
                onMouseDown={selectOption}
                key={option._id}
              >
                {option.name}
                <CheckIcon
                  className="check-icon"
                  style={selected ? { display: "block" } : { display: "none" }}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SingleSelect;
