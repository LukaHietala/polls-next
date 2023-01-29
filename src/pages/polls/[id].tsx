import { Option } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function PollPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError, error } = api.poll.getOne.useQuery({
    id: id as string,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error: {error.message}</div>;
  } else if (!data) {
    return <div>Not found (Wrong id)</div>;
  }
  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-4 text-neutral-900">
        <div className="flex w-full flex-col rounded-lg border border-neutral-300 bg-neutral-100 p-8">
          <div className="flex flex-row justify-between gap-4">
            <div className="flex w-full flex-col">
              <h1 className="text-2xl font-bold text-neutral-800">
                {data?.title}
              </h1>
              <p className="mt-3 text-sm font-medium text-neutral-600">
                {data?.description}
              </p>
            </div>
            <div className="group relative flex cursor-pointer flex-col items-center text-xs">
              <Image
                src={data?.creator.image as string}
                width={48}
                height={48}
                unoptimized
                className="rounded-full"
                alt={data?.creator.name as string}
              />
              <div className="absolute top-12 w-max scale-0 rounded-lg bg-white p-2 shadow-lg transition-all duration-200 ease-in-out group-hover:scale-100">
                <p className="text-sm font-medium text-neutral-800">
                  By {data?.creator.name}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <h2 className="font-semibold text-neutral-800">Votes</h2>
              <p className="text-xs font-medium text-neutral-600">
                You can vote for one of the following options
              </p>
            </div>
            <div className="rounded-md border border-emerald-300 bg-emerald-100 p-2 text-sm font-medium text-neutral-700">
              {data?.votes.length} votes
            </div>
          </div>
          <section className="mt-4 flex w-full select-none flex-col gap-2">
            {data?.options.map((option) => (
              <Option key={option.id} option={option} />
            ))}
          </section>
          <section className="mt-10 flex flex-row items-baseline justify-between">
            <Link className="text-sm font-medium text-neutral-600" href={"/"}>
              Go back
            </Link>
            <span className="inline-flex items-center gap-1 text-sm text-neutral-600">
              ID:{" "}
              <code
                className="cursor-pointer select-none rounded-md bg-neutral-200 p-1 text-xs text-neutral-700 hover:bg-neutral-300/80"
                onClick={() => {
                  void navigator.clipboard.writeText(data.id);
                }}
              >
                {data.id}
              </code>
            </span>
          </section>
        </div>
      </main>
    </>
  );
}

const Option = ({ option }: { option: Option }) => {
  return (
    <div className="flex w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-neutral-300 bg-white py-2 px-3 transition-all duration-150 ease-in-out hover:border-neutral-400 hover:bg-neutral-100">
      <h2 className="font-medium text-neutral-700">{option.title}</h2>
      <span className="text-sm text-neutral-600">3 votes</span>
    </div>
  );
};
