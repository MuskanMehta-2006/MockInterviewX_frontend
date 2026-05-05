import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const feedback = location.state?.feedback || "No feedback available";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>📊 AI Feedback</h2>

        <div style={styles.feedbackBox}>
          <p>{feedback}</p>
        </div>

        <div style={styles.buttons}>
          <button onClick={() => navigate("/interview-type")}>
            🔁 Try Another
          </button>

          <button
            style={{ backgroundColor: "#4CAF50" }}
            onClick={() => navigate("/")}
          >
            🏠 Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0px 5px 20px rgba(0,0,0,0.2)",
  },
  feedbackBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#f4f6f8",
    borderRadius: "8px",
    textAlign: "left",
    maxHeight: "200px",
    overflowY: "auto",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default Results;