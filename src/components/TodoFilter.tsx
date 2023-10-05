import Link from "next/link";
import Image from "next/image";
import trashIcon from "@/public/trash.svg";

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
