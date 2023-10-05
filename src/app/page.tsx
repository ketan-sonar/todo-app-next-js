"use client";

import TodoList from "@/components/TodoList";
import TodoInput from "@/components/TodoInput";
import { Todo, TodoStatus } from "@/utils/Todo";
import useLocalStorage from "@/hooks/useLocalStorage";
import { TodosContext } from "@/context/todos-context";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TodoFilter from "@/components/TodoFilter";

export default function Home() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [firstRender, setFirstRender] = useState(true);
  const params = useSearchParams();

  useEffect(() => {
    setFirstRender(false);
  }, []);

  const addTodo = (title: string) => {
    if (!title) return;

    const newTodo: Todo = {
      id: todos.length,
      title: title,
      status: TodoStatus.INCOMPLETE,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status:
              todo.status === TodoStatus.COMPLETE
                ? TodoStatus.INCOMPLETE
                : TodoStatus.COMPLETE,
          };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const deleteCompleted = () => {
    setTodos((prev) =>
      prev.filter((todo) => todo.status !== TodoStatus.COMPLETE)
    );
  };

  const getActiveTodos = () => {
    if (params.get("complete") === "false") {
      return todos.filter((todo) => todo.status === TodoStatus.INCOMPLETE);
    } else if (params.get("complete") === "true") {
      return todos.filter((todo) => todo.status === TodoStatus.COMPLETE);
    }
    return todos;
  };

  if (firstRender) return <></>;

  return (
    <div className="HomePage w-screen h-screen flex justify-center items-center">
      <div className="container max-w-xs sm:max-w-md h-2/3 mx-4">
        <h1 className="text-3xl text-center sm:text-left">Todo List</h1>
        <hr />
        <TodosContext.Provider
          value={{ todos: getActiveTodos(), addTodo, toggleTodo, deleteTodo }}
        >
          <TodoInput className="my-2" />
          <TodoFilter handleDeleteCompleted={deleteCompleted} />
          <TodoList />
        </TodosContext.Provider>
      </div>
    </div>
  );
}
