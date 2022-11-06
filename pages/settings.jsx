import style from "../styles/Settings.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export default function Settings() {
	const router = useRouter();

	const [isLoop, setLoop] = useState(false);

	const [taskHour, setTaskHour] = useState(0);
	const [taskMinute, setTaskMinute] = useState(0);

	const [restHour, setRestHour] = useState(0);
	const [restMinute, setRestMinute] = useState(0);

	const [sessions, setSession] = useState(0);

	const [rules, setRules] = useState([]);

	const [currentRuleSelect, setCurrentRuleSelect] = useState(1);

	const availableRules = [
		{ name: "On Even", rule_id: 1 },
		{ name: "On Odd", rule_id: 2 },
		{ name: "Every Session", rule_id: 3 },
		{ name: "On Nth", rule_id: 4 },
		{ name: "Every Nth", rule_id: 5 },
	];

	const validateConfig = (config) => {
		if (config.isLoop === false && config.session_num <= 0) return false;
		if (config.starting_rest === 0 || config.starting_task === 0) return false;
		return true;
	};

	const submit = () => {
		const newConfig = {
			is_loop: isLoop,
			session_num: sessions,
			rule_array: rules,
			starting_rest: restHour * 60 + restMinute,
			starting_task: taskHour * 60 + taskMinute,
		};
		const validity = validateConfig(newConfig);
		if (!validity) {
			toast.warn(
				"Please make sure you have selected the correct configurations! Starting times must be more than 0 and sessions must be set if loop is off."
			);
			return;
		}
		localStorage.setItem("config", JSON.stringify(newConfig));
		router.push("/timer");
	};

	const addRule = () => {
		const newArray = [
			...rules,
			{
				name: availableRules[currentRuleSelect - 1].name,
				rule_id: currentRuleSelect,
				add: 0,
				type: "task",
				has_variable:
					currentRuleSelect == 4 || currentRuleSelect == 5 ? true : false,
				position: 0,
			},
		];
		setRules(newArray);
		setCurrentRuleSelect(1);
	};
	const resetHandler = () => {
		setLoop(false);
		setTaskHour(0);
		setTaskMinute(0);
		setRestHour(0);
		setRestMinute(0);
		setSession(0);
		setRules([]);
		setCurrentRuleSelect(1);
	};
	return (
		<div className={style.mainDiv}>
			<div className={style.sidebar}>
				<div className={style.sidebarinner}>
					<h1>Settings</h1>
					<div className={style.sidebarsettingdiv}>
						<h3>Starting Task Time</h3>
						<div className={style.timediv}>
							<input
								type="number"
								placeholder="Hour"
								min={0}
								max={24}
								value={taskHour}
								onChange={(e) =>
									setTaskHour(
										e.target.value > 24 ? 24 : parseInt(e.target.value)
									)
								}
							/>
							<input
								type="number"
								placeholder="Minutes"
								min={0}
								max={60}
								value={taskMinute}
								onChange={(e) =>
									setTaskMinute(
										e.target.value > 60 ? 60 : parseInt(e.target.value)
									)
								}
							/>
						</div>
					</div>
					<div className={style.sidebarsettingdiv}>
						<h3>Starting Rest Time</h3>
						<div className={style.timediv}>
							<input
								type="number"
								placeholder="Hour"
								min={0}
								max={24}
								value={restHour}
								onChange={(e) =>
									setRestHour(
										e.target.value > 24 ? 24 : parseInt(e.target.value)
									)
								}
							/>
							<input
								type="number"
								placeholder="Minutes"
								min={0}
								max={60}
								value={restMinute}
								onChange={(e) =>
									setRestMinute(
										e.target.value > 60 ? 60 : parseInt(e.target.value)
									)
								}
							/>
						</div>
					</div>
					<div className={style.sidebarsettingdiv}>
						<h3>Repeat Forever?</h3>
						<label className={style.switch}>
							<input
								type="checkbox"
								checked={isLoop}
								onChange={() => {
									isLoop ? setLoop(false) : setLoop(true);
								}}
							/>
							<span className={style.slider + " " + style.round}></span>
						</label>
					</div>
					{!isLoop && (
						<div className={style.sidebarsettingdiv}>
							<h3>How many sessions?</h3>
							<input
								type="number"
								placeholder="Sessions"
								min={0}
								style={{ width: "100%" }}
								value={sessions}
								onChange={(e) => setSession(parseInt(e.target.value))}
							/>
						</div>
					)}
					<div className={style.buttondiv}>
						<button style={{ backgroundColor: "red" }} onClick={resetHandler}>
							Reset
						</button>
						<button onClick={submit} style={{ backgroundColor: "blue" }}>
							Submit
						</button>
					</div>
				</div>
			</div>
			<div className={style.rulebar}>
				<div className={style.rulebarinner}>
					<h1>Pomodoro Rules</h1>
					<div className={style.rulediv}>
						<select
							name="rules"
							value={currentRuleSelect}
							onChange={(e) => {
								setCurrentRuleSelect(e.target.value);
							}}
						>
							{availableRules.map((rule) => {
								return (
									<option value={rule.rule_id} key={rule.rule_id}>
										{rule.name}
									</option>
								);
							})}
						</select>
						<button onClick={addRule}>+</button>
					</div>
					{rules.map((rule, index) => {
						return (
							<div className={style.addedrulediv} key={index}>
								<div className={style.horizontal}>
									<div className={style.ruledetaildiv}>
										<h3>Rule Type</h3>
										<input type="text" value={rule.name} disabled />
									</div>
									<div className={style.ruledetaildiv}>
										<h3>Minutes to add</h3>
										<input
											type="number"
											value={parseInt(rule.add) / 60}
											onChange={(e) => {
												const updatedRules = rules;
												updatedRules[index].add = parseInt(e.target.value) * 60;
												setRules([...updatedRules]);
											}}
										/>
									</div>
								</div>
								<div className={style.horizontal}>
									<div className={style.ruledetaildiv}>
										<h3>Where to add?</h3>
										<select
											value={rule.type}
											onChange={(e) => {
												const updatedRules = rules;
												updatedRules[index].type = e.target.value;
												setRules([...updatedRules]);
											}}
										>
											<option value={"task"}>Task Timer</option>
											<option value={"rest"}>Rest Timer</option>
											<option value={"both"}>Both Timer</option>
										</select>
									</div>
									<div className={style.ruledetaildiv}>
										<h3>Rule Criteria (N)</h3>
										<input
											type="number"
											value={parseInt(rule.position)}
											disabled={rule.rule_id != 4 && rule.rule_id != 5}
											onChange={(e) => {
												const updatedRules = rules;
												updatedRules[index].position = parseInt(e.target.value);
												setRules([...updatedRules]);
											}}
										/>
									</div>

									<button
										onClick={() => {
											const current = rules;
											current.splice(index, 1);
											setRules([...current]);
										}}
									>
										Delete
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
