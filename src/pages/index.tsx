import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { Poll } from "@prisma/client";
import { useState } from "react";

import Link from "next/link";
import { api } from "../utils/api";

// TODO: REACT QUERY TO GET POLLS!

const Home: NextPage = () => {
  const getPolls = api.poll.getAll.useQuery();
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    if (getPolls.data) {
      setPolls(getPolls.data);
    }
  }, [getPolls.data]);

  if (getPolls.isLoading) {
    return <div>Loading...</div>;
  } else if (getPolls.isError) {
    return <div>Error: {getPolls.error.message}</div>;
  }
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-col">
          <h1 className="text-center text-4xl font-bold">Polling app</h1>
          <p className="mt-4 text-center text-neutral-700">
            This is a polling app. You can create polls and vote on them.
          </p>
        </div>
        <Link href="/create" className="w-full">
          <button className="mt-8 flex w-full flex-col items-center justify-center rounded-lg border border-neutral-300 bg-white p-6 text-neutral-800">
            Create a New Poll
          </button>
        </Link>
        <section className="w-full">
          {polls.map((poll) => (
            <Poll key={poll.id} poll={poll} />
          ))}
        </section>
      </main>
    </>
  );
};

const Poll = ({ poll }: { poll: Poll }) => {
  return (
    <div className="w-full rounded-lg border border-neutral-300 bg-white p-6">
      <h1 className="text-xl font-bold text-neutral-900">{poll.title}</h1>
      <p className="mt-4 text-neutral-700">{poll.description}</p>
    </div>
  );
};

export default Home;
