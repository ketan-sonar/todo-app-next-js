import { HTMLAttributes } from "react";
import { TodoItem } from "@/app/components/TodoItem";
import { useTodosContext } from "@/app/context/todos-context";

type TodoListProps = {} & HTMLAttributes<HTMLDivElement>;

export default function TodoList({ className }: TodoListProps) {
  const { todos } = useTodosContext();

  return (
    <div className={className}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
