import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";

function LeftAiInterview({ type , level , onTimeUp }) {
  const [data, setData] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40 * 60);

  // =========================
  // ⏱ TIMER
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          alert("⏱ Time Over!");
          onTimeUp && onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // =========================
  // 🔊 SPEAK FUNCTION
  // =========================
  const speakText = (text) => {
    if (!text) return;

    window.speechSynthesis.cancel(); // avoid overlap

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;

    setSpeaking(true);

    speech.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  const speak = () => {
    speakText(data?.statement);
  };

  const stopSpeak = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  // =========================
  // 📡 FETCH QUESTION API
  // =========================
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await API.get(
          "/interview/question",
          {
            params: {
  type: type?.toUpperCase() || "DSA",
  level: level?.toLowerCase() || "easy",
},
          }
        );

        setData(res.data);
        sessionStorage.setItem(
  `${type}_${level}_question`,
  JSON.stringify(res.data)
);
      } catch (err) {
        console.log("Error:", err.message);
      }
    };

    fetchQuestion();
  }, [type, level]);

  // =========================
  // 🔥 AUTO SPEAK (NEW)
  // =========================
  useEffect(() => {
    if (data?.statement) {
      const timer = setTimeout(() => {
        speakText(data.statement);
      }, 500); // small delay for smooth UX

      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <div style={styles.left}>
      {/* HEADER */}
      <div style={styles.header}>
        {/* AI INTERVIEWER */}
        <h2 style={styles.titleHeader}>AI Interviewer</h2>

        {/* CONTROLS (NO EXTRA SPACE WITH TITLE) */}
        <div style={styles.controls}>
          <button onClick={speak} style={styles.iconBtn}>🔊</button>
          <button onClick={stopSpeak} style={styles.iconBtn}>⏹</button>
        </div>

        {/* TIMER */}
        <span style={styles.timer}>{formatTime()}</span>
      </div>

      {/* LOADING */}
      {!data ? (
        <div>Loading question...</div>
      ) : (
        <>
          {/* QUESTION TITLE (SPACE HERE ADDED) */}
          <div style={styles.questionTitle}>{data.question}</div>

          {/* PROBLEM */}
          <div style={styles.block}>
            <h4>Problem</h4>
            <p>{data.statement}</p>
          </div>

          {/* EXAMPLE 1 */}
          <div style={styles.block}>
            <h4>Example 1</h4>
            <pre style={styles.preBox}>
              Input: {data.example1?.input}
              {"\n"}
              Output: {data.example1?.output}
            </pre>
          </div>

          {/* EXAMPLE 2 */}
          <div style={styles.block}>
            <h4>Example 2</h4>
            <pre  style={styles.preBox}>
              Input: {data.example2?.input}
              {"\n"}
              Output: {data.example2?.output}
            </pre>
          </div>

          {/* CONSTRAINTS */}
          <div style={styles.block}>
            <h4>Constraints</h4>
            <pre style={styles.preBox}>
              {Array.isArray(data.constraints)
                ? data.constraints.join("\n")
                : data.constraints}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  left: {
    flex: 1,
    padding: 30,
    background: "#fff",
    overflowY: "auto",
    minWidth: 0,
  },

  // HEADER FIX (NO GAP BETWEEN TITLE & CONTROLS)
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom:30,
    justifyContent: "space-between",
  },

 titleHeader: {
  margin: 0,
  padding: 0,
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: 0, // 👈 removes extra vertical space
},

  controls: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  timer: {
    background: "#111",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
  },

  // QUESTION TITLE SEPARATE SPACE
  questionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: "18px",
    fontWeight: "bold",
  },
preBox: {
  whiteSpace: "pre-wrap",   // ⭐ main fix (wrap enable)
  wordBreak: "break-word",  // ⭐ long text break
  overflowWrap: "break-word",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: 0,
},
  block: {
    marginTop: 15,
    padding: 12,
    background: "#f3f4f6",
    borderRadius: 8,
  },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: "#e5e7eb",
    cursor: "pointer",
  },
};

export default LeftAiInterview;