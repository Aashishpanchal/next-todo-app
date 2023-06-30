"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 } from "uuid";

export type Todo = {
  id: string;
  todo: string;
  complete: boolean;
  createAt: Date;
};

export type TodoContext = {
  todo: Todo[];
  handleAddTodo: (task: string) => void;
  handleTodoDelete: (id: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
};

export const todoContext = createContext<TodoContext | null>(null);

export const TodoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [todo, setTodo] = useState<Todo[]>([]);

  const handleAddTodo = (task: string) => {
    setTodo((prev) => {
      const newTodo = [
        {
          id: v4(),
          todo: task,
          complete: false,
          createAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem("todo", JSON.stringify(newTodo));
      return newTodo;
    });
  };

  // toggle of task
  const toggleTodoAsCompleted = (id: string) =>
    setTodo((prev) => {
      const newTodo = prev.map((item) => {
        if (item.id === id) return { ...item, complete: !item.complete };
        return item;
      });
      localStorage.setItem("todo", JSON.stringify(newTodo));
      return newTodo;
    });

  // task delete of todo
  const handleTodoDelete = (id: string) =>
    setTodo((prev) => {
      const newTodo = prev.filter((item) => item.id !== id);
      localStorage.setItem("todo", JSON.stringify(newTodo));
      return newTodo;
    });

  useEffect(() => {
    const newTodo = localStorage.getItem("todo");
    if (newTodo) setTodo(JSON.parse(newTodo) || []);
  }, []);

  return (
    <todoContext.Provider
      value={{ todo, handleAddTodo, toggleTodoAsCompleted, handleTodoDelete }}
    >
      {children}
    </todoContext.Provider>
  );
};

export function useTodo() {
  const todoContextValue = useContext(todoContext);

  if (!todoContextValue) throw new Error("UseTodo used outside of provider");

  return todoContextValue;
}
