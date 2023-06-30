import TodoList from "@components/todo-list";
import AddTodo from "@components/add-todo";
import NavBar from "@components/nav-bar";
import { RiTodoLine } from "react-icons/ri";

export default function Home() {
  return (
    <main className="flex flex-col items-center mt-40 ">
      <div className="w-1/2">
        <h1 className="flex justify-center mb-5 items-center text-3xl">
          <RiTodoLine className="icons" />
          TODO NEXT
          <RiTodoLine className="icons" />
        </h1>
        <NavBar />
        <AddTodo />
        <TodoList />
      </div>
    </main>
  );
}
