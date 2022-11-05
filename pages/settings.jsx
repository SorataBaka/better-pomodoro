import style from "../styles/Settings.module.css";
import { useState } from "react";
export default function Settings() {
	const [isLoop, setLoop] = useState(false);
	return (
		<div className={style.mainDiv}>
			<div className={style.sidebar}>
				<div className={style.sidebarinner}>
					<h1>Settings</h1>
					<div className={style.sidebarsettingdiv}>
						<h3>Starting Task Time</h3>
						<div className={style.timediv}>
							<input type="number" placeholder="Hour" min={0} max={24} />
							<input type="number" placeholder="Minutes" min={0} max={60} />
						</div>
					</div>
					<div className={style.sidebarsettingdiv}>
						<h3>Starting Rest Time</h3>
						<div className={style.timediv}>
							<input type="number" placeholder="Hour" min={0} max={24} />
							<input type="number" placeholder="Minutes" min={0} max={60} />
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
							/>
						</div>
					)}
					<div className={style.buttondiv}>
						<button style={{ backgroundColor: "red" }}>Reset</button>
						<button style={{ backgroundColor: "blue" }}>Submit</button>
					</div>
				</div>
			</div>
			<div className={style.rulebar}>
				<div className={style.rulebarinner}></div>
			</div>
		</div>
	);
}
