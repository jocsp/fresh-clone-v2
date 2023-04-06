import axios from 'axios';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoItem({
  checkedProp,
  todo_id,
  todo,
  setTodos,
  setError,
  setReFetch,
}) {
  const [checked, setChecked] = useState(checkedProp);

  function changeCheck() {
    setChecked((prevChecked) => !prevChecked);

    axios({
      method: 'POST',
      url: '/api/todo/change-todo',
      data: { todo_id, checked: !checked },
    })
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            if (todo_id !== todo._id) {
              return todo;
            }
            return response.data;
          })
        );

        setReFetch((preValue) => !preValue);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }

  async function deleteTodo() {
    setError(null);
    try {
      const response = await axios({
        method: 'DELETE',
        url: '/api/todo/delete-todo',
        data: { todo_id },
      });

      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo_id !== todo._id);
      });
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  return (
    <div className="todo">
      <div style={{ display: 'flex' }}>
        <input
          type="checkbox"
          name="checkbox"
          style={{ margin: '0 5px 0 0' }}
          className="check-todo"
          checked={checked}
          onChange={changeCheck}
          value={todo_id}
        />
        <p>{todo}</p>
      </div>

      <DeleteIcon
        className="delete-todo"
        data-testid="delete-todo"
        onClick={deleteTodo}
      />
    </div>
  );
}

export default TodoItem;
