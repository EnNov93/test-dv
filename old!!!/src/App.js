// import logo from "./logo.svg";
import React, { useEffect } from "react";
import Context from "./context";
import "./App.css";
import ToDoList from "./components/ToDoList";
import Loader from "./components/loader";

const AddTodo = React.lazy(() => import("./components/AddTodo"));

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((json) =>
        setTimeout(() => {
          setTodos(json);
          setLoading(false);
        }, 2000)
      );
  }, []);

  function toogleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.complited = !todo.complited;
        }
        return todo;
      })
    );
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          id: todos.length + 1,
          complited: false,
          title,
        },
      ])
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React totorial</h1>

        <React.Suspense fallback={<p>loading</p>}>
          <AddTodo onCreate={addTodo}></AddTodo>
        </React.Suspense>
        {loading && <Loader></Loader>}

        {todos.length ? (
          <ToDoList todos={todos} onToggle={toogleTodo} />
        ) : loading ? null : (
          <p>No todos</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
