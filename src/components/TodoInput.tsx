import { HTMLAttributes, RefObject, useEffect, useRef, useState } from "react";
import { useTodosContext } from "@/context/todos-context";

type TodoInputProps = {} & HTMLAttributes<HTMLDivElement>;

export default function TodoInput({ className }: TodoInputProps) {
  const { addTodo } = useTodosContext();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAddTodo = () => {
    addTodo(newTodoTitle);
    setNewTodoTitle("");
  };

  return (
    <div
      className={`space-y-2 sm:space-y-0 sm:space-x-2 ${className} flex flex-col sm:flex-row`}
    >
      <input
        className="rounded border px-2 py-1 text-lg sm:grow dark:bg-neutral-900 dark:outline-none dark:border-stone-400"
        type="text"
        value={newTodoTitle}
        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        ref={inputRef}
      />
      <button
        className="rounded px-2 py-1 text-lg bg-green-600 text-white"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
}
