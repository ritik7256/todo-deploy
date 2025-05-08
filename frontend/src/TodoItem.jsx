import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow px-4 py-2 rounded">
      <span
        onClick={() => onToggle(todo._id)}
        className={
          todo.completed
            ? "line-through text-gray-500 cursor-pointer"
            : "cursor-pointer"
        }
      >
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo._id)} className="text-red-500">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
