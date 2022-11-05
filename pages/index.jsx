import { Inter } from "@next/font/google";

const App = () => {
	return (
		<>
			<div className="h-screen w-screen flex flex-col justify-center items-center">
				<h1 className="text-6xl font-bold text-center">A Better Pomodoro</h1>
				<button className="font-semibold text-lg mt-4 py-2 px-4 bg-slate-300 rounded hover:bg-opacity-75">
					Start Here
				</button>
			</div>
		</>
	);
};

export default App;
