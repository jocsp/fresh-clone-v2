import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import useFetchData from "../../hooks/useFetchData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAuthContext } from "../../hooks/useAuthContext";
import useRequest from "../../hooks/useRequest";

function ToDo() {
  const {
    data,
    error: errorFetching,
    loaded,
    reFetch,
  } = useFetchData("/api/todo/get-todos");

  const { dispatch } = useAuthContext();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(null);
  const { sendRequest, error, loading, setError } = useRequest();

  useEffect(() => {
    if (loaded) {
      reOrderTodos(data);
    }
  }, [data, loaded]);

  function reOrderTodos(todos) {
    const checkedTodos = [];
    const uncheckedTodos = [];

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

    try {
      if (todo.trim()) {
        const response = await sendRequest({
          method: "POST",
          url: "/api/todo/add-todo",
          data: { todo },
        });

        setTodos((prevTodos) => [response.data, ...prevTodos]);
        setTodo("");
      } else {
        setError("Todo is empty");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit}>
        <h3 className="todo-heading">To-do</h3>
        <div className="todo-input">
          <AddCircleIcon
            className="add-todo"
            onClick={handleSubmit}
            style={{ fontSize: "medium", alignSelf: "center", color: "green" }}
          />
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a to-do"
          />
        </div>
      </form>

      <div className="todos">
        {todos &&
          todos.map((todoElement) => (
            <TodoItem
              key={todoElement._id}
              todo={todoElement.todo}
              checkedProp={todoElement.checked}
              setTodos={setTodos}
              todo_id={todoElement._id}
              reFetch={reFetch}
            />
          ))}
      </div>

      {error || errorFetching ? (
        <div className="error">{error || errorFetching} </div>
      ) : null}
    </div>
  );
}

export default ToDo;
