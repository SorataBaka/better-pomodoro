import Link from "next/link";

const Finish = () => {
  return (
    <>
      <main className="bg-[#e8ecfa]">
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <h1 className="text-6xl font-black italic text-[#93a8f5]">
            You&apos;re done.
          </h1>
          <Link href="/">
            <button className="font-semibold text-lg mt-4 py-2 px-4 bg-[#c7d7fd] rounded-lg hover:bg-opacity-75">
              Back Home
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Finish;
