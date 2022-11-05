import { Inter } from "@next/font/google";
import Link from "next/link";

const App = () => {
  return (
    <>
      <main className="bg-[#e8ecfa]">
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-center">A Better Pomodoro</h1>
          <Link href="/settings">
            <button className="font-semibold text-lg mt-4 py-2 px-4 bg-[#c7d7fd] rounded-lg hover:bg-opacity-75">
              Start Here
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default App;
