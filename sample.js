var session = 1;
var currentTaskTime = 3;
var currentRestTime = 2;

var runningTaskTime = 3;
var runningRestTime = 2;

const stack = [
	// {
	// 	name: "on_even",
	// 	rule_id: 1,
	// 	from: "current",
	// 	add: 10000,
	// 	type: "task",
	// 	has_variable: false,
	// 	positon: 3,
	// 	executeFunction: () => {
	// 		if (session % 2 == 0) return true;
	// 		return false;
	// 	},
	// },
	// {
	// 	name: "on_odd",
	// 	rule_id: 2,
	// 	from: "current",
	// 	add: 5000,
	// 	type: "rest",
	// 	has_variable: false,
	// 	positon: 3,
	// 	executeFunction: () => {
	// 		if (session % 2 != 0) return true;
	// 		return false;
	// 	},
	// },
	// {
	// 	name: "every_session",
	// 	rule_id: 3,
	// 	from: "current",
	// 	add: 5,
	// 	type: "both",
	// 	has_variable: false,
	// 	positon: 3,
	// 	executeFunction: () => {
	// 		return true;
	// 	},
	// },
	{
		name: "on_n",
		rule_id: 4,
		from: "start",
		add: 5,
		type: "both",
		// if has_variable is true, then pass position to executeFunction
		has_variable: true,
		positon: 2,
		executeFunction: (n) => {
			if (session === n) return true;
			return false;
		},
	},
	{
		name: "every_nth",
		rule_id: 4,
		from: "start",
		add: 5,
		type: "both",
		has_variable: true,
		position: 2,
		executeFunction: (n) => {
			if (session % n === 0) return true;
			return false;
		},
	},
];

const config = {
	is_loop: true,
	session_num: 10,
	rule_array: stack,
	starting_rest: 3,
	starting_task: 2,
};

currentRestTime = config.starting_rest;
currentTaskTime = config.starting_task;

const restTimerFunction = () => {
	const newPromise = new Promise((resolve, reject) => {
		const timer = setInterval(() => {
			console.log(runningRestTime);
			if (runningRestTime <= 0) {
				clearInterval(timer);
				resolve(true);
			}
			runningRestTime -= 1;
		}, 1000);
	});
	return newPromise;
};
const taskTimerFunction = () => {
	const newPromise = new Promise((resolve, reject) => {
		const timer = setInterval(() => {
			console.log(runningTaskTime);
			if (runningTaskTime <= 0) {
				clearInterval(timer);
				resolve(true);
			}
			runningTaskTime -= 1;
		}, 1000);
	});
	return newPromise;
};
async function oneSession() {
	console.log("CURREST TASK NUMBER IS ", session);

	console.log("RUNNING TASK TIMER");
	await taskTimerFunction();
	console.log("RUNNING REST TIMER");
	await restTimerFunction();
}

const mainFunction = async () => {
	while (config.is_loop || session <= config.session_num) {
		await oneSession();
		runningTaskTime = currentTaskTime;
		runningRestTime = currentRestTime;
		session++;
		for (const configObject of config.rule_array) {
			if (
				(configObject.has_variable &&
					configObject.executeFunction(configObject.positon)) ||
				configObject.executeFunction()
			) {
				if (configObject.type.toUpperCase() === "TASK")
					if (configObject.from.toUpperCase() === "CURRENT") {
						runningTaskTime += configObject.add;
						currentTaskTime += configObject.add;
					} else {
						runningTaskTime = config.starting_task + configObject.add;
					}
				if (configObject.type.toUpperCase() === "REST")
					if (configObject.from.toUpperCase() === "CURRENT") {
						runningRestTime += configObject.add;
						currentRestTime += configObject.add;
					} else {
						runningRestTime = config.starting_rest + configObject.add;
					}
				if (configObject.type.toUpperCase() === "BOTH") {
					if (configObject.from.toUpperCase() === "CURRENT") {
						runningTaskTime += configObject.add;
						runningRestTime += configObject.add;
						currentTaskTime += configObject.add;
						currentRestTime += configObject.add;
					} else {
						runningTaskTime = config.starting_task + configObject.add;
						runningRestTime = config.starting_rest + configObject.add;
					}
				}
			}
		}
	}
};
mainFunction();
