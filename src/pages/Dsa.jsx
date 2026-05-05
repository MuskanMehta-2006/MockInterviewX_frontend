import React, { useState,useEffect } from "react";
import Editor from "@monaco-editor/react";
import LeftAiInterview from "../components/LeftAiInterview";
import axios from "axios";


import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
function Dsa() {

const navigate = useNavigate();
const location = useLocation();

const [loadingFeedback, setLoadingFeedback] = useState(false);
const [aiData, setAiData] = useState({});
const [loadingQ, setLoadingQ] = useState(false);
const [hintLoading, setHintLoading] = useState(false);
const [hint, setHint] = useState("");
 const type = location.state?.type || "DSA";
  const level = location.state?.level || "easy";
const [timeComplexity, setTimeComplexity] = useState("-");
const [spaceComplexity, setSpaceComplexity] = useState("-");
  const [code, setCode] = useState("// write your code here");
  const [language, setLanguage] = useState("cpp");
  const [activeTab, setActiveTab] = useState("code");
  const [result, setResult] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [isPassed, setIsPassed] = useState(false);
  const getHint = async () => {
  if (!code || code.trim() === "") {
    toast.error("Write some code first");
    return;
  }

  setHintLoading(true);

  try {
    const res = await API.post(
      "/ai/interview/hint",
      {
        question: aiData?.statement,
        code,
        language,
      }
    );

    let data = res.data;

    console.log("RAW HINT RESPONSE:", data);

    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.log("Parsing failed");
      }
    }

    const hintText =
      data?.hint ||
      data?.choices?.[0]?.message?.content ||
      "⚠️ No hint received";

    console.log("FINAL HINT:", hintText);

    setHint(hintText);

    // 🔥 MAIN CHANGE: toast instead of popup
    toast.success(hintText, {
      duration: 5000,
      style: {
        background: "#1e293b",
        color: "#fff",
        borderRadius: "10px",
        padding: "12px",
        fontSize: "13px",
      },
    });

  } catch (err) {
    console.error(err);

    toast.error("⚠️ Hint not available right now");
  } finally {
    setHintLoading(false);
  }
};
  useEffect(() => {
  if (type === "Database") {
    setCode("-- write your SQL query here");
  } else if (type === "AIML") {
  setCode(`# Python AI/ML solution
import numpy as np
import pandas as pd

# write your solution here`);
}else if (type === "DSA") {
    setCode("// write your code here");
  }
}, [type]);
  useEffect(() => {
  if (type === "DSA") {
    setLanguage("cpp");
  } else if (type === "AIML" || type === "AI" || type === "AI-ML") {
    setLanguage("python");
  } else if (
    type === "Database"
  ) {
    setLanguage("sql");
  }
}, [type]);
 useEffect(() => {
  const fetchQuestion = async () => {
    try {
      setLoadingQ(true);

      const res = await API.get(
        `/api/ai/interview/question?level=${level}&type=${type}`
      );

      console.log("QUESTION API RESPONSE:", res.data);

      setAiData(res.data);

      // optional: store in session
      sessionStorage.setItem("question", JSON.stringify(res.data));

    } catch (err) {
      console.error("Question fetch error:", err);
      toast.error("Failed to load question");
    } finally {
      setLoadingQ(false);
    }
  };

  fetchQuestion();
}, [level, type]);
const endTest = async () => {
  setLoadingFeedback(true);

  // ❌ CASE 1: Never even submitted
  if (attempts === 0) {
    setLoadingFeedback(false);
      alert("❌ Please submit before ending test");
    setResult("❌ Please submit before ending test");
    return;
  }

  // ❌ CASE 2: Submitted but not passed
  if (!isPassed) {
    setLoadingFeedback(false);

    navigate("/feedback", {
      state: {
        attempts,
        timeComplexity: "",
        spaceComplexity: "",
        codeQuality: "Error",
        feedback:
          "❌ Please correct your code. You need to improve your DSA skills.",
      },
    });

    return;
  }

  // ✅ CASE 3: PASSED → AI CALL
  try {
    const res = await API.post(
      "/ai/interview/feedback",
      {
        question: aiData?.statement,
        code,
        language,
      }
    );

    const feedback = res.data;

    navigate("/feedback", {
      state: {
        ...feedback,
        attempts,
        timeComplexity: feedback.timeComplexity || "",
        spaceComplexity: feedback.spaceComplexity || "",
      },
    });

  } catch (err) {
    navigate("/feedback", {
      state: {
        attempts,
        timeComplexity: "",
        spaceComplexity: "",
        codeQuality: "Error",
        feedback:
          "❌ Please correct your code. You need to improve your DSA skills.",
      },
    });
  } finally {
    setLoadingFeedback(false);
  }
};
const testCases = [
  aiData?.example1 && {
    input: aiData.example1.input,
    expected: aiData.example1.output,
  },
  aiData?.example2 && {
    input: aiData.example2.input,
    expected: aiData.example2.output,
  },
].filter(Boolean);

