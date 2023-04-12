import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthContext } from '../../hooks/useAuthContext';
import useRequest from '../../hooks/useRequest';

function TodoItem({ checkedProp, todo_id, todo, setTodos, setReFetch }) {
  const [checked, setChecked] = useState(checkedProp);

  const { sendRequest } = useRequest();

  async function changeCheck() {
    setChecked((prevChecked) => !prevChecked);

    const response = await sendRequest({
      method: 'POST',
      url: '/api/todo/change-todo',
      data: { todo_id, checked: !checked },
    });

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo_id !== todo._id) {
          return todo;
        }
        return response.data;
      })
    );

    setReFetch((preValue) => !preValue);
  }

  async function deleteTodo() {
    await sendRequest({
      method: 'DELETE',
      url: '/api/todo/delete-todo',
      data: { todo_id },
    });

    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo_id !== todo._id);
    });
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
