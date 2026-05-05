import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    attempts = 0,
    timeComplexity = "-",
    spaceComplexity = "-",
    codeQuality = "-",
    feedback = "No feedback available",
  } = location.state || {};

  // 🔥 score color dynamic
  const getScoreColor = () => {
    if (score >= 80) return "#22c55e";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6fb",
      fontFamily: "Inter, sans-serif",
    },

    card: {
      width: "950px",
      height: "520px",
      display: "flex",
      borderRadius: "16px",
      overflow: "hidden",
      background: "white",
      boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
    },

    left: {
      width: "45%",
      background: "#eef2ff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    right: {
      width: "55%",
      padding: "35px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    title: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "20px",
    },

    scoreWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginBottom: "20px",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    },

    box: {
      background: "#f9fafb",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
      fontSize: "14px",
    },

    fullBox: {
      background: "#eef2ff",
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid #c7d2fe",
      marginTop: "12px",
      fontSize: "14px",
    },

    label: {
      fontWeight: "600",
      color: "#374151",
    },

    value: {
      marginTop: "4px",
      fontWeight: "500",
    },

    button: {
      marginTop: "25px",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      background: "#4f46e5",
      color: "white",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* LEFT IMAGE */}
        <div style={styles.left}>
          <img
            src="/feedback.png"
            alt="feedback"
            style={{ height: "500px" }}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div style={styles.right}>
          <div style={styles.title}>🎯 Performance Summary</div>

          {/* SCORE SECTION */}
          <div style={styles.scoreWrapper}>
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: getScoreColor(),
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              {score}/100
            </div>

            <div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                Your Score
              </div>
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                {score >= 80
                  ? "Excellent 🚀"
                  : score >= 50
                  ? "Good 👍"
                  : "Need Improvement ⚠️"}
              </div>
            </div>
          </div>

          {/* GRID DATA */}
          <div style={styles.grid}>
            <div style={styles.box}>
              <div style={styles.label}>Attempts</div>
              <div style={styles.value}>{attempts}</div>
            </div>

            <div style={styles.box}>
              <div style={styles.label}>Code Quality</div>
              <div style={styles.value}>{codeQuality}</div>
            </div>

            <div style={styles.box}>
              <div style={styles.label}>Time Complexity</div>
              <div style={styles.value}>{timeComplexity}</div>
            </div>

            <div style={styles.box}>
              <div style={styles.label}>Space Complexity</div>
              <div style={styles.value}>{spaceComplexity}</div>
            </div>
          </div>

          {/* AI FEEDBACK */}
          <div style={styles.fullBox}>
            <div style={styles.label}>🤖 AI Suggestion</div>
            <div style={styles.value}>{feedback}</div>
          </div>

          <button
            style={styles.button}
            onClick={() => navigate("/interview-type")}
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}