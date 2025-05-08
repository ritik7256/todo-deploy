import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(
      "https://todo-deploy-p5bm.onrender.com/api/todos"
    );
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!input) return;
    const res = await axios.post(
      "https://todo-deploy-p5bm.onrender.com/api/todos",
      {
        title: input,
      }
    );
    setTodos([...todos, res.data]);
    setInput("");
  };

  const toggleComplete = async (id) => {
    const res = await axios.put(
      `https://todo-deploy-p5bm.onrender.com/todos/${id}`
    );
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://todo-deploy-p5bm.onrender.com/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
      <div className="flex justify-center gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded px-3 py-1"
          placeholder="Add a new todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>
      <div className="max-w-md mx-auto space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
