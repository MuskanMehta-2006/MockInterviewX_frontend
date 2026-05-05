import { useState, useEffect, useRef } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import API from "../services/api";


export default function FundamentalsInterview() {
const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes in seconds
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const location = useLocation();
const type = location.state?.type || "fundamentals";
const level = location.state?.level || "easy";
const [questions, setQuestions] = useState([]);
const navigate = useNavigate();
useEffect(() => {
  if (timeLeft <= 0) {
    endTest(); // ⏱ auto submit after 40 min
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);
const formatTime = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
const endTest = () => {
  saveAnswer(text);

  navigate("/feedback-theory", {
    state: {
      questions,
      answers
    }
  });
};
useEffect(() => {
  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await API.post("/ai/interview/theoryQuestions", {
        type,
        level,
      });

      const data = res.data; // ✅ axios way

      setQuestions(Array.isArray(data) ? data : data.questions || []);
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchQuestions();
}, [type, level]);

  const recognitionRef = useRef(null);

  useEffect(() => {
    setText(answers[current]);
  }, [current]);

  const saveAnswer = (value) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  const next = () => {
    saveAnswer(text);
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    saveAnswer(text);
    if (current > 0) setCurrent(current - 1);
  };

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const newText = text + " " + transcript;
      setText(newText);
      saveAnswer(newText);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };
if (loading) {
  return (
    <div style={styles.page}>
      <div style={{ textAlign: "center" }}>
        <h2>⏳ Please wait a moment...</h2>
        <p>Preparing your interview</p>
      </div>
    </div>
  );
}
  return (
    <div style={styles.page}>
      
      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>
          <h2>
  {type.toLowerCase() === "fundamentals"
    ? "Fundamentals Interview"
    : "Web Development Interview"}
</h2>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
  <span style={styles.counter}>
    {current + 1} / {questions.length}
  </span>

  <span style={styles.timer}>
    ⏱ {formatTime()}
  </span>
</div>
        </div>

        {/* QUESTION */}
        <div style={styles.questionBox}>
          {questions[current]}
        </div>

        {/* ANSWER */}
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            saveAnswer(e.target.value);
          }}
          placeholder="Type or speak your answer..."
          style={styles.textarea}
        />

        {/* BUTTONS */}
        <div style={styles.btnRow}>
          <button
            onClick={prev}
            disabled={current === 0}
            style={styles.btn}
          >
            ⬅ Prev
          </button>

          <button onClick={startVoice} style={styles.voiceBtn}>
            🎤 Speak
          </button>

         {current === questions.length - 1 ? (
  <button
    onClick={endTest}
    style={{ ...styles.btn, background: "#ef4444" }}
  >
    End Test 🏁
  </button>
) : (
  <button
    onClick={next}
    style={styles.btn}
  >
    Next ➡
  </button>
)}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",   // ✅ change from height → minHeight
  background: "#f3f4f6",
  fontFamily: "sans-serif",
  padding: 20,
  boxSizing: "border-box",
  overflow: "hidden"
},
  card: {
    width: "55%",
    maxWidth: "750px", // ✅ prevents overflow on big screens
    background: "#fff",
    padding: 30,
    borderRadius: 14,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",

    display: "flex",            // ✅ better structure
    flexDirection: "column",
    gap: 15,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  counter: {
    background: "#111",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: 6,
    fontSize: 13
  },

  questionBox: {
    background: "#f1f5f9",
    padding: 15,
    borderRadius: 10,
    fontWeight: 500,
    lineHeight: "1.4",
    wordBreak: "break-word",   // ✅ prevents overflow text
  },

  textarea: {
    width: "100%",
    height: 140,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    resize: "none",
    outline: "none",
    boxSizing: "border-box",   // ✅ IMPORTANT FIX
  },

  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 5
  },

  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer"
  },

  voiceBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#10b981",
    color: "white",
    cursor: "pointer"
  }
};