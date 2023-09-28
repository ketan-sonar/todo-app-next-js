import { Todo, TodoStatus } from "@/app/utils/Todo";
import { useTodosContext } from "@/app/context/todos-context";

type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodosContext();

  return (
    <div className="flex m-2 space-x-2 items-center">
      <input
        className="w-5 h-5 rounded-full self-start mt-1"
        type="checkbox"
        checked={todo.status === TodoStatus.COMPLETE}
        onClick={() => toggleTodo(todo.id)}
      />
      <h3
        className={`text-xl ${
          todo.status === TodoStatus.COMPLETE && "line-through"
        }`}
      >
        {todo.title}
      </h3>
      <button
        className="rounded bg-red-500 text-white px-1 py-0 text-sm"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}
