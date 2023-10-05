import Link from "next/link";

type TodoFilterProps = {
  handleDeleteCompleted?: () => void;
};

export default function TodoFilter({ handleDeleteCompleted }: TodoFilterProps) {
  return (
    <div className="flex justify-between">
      <div className="space-x-2 underline">
        <Link href={"/"}>All</Link>
        <Link href={"/?complete=false"}>Pending</Link>
        <Link href={"/?complete=true"}>Completed</Link>
      </div>
      {handleDeleteCompleted && (
        <div onClick={handleDeleteCompleted}>
          <button className="rounded bg-red-500 text-white px-1">
            Delete Completed
          </button>
        </div>
      )}
    </div>
  );
}
