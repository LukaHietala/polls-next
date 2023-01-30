import Link from "next/link";
import { useState } from "react";

export default function Vote() {
  const [id, setId] = useState("");
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-2 text-neutral-900 lg:px-0">
      <div className="flex w-full flex-col rounded-lg border border-neutral-300 bg-neutral-100 p-8">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Vote on a Poll
        </h1>
        <p className="mt-2 text-neutral-700">
          Enter the ID of the poll you want to vote on
        </p>
        <div className="mt-6">
          <label className="block text-sm font-medium text-neutral-700">
            Poll ID
          </label>
          <div className="mt-2 inline-flex w-full gap-2">
            <input
              type="text"
              name="option"
              id="option"
              onChange={(e) => setId(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white py-1 px-2 focus:border-2 focus:border-neutral-900 focus:outline-none focus:ring-0"
            />
            <Link
              className="rounded-md bg-gray-900 py-1 px-2 text-white hover:bg-gray-800"
              href={`polls/${id}`}
            >
              Enter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
