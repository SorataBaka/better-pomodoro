import { Inter } from "@next/font/google";
import Link from "next/link";

const App = () => {
	return (
		<>
			<main className="bg-[#e8ecfa] overflow-x-hidden">
				<div className="h-screen w-screen flex flex-col justify-center items-center">
					<h1 className="text-6xl font-bold text-center">
						A <i>BetterPomodoro</i>
					</h1>
					<Link href="/settings">
						<button className="font-semibold text-lg mt-4 py-2 px-4 bg-[#c7d7fd] rounded-lg hover:bg-opacity-75">
							Start Here
						</button>
					</Link>
				</div>
				<div className="h-screen w-screen flex flex-col justify-center items-center">
					<h1 className="text-4xl font-bold text-center">
						What exactly is Pomodoro?
					</h1>
					<p className="w-3/4 my-5 text-justify indent-20 text-xl">
						Pomodoro is a self study technique first created by Italian
						entrepreneur Francesco Cirillo. Pomodoro in on itself means{" "}
						<i>Tomato</i> in Italian. Pomodoro refers to the tomato shaped
						kitchen timer that it&apos;s creator, Cirillo used in his technique.
						Pomodoro refers to a task management technique where a stretch of
						time allocated for focus work and resting is taken alternately to
						avoid burn-out that lead to less efficient progress.
					</p>
					<p className="w-3/4 my-3 text-justify text-xl">
						Some studies have shown that the Pomodoro Technique has some merit
						due to its primary focus of distributing work/rest blocks and strict
						control of time and distractions which has been proven to be useful
						in long periods of focused attention.
					</p>
					<h1 className="text-4xl font-bold text-center">
						What makes this application special?
					</h1>
					<p className="w-3/4 my-3 text-justify indent-20 text-xl">
						Pomodoro is generally used with a 25 minute task block and 30 minute
						rest block for most effective result in productivity. However, as
						some people have longer/shorter attention spans, mental capacity, or
						perhaps need longer range of time for their mind to get into the
						zone! It is only natural for these blocks to be adjustable according
						to their users needs.
					</p>
					<p className="w-3/4 my-3 text-justify text-xl">
						Whether you want the task block to keep getting shorter as sessions
						go by; or if you want these blocks to keep getting longer as a
						certain time pass; maybe even for it to go up and down accordingly!
						BetterPomodoro can fulfill those needs.
					</p>
					<Link href="/settings">
						<button className="font-semibold text-lg mt-4 py-2 px-4 bg-[#c7d7fd] rounded-lg hover:bg-opacity-75">
							Get Started
						</button>
					</Link>
				</div>
			</main>
		</>
	);
};

export default App;
