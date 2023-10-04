export enum TodoStatus {
  COMPLETE = "complete",
  INCOMPLETE = "incomplete",
}

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
};
