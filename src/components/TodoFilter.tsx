import Link from "next/link";

type TodoFilterProps = {
  handleDeleteCompleted?: () => void;
};

export default function TodoFilter({ handleDeleteCompleted }: TodoFilterProps) {
  return (
    <div className="flex justify-between underline">
      <div className="space-x-2">
        <Link href={"/"}>All</Link>
        <Link href={"/?complete=false"}>Pending</Link>
        <Link href={"/?complete=true"}>Completed</Link>
      </div>
      {handleDeleteCompleted && (
        <div onClick={handleDeleteCompleted}>Delete Completed</div>
      )}
    </div>
  );
}
