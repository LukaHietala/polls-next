import Link from "next/link";

export default function CreatePoll() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col rounded-lg border border-neutral-300 bg-neutral-100 p-8">
        <div className="flex flex-row items-center justify-between gap-20">
          <Link href="/">
            <svg
              className="h-6 w-6 opacity-70 hover:opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-neutral-900">
            Create a New Poll
          </h1>
          <div></div>
        </div>
        <div className="mt-8">
          <label className="block text-sm font-medium text-neutral-700">
            Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full rounded-md border border-gray-300 bg-white py-1 px-2"
            />
          </div>
          <label className="mt-4 block text-sm font-medium text-neutral-700">
            Description
          </label>
          <div className="mt-1">
            <textarea
              name="description"
              id="description"
              className="block w-full rounded-md border border-gray-300 bg-white py-1 px-2"
              cols={30}
            />
          </div>
        </div>
        <div className="mt-8 flex flex-row gap-2">
          <button className="rounded-md bg-gray-900 py-2 px-3 text-sm font-medium text-white">
            Add option
          </button>
          <button className="py-2 px-3 text-sm">Remove all options</button>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-neutral-700">
            Options
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="option"
              id="option"
              className="block w-full rounded-md border border-gray-300 bg-white py-1 px-2"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="option"
              id="option"
              className="block w-full rounded-md border border-gray-300 bg-white py-1 px-2"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="option"
              id="option"
              className="block w-full rounded-md border border-gray-300 bg-white py-1 px-2"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="option"
              id="option"
              className="block w-full rounded-md border border-gray-300 bg-white py-1 px-2"
            />
          </div>
        </div>
        <div className="mt-8">
          <button className="rounded-md bg-gray-900 py-2 px-3 text-sm font-medium text-white">
            Create Poll
          </button>
        </div>
      </div>
    </main>
  );
}
