import Link from "next/link";
import Image from "next/image";
import trashIcon from "@/public/trash.svg";

type TodoFilterProps = {
  todosCounts: {
    totalCount: number;
    completeCount: number;
    incompleteCount: number;
  };
  handleDeleteCompleted?: () => void;
};

export default function TodoFilter({
  handleDeleteCompleted,
  todosCounts,
}: TodoFilterProps) {
  return (
    <div className="flex justify-between">
      <div className="space-x-2">
        <Link href={"/"}>
          <button className="rounded bg-indigo-500 text-white px-1">
            All ({todosCounts.totalCount})
          </button>
        </Link>
        <Link href={"/?complete=false"}>
          <button className="rounded bg-indigo-500 text-white px-1">
            Pending ({todosCounts.incompleteCount})
          </button>
        </Link>
        <Link href={"/?complete=true"}>
          <button className="rounded bg-indigo-500 text-white px-1">
            Completed ({todosCounts.completeCount})
          </button>
        </Link>
      </div>
      {handleDeleteCompleted && (
        <div onClick={handleDeleteCompleted}>
          <button className="hidden sm:block rounded bg-red-500 text-white px-1">
            Delete Completed
          </button>
          <button className="sm:hidden flex space-x-1 rounded bg-red-500 p-1 text-white items-center">
            <Image
              src={trashIcon}
              alt="Delete Completed"
              width={16}
              height={16}
            />
            <div>Completed</div>
          </button>
        </div>
      )}
    </div>
  );
}
