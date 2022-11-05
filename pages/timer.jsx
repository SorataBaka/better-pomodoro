const Timer = () => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="text-9xl font-bold text-center">00:00</h1>
        <h2 className="text-3xl font-bold mt-4">
          <span>TASK</span> / <span className="text-gray-500">REST</span>
        </h2>
        <button className="mt-4 font-semibold text-2xl py-2 px-12 rounded-xl bg-slate-300 hover:bg-opacity-75">
          STOP
        </button>
        <h3 className="mt-24 text-2xl font-semibold">
          NEXT UP: AOSAOWOAWKOAKWO
        </h3>
      </div>
    </>
  );
};

export default Timer;
