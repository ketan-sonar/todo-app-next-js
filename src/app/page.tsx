"use client";

import TodoList from "@/app/components/TodoList";
import TodoInput from "@/app/components/TodoInput";
import { Todo, TodoStatus } from "@/app/utils/Todo";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { TodosContext } from "./context/todos-context";

export default function Home() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

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

  return (
    <div className="HomePage w-screen h-screen flex justify-center items-center">
      <div className="container max-w-md">
        <h1 className="text-3xl">Todo List</h1>
        <hr />
        <TodosContext.Provider
          value={{ todos, addTodo, toggleTodo, deleteTodo }}
        >
          <TodoInput className="my-2" />
          <TodoList />
        </TodosContext.Provider>
      </div>
    </div>
  );
}
