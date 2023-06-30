"use client";
import { useTodo } from "@/store/todo";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function TodoList() {
  const { todo, toggleTodoAsCompleted, handleTodoDelete } = useTodo();
  const searchParams = useSearchParams();

  const filterTodo = useMemo(() => {
    const query = searchParams.get("todo");
    if (query === "active") return todo.filter((todo) => !todo.complete);
    else if (query === "completed") return todo.filter((todo) => todo.complete);
    return todo;
  }, [todo, searchParams.get("todo")]);

  return (
    <ul className="mt-5">
      {filterTodo.map((item, index) => (
        <li
          key={index}
          className="grid grid-cols-3 gap-4 items-center w-full py-2 border-b border-gray-200 hover:bg-pink-50"
        >
          <input
            type="checkbox"
            id={`todo-${item.id}`}
            checked={item.complete}
            onChange={() => toggleTodoAsCompleted(item.id)}
            className="peer"
          />
          <label
            htmlFor={`todo-${item.id}`}
            className="peer-checked:text-pink-700 peer-checked:line-through justify-center"
          >
            {item.todo}
          </label>
          {item.complete && (
            <button
              type="button"
              onClick={() => handleTodoDelete(item.id)}
              className="button-pink w-fit "
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
