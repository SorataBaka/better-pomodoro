import { useRouter } from "next/router";
import React from "react";

const Timer = () => {
	const router = useRouter();
	const [config, setConfig] = React.useState({});
	const [isTask, setIsTask] = React.useState(true);
	const [isRest, setIsRest] = React.useState(false);
	const [runningTask, setRunningTask] = React.useState(config.starting_task);
	const [runningRest, setRunningRest] = React.useState(config.starting_rest);
	const [sessionNum, setSessionNum] = React.useState(1);
	const [currentTask, setCurrentTask] = React.useState(0);
	const [currentRest, setCurrentRest] = React.useState(0);

	const handleStop = (e) => {
		e.preventDefault();
		window.location.replace("/finish");
	};

	const rulesFunction = [
		{
			name: "on_even",
			rule_id: 1,
			add: 0,
			type: "",
			has_variable: false,
			executeFunction: (currentSessionNum) => {
				if (currentSessionNum % 2 == 0) return true;
				return false;
			},
		},
		{
			name: "on_odd",
			rule_id: 2,
			add: 0,
			type: "",
			has_variable: false,
			executeFunction: (currentSessionNum) => {
				if (currentSessionNum % 2 != 0) return true;
				return false;
			},
		},
		{
			name: "every_session",
			rule_id: 3,
			add: 5,
			type: "",
			has_variable: false,
			executeFunction: (currentSessionNum) => {
				return true;
			},
		},
		{
			name: "on_n",
			rule_id: 4,
			add: 0,
			type: "",
			has_variable: true,
			executeFunction: (n, currentSessionNum) => {
				if (currentSessionNum === n) return true;
				return false;
			},
		},
		{
			name: "every_nth",
			rule_id: 5,
			add: 0,
			type: "",
			has_variable: true,
			executeFunction: (n, currentSessionNum) => {
				if (currentSessionNum % n === 0) return true;
				return false;
			},
		},
	];

	const taskTimerFunc = () => {
		setTimeout(() => {
			if (runningTask > 0) {
				setRunningTask(runningTask - 1);
			}
			if (runningTask == 0) {
				setIsTask(false);
				setIsRest(true);
			}
		}, 50);
	};

	const restTimerFunc = () => {
		setTimeout(() => {
			if (runningRest > 0) {
				setRunningRest(runningRest - 1);
			}
			if (runningRest == 0) {
				setIsTask(true);
				setIsRest(false);
			}
		}, 50);
	};

	const applyRule = (currentSessionNum) => {
		// console.log(currentSessionNum);
		let applied = false;
		let taskToAdd = 0;
		let restToAdd = 0;
		for (const rule of config.rule_array) {
			const ruleFunc = rulesFunction[rule.rule_id - 1];
			if (
				(ruleFunc.has_variable &&
					ruleFunc.executeFunction(rule.position, currentSessionNum)) ||
				ruleFunc.executeFunction(currentSessionNum)
			) {
				// console.log("Applying " + rule.name);
				switch (rule.type.toUpperCase()) {
					case "TASK":
						// setRunningTask(currentTask + rule.add);
						// setCurrentTask(currentTask + rule.add);
						taskToAdd += rule.add;
						applied = true;
						break;
					case "REST":
						// setRunningRest(currentRest + rule.add);
						// setCurrentRest(currentRest + rule.add);
						restToAdd += rule.add;
						applied = true;
						break;
					case "BOTH":
						// setCurrentTask(currentTask + rule.add);
						// setCurrentRest(currentRest + rule.add);
						// setRunningTask(currentTask + rule.add);
						// setRunningRest(currentRest + rule.add);
						taskToAdd += rule.add;
						restToAdd += rule.add;
						applied = true;
						break;
				}
			}
		}
		// console.log(`Adding ${taskToAdd} and ${restToAdd}`);
		setRunningTask(currentTask + taskToAdd);
		setCurrentTask(currentTask + taskToAdd);
		setRunningRest(currentRest + restToAdd);
		setCurrentRest(currentRest + restToAdd);
		return applied;
	};

	const afetOneSession = () => {
		setRunningTask(currentTask);
		setRunningRest(currentRest);
		const newSession = sessionNum + 1;
		setSessionNum(newSession);
		if (sessionNum + 1 >= config.session_num && config.is_loop == false) {
			// setIsTask(false);
			// setIsRest(false);
			// setRunningRest(0);
			// setRunningTask(0);
			window.location.replace("/finish");
			return;
		}
		applyRule(newSession);
		// if (applyRule()) return;
		// setRunningTask(config.starting_task);
		// setRunningRest(config.starting_rest);
		setIsTask(true);
		setIsRest(false);
	};

	React.useEffect(() => {
		const handleStart = () => {
			setConfig(JSON.parse(localStorage.getItem("config")));
			setRunningTask(JSON.parse(localStorage.getItem("config")).starting_task);
			setRunningRest(JSON.parse(localStorage.getItem("config")).starting_rest);
			setCurrentRest(JSON.parse(localStorage.getItem("config")).starting_rest);
			setCurrentTask(JSON.parse(localStorage.getItem("config")).starting_task);
		};

		handleStart();
	}, []);

	React.useEffect(() => {
		if (isTask && runningTask >= 0) {
			taskTimerFunc();
		}
		if (isRest && runningRest >= 0) {
			restTimerFunc();
		}
		if (runningTask == 0 && runningRest == 0) {
			afetOneSession();
		}
	});

	const formatTime = (time) => {
		let sec_num = time;
		let hours = Math.floor(sec_num / 3600);
		let minutes = Math.floor((sec_num - hours * 3600) / 60);
		let seconds = sec_num - hours * 3600 - minutes * 60;

		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		return hours + ":" + minutes + ":" + seconds;
	};

	return (
		<>
			<main className="bg-[#e8ecfa]">
				<div className="h-screen w-screen flex flex-col justify-center items-center">
					<h1 className="text-9xl font-bold text-center tracking-wide">
						{isTask ? formatTime(runningTask) : formatTime(runningRest)}
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
						Current Session: {sessionNum}
					</h3>
				</div>
			</main>
		</>
	);
};

export default Timer;
