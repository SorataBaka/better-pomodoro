var session = 1;
var currentTaskTime = 3;
var currentRestTime = 2;

var runningTaskTime = 3;
var runningRestTime = 2;

const stack = [
	// {
	// 	name: "on_even",
	// 	rule_id: 1,
	// 	add: 10000,
	// 	type: "task" || "rest" || "both",
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
	// 	add: 5000,
	// 	type: "rest",
	// 	has_variable: false,
	// 	positon: 3,
	// 	executeFunction: () => {
	// 		if (session % 2 != 0) return true;
	// 		return false;
	// 	},
	// },
	{
		name: "every_session",
		rule_id: 3,
		add: 5,
		type: "both",
		has_variable: false,
		positon: 3,
		executeFunction: () => {
			return true;
		},
	},
	// {
	// 	name: "on_n",
	// 	rule_id: 4,
	// 	add: 5000,
	// 	type: "task",
	// 	// if has_variable is true, then pass position to executeFunction
	// 	has_variable: true,
	// 	positon: 3,
	// 	executeFunction: (n) => {
	// 		if (session % n == 0) return true;
	// 		return false;
	// 	},
	// },
];

const config = {
	is_loop: true,
	session_num: 10,
	rule_array: stack,
};

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
	runningRestTime = currentRestTime;
	runningTaskTime = currentTaskTime;

	await taskTimerFunction();
	await restTimerFunction();
}

const mainFunction = async () => {
	while (config.is_loop || config.session_num > session) {
		await oneSession();
		for (const configObject of config.rule_array) {
			if (
				configObject.has_variable &&
				configObject.executeFunction(configObject.positon)
			) {
				if (configObject.type === "task") currentTaskTime += configObject.add;
				if (configObject.type === "rest") currentRestTime += configObject.add;
				if (configObject.type === "both") {
					currentTaskTime += configObject.add;
					currentRestTime += configObject.add;
				}
			} else if (configObject.executeFunction()) {
				if (configObject.type === "task") currentTaskTime += configObject.add;
				if (configObject.type === "rest") currentRestTime += configObject.add;
				if (configObject.type === "both") {
					currentTaskTime += configObject.add;
					currentRestTime += configObject.add;
				}
			}
		}
		session++;
	}
};
mainFunction();