const runCode = async () => {
  if (!code || code.trim() === "") {
    setResult("❌ Code is empty");
    setActiveTab("result");
    return;
  }

  setActiveTab("result");
  setResult("Running...");

  try {
    const res = await API.post(
      "/ai/interview/evaluate",
      {
        question: aiData?.statement,
        code: code,              // 👈 IMPORTANT FIX
        language: language,
        mode: "run"
      }
    );

    const output = res.data;

    const resultText =
      typeof output === "string"
        ? output
        : output?.result || output?.status || JSON.stringify(output);

    if (resultText.includes("COMPILE_ERROR")) {
      setResult("❌ Compile Error");
    } else if (resultText.includes("RUNTIME_ERROR")) {
      setResult("💥 Runtime Error");
    } else {
      setResult("✅ Code Executed Successfully");
    }
  } catch (err) {
    setResult("⚠️ Server Error");
  }
};
const submitCode = async () => {
  if (!code || code.trim() === "") {
    setResult("❌ Code is empty");
    setActiveTab("result");
    return;
  }

  setActiveTab("result");
  setResult("Evaluating...");
  setAttempts(prev => prev + 1);

  try {
    const res = await API.post(
      "/ai/interview/evaluate",
      {
        question: aiData?.statement,
        code: code,
        language: language,
        mode: "submit"
      }
    );

    let output = res.data;

    console.log("RAW RESPONSE:", output);

    // 🔥 CASE: AI returning ```json ... ```
    if (typeof output === "string") {
      try {
        const cleaned = output
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        output = JSON.parse(cleaned);
      } catch (e) {
        console.log("JSON parse failed, fallback");
      }
    }

    console.log("PARSED OUTPUT:", output);

    // ✅ FINAL CHECK
    if (output?.passed === true || output?.status === "ACCEPTED") {
      setResult("🎉 Woohoo! All testcases passed");
      setScore(100);
      setIsPassed(true);
      setTimeComplexity("-");
  setSpaceComplexity("-");
    } else {
      setResult(`❌ ${output?.message || "Some test cases failed"}`);
       setScore(50);
         setIsPassed(false);

  // ❌ IMPORTANT: blank values when failed
  setTimeComplexity("-");
  setSpaceComplexity("-");

    }

  } catch (err) {
    console.error("Submit error:", err);
    setResult("⚠️ Server Error");
  }
};
  return (
  <div style={styles.page}>
    
    {/* LEFT CARD */}
    <div style={styles.leftCard}>
      <LeftAiInterview type={type} level={level} />
    </div>

    {/* RIGHT CARD */}
    <div style={styles.rightCard}>
      
      {/* TOP BAR */}
      <div style={styles.topBar}>
        
        <div style={styles.leftBar}>
          {["code", "testcase", "result"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={
                activeTab === tab
                  ? styles.activeTabBtn
                  : styles.tabBtn
              }
            >
              {tab === "code" && "Code"}
              {tab === "testcase" && "Testcase"}
              {tab === "result" && "Result"}
            </button>
            
          ))}
          
        </div>
        

        <div style={styles.controls}>
          
         <button
  style={styles.hintBtn}
  onClick={getHint}
  disabled={hintLoading}
>
  {hintLoading ? "🤖 AI Thinking..." : "💡 Take Hint"}
</button>

         <select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  style={styles.select}
>
  <option value="cpp">C++</option>

  <option value="python">Python</option>
  <option value="python3">Python3</option>

  <option value="java">Java</option>

  {/* DBMS languages */}
  <option value="sql">SQL</option>
  <option value="mongodb">MongoDB</option>

  {/* Others */}
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="csharp">C#</option>
  <option value="go">Go</option>
  <option value="rust">Rust</option>
</select>
          <button onClick={runCode} style={styles.playBtn}>▶</button>
          <button onClick={submitCode} style={styles.submitBtn}>Submit</button>
          <button
  onClick={endTest}
  style={styles.endBtn}
  disabled={loadingFeedback}
>
  {loadingFeedback ? "Analyzing..." : "End Test"}
</button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={styles.editorWrapper}>
        {activeTab === "code" && (
          <Editor
            height="100%"
            language={language}
            theme="vs-light"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 10 },
              renderLineHighlight: "none",
            }}
          />
        )}

        {activeTab === "testcase" && (
          <div style={styles.testcase}>
            {testCases.map((tc, i) => (
              <div key={i} style={styles.testBox}>
                <p><b>Input:</b> {tc.input}</p>
                <p><b>Expected:</b> {tc.expected}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "result" && (
          <div style={styles.result}>
            {result || "Run or Submit to see result"}
          </div>
        )}
        
      </div>

    </div>
  
  </div>
  
  
);

};
const styles = {
  page: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    height: "100vh",
    background: "#f3f4f6", // 👈 gray bg
    boxSizing: "border-box",
  },

  leftCard: {
    width: "40%",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    overflow: "auto",
  },

  rightCard: {
    width: "60%",
    background: "#ffffff",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 15px",
    borderBottom: "1px solid #e5e7eb",
    background: "#f9fafb",
  },

  leftBar: {
    display: "flex",
    gap: "10px",
  },
hintBox: {
  marginTop: "10px",
  padding: "10px",
  background: "#fffbeb",
  border: "1px solid #fbbf24",
  borderRadius: "6px",
  color: "#92400e",
  fontSize: "14px",
},
  tabBtn: {
    background: "transparent",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    color: "#6b7280",
    borderRadius: "6px",
  },

  activeTabBtn: {
    background: "#eef2ff",
    color: "#4f46e5",
    border: "1px solid #c7d2fe",
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "600",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  select: {
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },

  playBtn: {
    background: "#22c55e",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  submitBtn: {
    background: "#4f46e5",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  editorWrapper: {
    flex: 1,
    padding: "10px",
  },

  testcase: {
    padding: "10px",
  },

  testBox: {
    background: "#f9fafb",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    marginBottom: "10px",
  },endBtn: {
  background: "#ef4444",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
},

  result: {
    padding: "20px",
    fontSize: "16px",
  },
  
};

export default Dsa;