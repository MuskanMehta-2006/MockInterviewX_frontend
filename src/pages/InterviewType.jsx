import { useState } from "react";
import "./InterviewStart.css";
import { useNavigate } from "react-router-dom";

export default function InterviewType() {
  const [topic, setTopic] = useState("DSA");
  const [difficulty, setDifficulty] = useState("Easy");
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  
const enterFullScreen = async () => {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    await elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    await elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    await elem.msRequestFullscreen();
  }
};
  return (
    <div className="container">

      {/* LEFT SIDE */}
      <div className="left">

        {/* 🔥 IMPROVED HEADER */}
        <div className="headerBox">
          <h2>Select Your Interview</h2>
          <p>Choose topic & difficulty to begin your AI mock interview</p>
        </div>

        {/* TOPIC */}
        <div className="section">
          <h3>Topic</h3>
          <div className="options">

            {[
              "DSA",
              "Fundamentals",
              "AIML",
              "Database",
              "Web Development"
              
            ].map((t) => (
              <button
                key={t}
                className={topic === t ? "active" : ""}
                onClick={() => setTopic(t)}
              >
                {t}
              </button>
            ))}

          </div>
        </div>

        {/* DIFFICULTY */}
        <div className="section">
          <h3>Difficulty</h3>
          <div className="options">
            {["Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                className={difficulty === d ? "active" : ""}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="right">

       

        <div className="interviewCard">
           <h2>Guidelines</h2>
          <ul>
            <li>Total Time: <b>40 Minutes</b></li>
            <li>Do not refresh or close window</li>
            <li>Complete test in one sitting</li>
            <li>Timer will not stop once started</li>
          </ul>
        </div>

        <div className="startBox">
          <input
            type="text"
            placeholder="type start to begin"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
  disabled={input.trim().toLowerCase() !== "start"}
  onClick={() => {
    const t = topic.toLowerCase();

    const path =
      t === "dsa" || t === "aiml" || t === "database"
        ? "/ai-interview/coding"
        : t === "fundamentals" || t === "web development"
        ? "/ai-interview/theory"
        : "/ai-interview";

    enterFullScreen();


    navigate(path, {
      state: {
        type: topic,
        level: difficulty.toLowerCase(),
      },
    });
  }}
>
  Start
</button>
        </div>

      </div>

    </div>
  );
}