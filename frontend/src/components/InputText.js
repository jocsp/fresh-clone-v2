import React from 'react';

function capitalize(word) {
  word = word.charAt(0).toUpperCase() + word.slice(1);
  return word;
}

function InputText({
  title, placeholder, input, setInput,
}) {
  return (
    <div className="input-container">
      <label htmlFor={title}>{capitalize(title)}</label>
      <input
        className="input"
        type="text"
        name={title}
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default InputText;
