import { useRouter } from "next/router";
import React from "react";
// import { useStopwatch, useTimer } from "react-timer-hook";

const dummyConfig = {
  is_loop: false,
  session_num: 2,
  rule_array: [
    {
      name: "On Odd",
      rule_id: "2",
      add: 1,
      type: "both",
      has_variable: false,
      position: 0,
    },
  ],
  starting_rest: 2,
  starting_task: 2,
};

const Timer = () => {
  const router = useRouter();
  const [isTask, setIsTask] = React.useState(true);
  const [isRest, setIsRest] = React.useState(false);
  const [runningTask, setRunningTask] = React.useState(
    dummyConfig.starting_task
  );
  const [runningRest, setRunningRest] = React.useState(
    dummyConfig.starting_rest
  );
  const [sessionNum, setSessionNum] = React.useState(dummyConfig.session_num);

  const handleStop = (e) => {
    e.preventDefault();
  };

  const rulesFunction = [
    {
      name: "on_even",
      rule_id: 1,
      add: 0,
      type: "",
      has_variable: false,
      executeFunction: () => {
        if (sessionNum % 2 == 0) return true;
        return false;
      },
    },
    {
      name: "on_odd",
      rule_id: 2,
      add: 0,
      type: "",
      has_variable: false,
      executeFunction: () => {
        if (sessionNum % 2 != 0) return true;
        return false;
      },
    },
    {
      name: "every_session",
      rule_id: 0,
      add: 5,
      type: "",
      has_variable: false,
      executeFunction: () => {
        return true;
      },
    },
    {
      name: "on_n",
      rule_id: 4,
      add: 0,
      type: "",
      has_variable: true,
      executeFunction: (n) => {
        if (sessionNum === n) return true;
        return false;
      },
    },
    {
      name: "every_nth",
      rule_id: 5,
      add: 0,
      type: "",
      has_variable: true,
      executeFunction: (n) => {
        if (sessionNum % n === 0) return true;
        return false;
      },
    },
  ];

  const taskTimerFunc = () => {
    const timer = setTimeout(() => {
      if (runningTask > 0) {
        setRunningTask(runningTask - 1);
      }
      if (runningTask == 0) {
        setIsTask(false);
        setIsRest(true);
      }
    }, 1000);
  };

  const restTimerFunc = () => {
    const timer = setTimeout(() => {
      if (runningRest > 0) {
        setRunningRest(runningRest - 1);
      }
      if (runningRest == 0) {
        setIsRest(false);
        setIsTask(true);
      }
    }, 1000);
  };

  const applyRule = () => {
    let applied = false;
    for (const rule of dummyConfig.rule_array) {
      const ruleFunc = rulesFunction[rule.rule_id - 1];
      if (
        (ruleFunc.has_variable && ruleFunc.executeFunction(rule.position)) ||
        ruleFunc.executeFunction()
      ) {
        switch (rule.type.toUpperCase()) {
          case "TASK":
            setRunningTask(dummyConfig.starting_task + rule.add);
            applied = true;
            break;
          case "REST":
            setRunningRest(dummyConfig.starting_rest + rule.add);
            applied = true;
            break;
          case "BOTH":
            setRunningTask(dummyConfig.starting_task + rule.add);
            setRunningRest(dummyConfig.starting_rest + rule.add);
            applied = true;
            break;
        }
      }
    }
    return applied;
  };

  const afetOneSession = () => {
    setSessionNum(sessionNum + 1);

    console.log(sessionNum);

    if (sessionNum == dummyConfig.session_num && dummyConfig.is_loop == false) {
      setIsTask(false);
      setIsRest(false);
      setRunningRest(0);
      setRunningTask(0);
      return;
    }

    if (applyRule()) return;

    setRunningRest(dummyConfig.starting_rest);
    setRunningTask(dummyConfig.starting_task);
    setIsTask(true);
    setIsRest(false);
  };

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

  return (
    <>
      <main className="bg-[#e8ecfa]">
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <h1 className="text-9xl font-bold text-center tracking-wide">
            {runningTask} {runningRest}
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
            NEXT UP: AOSAOWOAWKOAKWO
          </h3>
        </div>
      </main>
    </>
  );
};

export default Timer;
