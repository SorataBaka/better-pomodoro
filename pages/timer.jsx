import { useRouter } from "next/router";
import React from "react";

const Timer = () => {
  const router = useRouter();
  const [isTask, setIsTask] = React.useState(true);
  const [isRest, setIsRest] = React.useState(false);

  const handleStop = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <main className="bg-[#e8ecfa]">
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <h1 className="text-9xl font-bold text-center tracking-wide">
            00:00
          </h1>
          <h2 className="text-3xl font-bold mt-4 tracking-wide">
            <span className={isTask ? "text-black" : "text-gray-400"}>
              TASK
            </span>{" "}
            /{" "}
            <span className={isRest ? "text-black" : "text-gray-400"}>
              REST
            </span>
          </h2>
          <div className="flex flex-row gap-6">
            <button
              className="mt-4 font-semibold text-2xl py-2 px-12 rounded-xl bg-[#fdc7c7] hover:bg-opacity-75"
              onClick={handleStop}
            >
              STOP
            </button>
            <button
              className="mt-4 font-semibold text-2xl py-2 px-12 rounded-xl bg-[#c7d7fd] hover:bg-opacity-75"
              onClick={() => router.back()}
            >
              BACK
            </button>
          </div>
          <h3 className="mt-24 text-2xl font-semibold">
            NEXT UP: AOSAOWOAWKOAKWO
          </h3>
        </div>
      </main>
    </>
  );
};

export default Timer;
