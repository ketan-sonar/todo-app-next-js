import Link from "next/link";

export default function TodoFilter() {
  return (
    <div className="underline space-x-2">
      <Link href={"/"}>All</Link>
      <Link href={"/?complete=false"}>Pending</Link>
      <Link href={"/?complete=true"}>Completed</Link>
    </div>
  );
}
