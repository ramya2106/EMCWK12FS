import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const getTodos = async () => {
    const response = await axios.get(API_URL);

    setTodos(response.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    const response = await axios.post(API_URL, {
      title: title
    });

    setTodos([...todos, response.data]);

    setTitle("");
  };

  const toggleTodo = async (todo) => {
    const response = await axios.put(
      `${API_URL}/${todo._id}`,
      {
        completed: !todo.completed
      }
    );

    setTodos(
      todos.map((item) =>
        item._id === todo._id
          ? response.data
          : item
      )
    );
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);

    setTodos(
      todos.filter((todo) => todo._id !== id)
    );
  };

  return (
    <div>
      <h1>Todo App</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
      />

      <button onClick={addTodo}>
        Add Todo
      </button>

      <hr />

      {todos.map((todo) => (
        <div key={todo._id}>
          <span
            onClick={() => toggleTodo(todo)}
            style={{
              textDecoration: todo.completed
                ? "line-through"
                : "none"
            }}
          >
            {todo.title}
          </span>

          <button
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;