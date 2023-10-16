"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import TodoFilter from "@/components/TodoFilter";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { TodosContext } from "@/context/todos-context";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Todo, TodoStatus } from "@/utils/Todo";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const getTodosCounts = () => {
    let completeCount = 0;
    todos.forEach(
      (todo) => todo.status === TodoStatus.COMPLETE && completeCount++
    );

    return {
      totalCount: todos.length,
      completeCount,
      incompleteCount: todos.length - completeCount,
    };
  };

  if (firstRender) return <></>;

  return (
    <div className="HomePage w-screen h-screen flex justify-center items-center dark:bg-[#02040A] dark:text-stone-100">
      <div className="container max-w-xs sm:max-w-lg h-2/3 mx-4">
        <div className="header flex justify-between">
          <h1 className="text-3xl text-center sm:text-left">Todo List</h1>
          <ThemeSwitcher />
        </div>
        <hr className="border dark:border-stone-100" />
        <TodosContext.Provider
          value={{
            todos: getActiveTodos(),
            addTodo,
            toggleTodo,
            deleteTodo,
            getTodosCounts,
          }}
        >
          <TodoInput className="my-2" />
          <TodoFilter handleDeleteCompleted={deleteCompleted} />
          <TodoList />
        </TodosContext.Provider>
      </div>
    </div>
  );
}
