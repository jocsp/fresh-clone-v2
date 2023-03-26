import axios from "../../api/axios";
import React, { useState } from "react";

const TodoItem = ({
  checkedProp,
  todo_id,
  todo,
  setTodos,
  setError,
  setReFetch,
}) => {
  const [checked, setChecked] = useState(checkedProp);

  function changeCheck() {
    setChecked((prevChecked) => !prevChecked);

    axios({
      method: "POST",
      url: "/api/todo/change-todo",
      data: { todo_id, checked: !checked },
    })
      .then((response) => {
        setTodos((prevTodos) => {
          return prevTodos.map((todo) => {
            if (todo_id !== todo._id) {
              return todo;
            } else {
              return response.data;
            }
          });
        });

        setReFetch((preValue) => !preValue);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }

  return (
    <div className="todo">
      <input
        type="checkbox"
        name="checkbox"
        style={{ margin: "0 5px 0 0" }}
        className="check-todo"
        checked={checked}
        onChange={changeCheck}
        value={todo_id}
      />
      <p>{todo}</p>
    </div>
  );
};

export default TodoItem;
