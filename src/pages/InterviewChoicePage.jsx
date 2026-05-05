import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Info, Star, Bot, User, Zap, Brain, BarChart, Target } from "lucide-react";

export default function InterviewLandingPage() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
  };

  const cardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logoBox}>
  <img src="/icon-website.png" alt="logo" style={styles.logoImg} />
  <h2 style={styles.logo}>
    MockInterview<span style={{ color: "#3b82f6" }}>X</span>
  </h2>
</div>

        <div style={styles.navLinks}>
          <span style={styles.link} onClick={() => scrollTo("start")}><Home size={15}/>Start</span>
          <span style={styles.link} onClick={() => scrollTo("how")}><Info size={15}/>How</span>
          <span style={styles.link} onClick={() => scrollTo("why")}><Star size={15}/>Why</span>
          <span style={styles.link} onClick={() => navigate("/interview-type")}><Bot size={15}/>AI</span>
          <span style={styles.link} onClick={() => navigate("/human-interview")}><User size={15}/>Human</span>
        </div>
      </nav>

      {/* START */}
<section id="start" style={styles.sectionTop}>

  <div style={styles.startWrapper}>

    {/* LEFT SIDE TEXT */}
    <div style={styles.leftBox}>
      <h1 style={styles.mainTitle}>Start Practicing Today</h1>

      <p style={styles.mainSubtitle}>
        Choose your interview type and begin your journey to crack your dream job.
      </p>
    </div>

    {/* RIGHT SIDE CARDS */}
    <div style={styles.container}>

      <div style={styles.card} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
        <h2 style={styles.cardTitle}>AI Mock Interview</h2>

        <p style={styles.cardText}>
          Practice unlimited interviews with AI. Get instant feedback and improve faster.
        </p>

        <ul style={styles.list}>
          <li>✔ Instant feedback</li>
          <li>✔ Smart hints</li>
          <li>✔ Unlimited practice</li>
          <li>✔ Track progress</li>
        </ul>

        <button style={styles.aiBtn} onClick={() => navigate("/interview-type")}>
          Start AI Interview →
        </button>
      </div>

      <div style={styles.card} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
        <h2 style={styles.cardTitle}>Human Expert Interview</h2>

        <p style={styles.cardText}>
          Real interviews with experts to boost confidence and communication.
        </p>

        <ul style={styles.list}>
          <li>✔ Real interviewers</li>
          <li>✔ Detailed feedback</li>
          <li>✔ Industry-level prep</li>
          <li>✔ Improve soft skills</li>
        </ul>

        <button style={styles.humanBtn} onClick={() => navigate("/human-interview")}>
          Book Interview →
        </button>
      </div>

    </div>
  </div>
</section>
{/* HOW */}
<section id="how" style={styles.sectionAlt}>

  <h2 style={styles.sectionTitle}>
    How It Works
  </h2>

  <p style={styles.sectionSubtitle}>
    Simple 4-step process to improve your interview skills
  </p>

  <div style={styles.howGrid}>

    <div style={styles.howCard}>
      <div style={styles.stepIcon}>🎯</div>
      <h3>Choose</h3>
      <p>Select AI or Human interview type based on your goal.</p>
    </div>

    <div style={styles.howCard}>
      <div style={styles.stepIcon}>🚀</div>
      <h3>Start</h3>
      <p>Begin answering real interview questions instantly.</p>
    </div>

    <div style={styles.howCard}>
      <div style={styles.stepIcon}>💡</div>
      <h3>Feedback</h3>
      <p>Get smart insights and AI-powered improvement tips.</p>
    </div>

    <div style={styles.howCard}>
      <div style={styles.stepIcon}>📈</div>
      <h3>Improve</h3>
      <p>Practice regularly and track your growth over time.</p>
    </div>

  </div>
</section>
    <section id="why" style={styles.section}>

  <h2 style={styles.sectionTitle}>Why Choose Us?</h2>

  {/* GRID WRAPPER ADDED */}
  <div style={styles.whyGrid}>

    <div style={styles.featureCard}>
      <Zap size={30} color="#3b82f6" style={{ marginTop: "10px" }} />
      <h3>Fast Practice</h3>
    </div>

    <div style={styles.featureCard}>
      <Brain size={30}  color="#8b5cf6"  style={{ marginTop:"10px" }} />
      <h3>AI + Human</h3>
    </div>

    <div style={styles.featureCard}>
      <BarChart size={30} color="#06b6d4"style={{ marginTop: "10px"  }}  />
      <h3>Track Growth</h3>
    </div>

    <div style={styles.featureCard}>
      <Target size={30} color="#f59e0b"style={{ marginTop: "10px"  }}  />
      <h3>Job Ready</h3>
    </div>

    <div style={styles.featureCard}>
      <Bot size={30} color="#10b981" style={{ marginTop: "10px" }} />
      <h3>Smart AI Feedback</h3>
    </div>

    <div style={styles.featureCard}>
      <User size={30} color="#ef4444" style={{ marginTop: "10px"  }} />
      <h3>Real Interview Experience</h3>
    </div>

  </div>

</section>
    </div>
  );
}
const styles = {
  page: {
    fontFamily: "Inter, sans-serif",
    background: "#f8fafc",
  },

  navbar: {
    position: "sticky",
    top: 0,
    left: 0,
    background: "white",
    padding: "10px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    zIndex: 1000,
  },
whyGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "28px",
  maxWidth: "900px",
  margin: "0 auto",
},
  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  logoImg: {
    width: "40px",
  },

  logo: {
    fontWeight: "700",
    fontSize: "18px",
  },

  navLinks: {
    display: "flex",
    gap: "16px",
    fontSize: "13px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "8px",
    transition: "0.2s",
  },

  sectionTop: {
    padding: "60px 40px 100px",
  },

  mainTitle: {
    fontSize: "44px",
    fontWeight: "800",
  },

  mainSubtitle: {
    marginTop: "10px",
    marginBottom: "40px",
    color: "#475569",
  },

  startWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "40px",
    flexWrap: "wrap",
  },

  leftBox: {
    flex: 1,
    minWidth: "280px",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  card: {
    width: "340px",
    padding: "28px",
    borderRadius: "16px",
    background: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #f1f5f9",
    transition: "0.25s",
  },

  cardTitle: {
    fontSize: "22px",
  },

  cardText: {
    margin: "10px 0",
    color: "#475569",
  },

  list: {
    marginBottom: "15px",
    lineHeight: "1.8",
    listStyle: "none",
    paddingLeft: 0,
  },

  aiBtn: {
    background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    width: "100%",
    fontWeight: "600",
    cursor: "pointer",
  },

  humanBtn: {
    background: "linear-gradient(90deg,#8b5cf6,#6366f1)",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    width: "100%",
    fontWeight: "600",
    cursor: "pointer",
  },

  section: {
    padding: "100px 40px",
    textAlign: "center",
  },

  sectionAlt: {
    padding: "100px 40px",
    background: "#f8fafc",
    textAlign: "center",
  },

  sectionTitle: {
  fontSize: "36px",
  marginBottom: "50px",
  width: "100%",
  textAlign: "center",
},

  sectionSubtitle: {
    color: "#64748b",
    marginTop: "-30px",
    marginBottom: "40px",
    fontSize: "16px",
  },

  howGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
  },

  howCard: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "0.3s",
  },

  stepIcon: {
    fontSize: "26px",
    marginBottom: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
  },

featureCard: {
  background: "white",
  padding: "20px 22px",   // 👈 reduced padding
  borderRadius: "14px",

  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",

  gap: "8px",

  minHeight: "140px",     // 👈 smaller height
  transition: "0.3s",
},
};