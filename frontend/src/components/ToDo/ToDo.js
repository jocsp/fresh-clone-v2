import axios from "../../api/axios.js";
import React, { useEffect } from "react";
import { useState } from "react";
import TodoItem from "./TodoItem";
import useFetchData from "../../hooks/useFetchData";

const ToDo = () => {
  const {
    data,
    error: errorFetching,
    loaded,
    setReFetch,
  } = useFetchData("/api/todo/get-todos");

  const [error, setError] = useState(null);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    if (loaded) {
      reOrderTodos(data);
    }
  }, [data, loaded]);

  function reOrderTodos(todos) {
    let checkedTodos = [];
    let uncheckedTodos = [];

    todos.slice().forEach((element) => {
      if (element.checked === false) {
        uncheckedTodos.splice(0, 0, element);
      } else if (element.checked === true) {
        checkedTodos.splice(0, 0, element);
      }
    });

    setTodos(uncheckedTodos.concat(checkedTodos));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError(null);

    try {
      const response = await axios({
        method: "POST",
        url: "/api/todo/add-todo",
        data: { todo },
      });

      // dispatch({ type: "ADD-TODO", payload: response.data });

      setTodos((prevTodos) => [response.data, ...prevTodos]);

      setTodo("");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  }

  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Type in here..."
        />
      </form>

      <div className="todos">
        {todos &&
          todos.map((todoElement) => {
            return (
              <TodoItem
                key={todoElement._id}
                todo={todoElement.todo}
                checkedProp={todoElement.checked}
                setTodos={setTodos}
                setError={setError}
                todo_id={todoElement._id}
                setReFetch={setReFetch}
              />
            );
          })}
      </div>

      {error || errorFetching ? (
        <div className="error">{error || errorFetching} </div>
      ) : null}
    </div>
  );
};

export default ToDo;
