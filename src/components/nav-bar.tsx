"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NavBar() {
  const searchParams = useSearchParams();
  const todoFilter = searchParams.get("todo");

  return (
    <nav className="w-full flex justify-between items-center border-b-2">
      <Link href="/" className={`link ${todoFilter === null ? "active" : ""}`}>
        All
      </Link>
      <Link
        href="/?todo=active"
        className={`link ${todoFilter === "active" ? "active" : ""}`}
      >
        Active
      </Link>
      <Link
        href="/?todo=completed"
        className={`link ${todoFilter === "completed" ? "active" : ""}`}
      >
        Completed
      </Link>
    </nav>
  );
}
