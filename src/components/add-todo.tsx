"use client";
import { FormEvent, useState } from "react";
import { useTodo } from "@store/todo";

export default function AddTodo() {
  const [todo, setTodo] = useState<string>("");

  const { handleAddTodo } = useTodo();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={onSubmit} className="space-x-3">
      <input
        type="text"
        name="todo"
        placeholder="Write your todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="border-2 border-gray-500 w-40 my-4 pl-2 p-1 rounded-lg outline-none focus:border-green-500 transition-colors"
      />
      <button type="submit" className="button-secondary">
        Add
      </button>
    </form>
  );
}
