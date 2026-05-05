import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FeedbackTheory() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    score: 0,
    feedback: "No feedback available",
    scores: [],
  });

  const { questions = [], answers = [] } = location.state || {};

  // =========================
  // 🔥 API CALL
  // =========================
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "http://localhost:8080/api/ai/interview/theory-feedback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              questions,
              answers,
            }),
          }
        );

        const result = await res.json();

        setData({
          score: result.score || 0,
          feedback: result.feedback || "No feedback available",
          scores: result.scores || [],
        });
      } catch (err) {
        console.error("Feedback API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const getScoreColor = () => {
    if (data.score >= 80) return "#22c55e";
    if (data.score >= 50) return "#f59e0b";
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
      width: "1000px",
      height: "550px",
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
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "15px",
    },

    title: {
      fontSize: "22px",
      fontWeight: "700",
    },

    scoreCircle: {
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
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "10px",
      marginTop: "10px",
    },

    circle: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "700",
      fontSize: "14px",
      background: "#d1d5db",
    },

    green: {
      background: "#22c55e",
      color: "white",
    },

    red: {
      background: "#ef4444",
      color: "white",
    },

    feedbackBox: {
      marginTop: "10px",
      padding: "12px",
      background: "#eef2ff",
      borderRadius: "10px",
      fontSize: "14px",
    },

    button: {
      marginTop: "10px",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      background: "#4f46e5",
      color: "white",
      cursor: "pointer",
      fontWeight: "600",
    },
  };
if (loading) {
  return (
    <div style={styles.container}>
      <div style={{ textAlign: "center" }}>
        <h2>⏳ Please wait a moment...</h2>
        <p>Generating your feedback</p>
      </div>
    </div>
  );
}
  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* LEFT IMAGE */}
        <div style={styles.left}>
          <img src="/feedback.png" alt="feedback" style={{ height: "500px" }} />
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>

          <div style={styles.title}>🎯 Interview Result</div>

          {/* SCORE */}
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={styles.scoreCircle}>
              {data.score}/100
            </div>

            <div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                Overall Performance
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700" }}>
                {data.score >= 80
                  ? "Excellent 🚀"
                  : data.score >= 50
                  ? "Good 👍"
                  : "Need Improvement ⚠️"}
              </div>
            </div>
          </div>

          {/* ANALYSIS */}
          <div>
            <div style={{ fontWeight: "600", marginBottom: "8px" }}>
              Question Analysis
            </div>

            <div style={styles.grid}>
              {Array.from({ length: 10 }).map((_, idx) => {
                const s = data.scores?.[idx];

                return (
                  <div
                    key={idx}
                    style={{
                      ...styles.circle,
                      ...(s === 1
                        ? styles.green
                        : s === 0
                        ? styles.red
                        : {}),
                    }}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {/* FEEDBACK */}
          <div style={styles.feedbackBox}>
            🤖 {loading ? "Generating feedback..." : data.feedback}
          </div>

          {/* BUTTON */}
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