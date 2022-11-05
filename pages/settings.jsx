import style from "../styles/Settings.module.css";
import { useState } from "react";
export default function Settings() {
	const [isLoop, setLoop] = useState(false);

	const [taskHour, setTaskHour] = useState(0);
	const [taskMinute, setTaskMinute] = useState(0);

	const [restHour, setRestHour] = useState(0);
	const [restMinute, setRestMinute] = useState(0);

	const [sessions, setSession] = useState(0);

	const submit = () => {
		const newConfig = {
			is_loop: isLoop,
			session_num: sessions,
			rule_array: [],
			starting_rest: restHour * 60 + restMinute,
			starting_task: taskHour * 60 + taskMinute,
		};
		console.log(newConfig);
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
									setTaskHour(e.target.value > 24 ? 24 : e.target.value)
								}
							/>
							<input
								type="number"
								placeholder="Minutes"
								min={0}
								max={60}
								value={taskMinute}
								onChange={(e) =>
									setTaskMinute(e.target.value > 60 ? 60 : e.target.value)
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
									setRestHour(e.target.value > 24 ? 24 : e.target.value)
								}
							/>
							<input
								type="number"
								placeholder="Minutes"
								min={0}
								max={60}
								value={restMinute}
								onChange={(e) =>
									setRestMinute(e.target.value > 60 ? 60 : e.target.value)
								}
							/>
						</div>
					</div>
					<div className={style.sidebarsettingdiv}>
						<h3>Repeat Forever?</h3>
						<label class={style.switch}>
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
					{isLoop && (
						<div className={style.sidebarsettingdiv}>
							<h3>How many sessions?</h3>
							<input
								type="number"
								placeholder="Sessions"
								min={0}
								style={{ width: "100%" }}
								value={sessions}
								onChange={(e) => setSession(e.target.value)}
							/>
						</div>
					)}
					<div className={style.buttondiv}>
						<button style={{ backgroundColor: "red" }}>Reset</button>
						<button onClick={submit} style={{ backgroundColor: "blue" }}>
							Submit
						</button>
					</div>
				</div>
			</div>
			<div className={style.rulebar}>
				<div className={style.rulebarinner}>
					<h1>Pomodoro Rules</h1>
				</div>
			</div>
		</div>
	);
}
