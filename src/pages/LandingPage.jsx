import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  // refs for scroll
  const featuresRef = useRef(null);
  const faqRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRoleSelect = (role) => {
  const normalizedRole = role.toLowerCase(); // 🔥 fix

  localStorage.setItem("role", normalizedRole);

  navigate("/login", {
    state: { role: normalizedRole }
  });
};

 const faqs = [
  {
    q: "How does this platform work?",
    a: "Choose your path (AI or Expert), select your domain like DSA, System Design, AI/ML or Web Development, and start practicing real interview sessions instantly."
  },
  {
    q: "What type of interviews can I practice?",
    a: "You can practice DSA coding rounds, System Design interviews, HR & behavioral rounds, Fundamentals, AI/ML, and Web Development interviews."
  },
  {
    q: "Is AI interview practice free?",
    a: "Yes, AI-powered mock interviews are completely free and available anytime with instant feedback."
  },
  {
    q: "Are expert or mentor interviews paid?",
    a: "Yes, expert-led mock interviews are paid but offered at very affordable prices to help you get real interview experience."
  },
  {
    q: "How do I join a session?",
    a: "Simply go to your dashboard, choose AI or Expert interview mode, select a topic, and join an instant or scheduled session."
  },
  {
    q: "What topics are covered?",
    a: "We cover DSA, System Design, Core Fundamentals (OS, DBMS, CN), AI/ML, and Full Stack Web Development."
  },
  {
    q: "Do I get feedback after interviews?",
    a: "Yes, AI interviews provide instant feedback, and expert sessions include detailed personalized review and improvement tips."
  }
];

 return (
  <div style={styles.page}>

    {/* NAVBAR */}
    <div
      style={{
        ...styles.navbar,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
      }}
    >

      {/* LEFT - LOGO */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/icon-website.png"
          alt="logo"
          style={{ width: "34px", height: "34px", marginRight: "8px" }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "#111",
              fontWeight: "800",
              fontSize: "18px",
              letterSpacing: "0.5px",
            }}
          >
            MockInterview
          </span>

          <span
            style={{
              color: "#3b82f6",
              fontWeight: "900",
              fontSize: "18px",
            }}
          >X
          </span>
        </div>
      </div>

      {/* CENTER LINKS */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          fontSize: "14px",
          fontWeight: "500",
          color: "#444",
        }}
      >
        <span style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Home
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => handleScroll(featuresRef)}>
          Features
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => handleScroll(faqRef)}>
          FAQs
        </span>

        

        <span
  style={{ color: "#6366f1", fontWeight: "600", cursor: "pointer" }}
  onClick={() => {
    document.getElementById("hero-section")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  Take Interview & Earn 💰
</span>
      </div>

      {/* RIGHT BUTTONS */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        <div
          style={{
            padding: "6px 12px",
            background: "#eef2ff",
            color: "#4f46e5",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px",
          }}
          onClick={() => {
            handleRoleSelect("INTERVIEWER");
            navigate("/login");
          }}
        >
          💰 Earn Money
        </div>

        <button
          style={{
            padding: "8px 16px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
          onClick={() => handleRoleSelect("INTERVIEWEE")}
        >
          Practice
        </button>

      </div>

    </div>
{/* HERO SECTION */}
<div style={styles.hero}>
  <div style={styles.left}>
    <h1 style={styles.title}>
      Get Placed in Top Tech Companies 
    </h1>

    <p style={styles.subtitle}>
      Practice real interview scenarios with AI, peers, and expert mentors.
      Strengthen your DSA, System Design, Fundamentals, AI/ML, and Web Development skills
      and boost your chances of landing your dream job.
    </p>

    <div style={styles.roleBox}>
      <button
        style={styles.btnPrimary}
        onClick={() => handleRoleSelect("INTERVIEWEE")}
      >
        Start Free AI Practice
      </button>

      <button
        style={styles.btnSecondary}
        onClick={() =>  handleRoleSelect("INTERVIEWEE")}
      >
        Practice with Experts
      </button>
    </div>
  </div>

  <div style={styles.right}>
    <img
      src="/ai-interview.png"
      alt="AI Interview"
      style={styles.image}
    />
  </div>
</div>

{/* FEATURES */}
<div ref={featuresRef} style={styles.features}>
  
  <div style={styles.card}>
    🤖 Free AI Mock Interviews  
    <p>Practice unlimited AI-driven interviews anytime with instant feedback.</p>
  </div>

  <div style={styles.card}>
    👥 Peer Mock Interviews with Experts  
    <p>Practice real interview sessions with industry experts at very affordable price.</p>
  </div>

  <div style={styles.card}>
    💻 DSA Preparation  
    <p>Structured problems from basics to advanced with topic-wise practice.</p>
  </div>

  <div style={styles.card}>
    🏗️ System Design  
    <p>Learn scalable architecture with real interview-based system design questions.</p>
  </div>

  <div style={styles.card}>
    📘 Fundamentals Revision  
    <p>Core CS concepts like OS, DBMS, CN explained in interview-focused way.</p>
  </div>

  <div style={styles.card}>
    🤖 AI/ML Track  
    <p>Prepare for AI/ML interviews with curated questions and concepts.</p>
  </div>

  {/* NEW 1 */}
  <div style={styles.card}>
    📊 Real-Time AI Feedback  
    <p>Get instant analysis on your answers, communication, and technical accuracy.</p>
  </div>

  {/* NEW 2 */}
  <div style={styles.card}>
    🎯 Interview Performance Analytics  
    <p>Track your growth with detailed reports, scores, and improvement insights.</p>
  </div>

</div>
{/* HERO SECTION */}
<div style={styles.hero} id="hero-section"> 

  {/* LEFT CONTENT */}
  <div style={styles.left}>
<h1 style={styles.title}>
  Take Interviews → Build Expertise → Earn 💰
</h1>

    <p style={styles.subtitle}>
      Practice real interview scenarios with AI, peers, and expert mentors.  
      Strengthen your DSA, System Design, Fundamentals, AI/ML, and Web Development skills —  
      and grow into an expert who earns by conducting real interviews.
    </p>

    <div style={styles.roleBox}>

      <button
        style={styles.btnPrimary}
        onClick={() => handleRoleSelect("INTERVIEWER")}
      >
        Become Expert & Start Earning 🚀
      </button>

    </div>

  </div>

  {/* RIGHT IMAGE */}
  <div style={styles.right}>
    <img
      src="/humaninterview.png"
      alt="Online Interview"
      style={{
        width: "90%",
        maxWidth: "1000px",
        borderRadius: "16px",
        objectFit: "cover",
      }}
    />
  </div>

</div>
      {/* FAQ */}
      <div ref={faqRef} style={styles.faq}>
        <h2>Frequently Asked Questions</h2>

        {faqs.map((item, i) => (
          <details key={i} style={styles.faqItem}>
            <summary style={styles.faqQ}>{item.q}</summary>
            <p style={styles.faqA}>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

const styles = {

  page: {
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    minHeight: "100vh"
  },
logoIcon: {
  width: "50px",
  height: "50px",
  objectFit: "contain"
},
  navbar: {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 30px",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 2px 15px rgba(0,0,0,0.06)"
},

navLinks: {
  display: "flex",
  gap: "22px",
  fontWeight: "500",
  color: "#334155",
  cursor: "pointer"
},
navLeft: {
  display: "flex",
  alignItems: "center",
  gap: "12px"
},
navRight: {
  display: "flex",
  alignItems: "center",
  gap: "10px"
},
earnBadge: {
  fontSize: "11px",
  padding: "6px 10px",
  background: "linear-gradient(135deg, #f59e0b, #f97316)",
  color: "white",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "600",
  boxShadow: "0 6px 15px rgba(245, 158, 11, 0.3)",
  transition: "0.2s ease",
},

earnBadgeHover: {
  transform: "scale(1.05)"
},
navBtn: {
  padding: "8px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "white",
  cursor: "pointer"
},

navCta: {
  padding: "8px 14px",
  border: "none",
  borderRadius: "8px",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer"
},

navTag: {
  fontSize: "11px",
  color: "#64748b",
  maxWidth: "170px",
  textAlign: "right",
  lineHeight: "1.2"
},
  /* HERO */
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "60px 40px"
  },

  left: {
    flex: 1,
    minWidth: "300px"
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },

  title: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#0f172a"
  },

  subtitle: {
    marginTop: "15px",
    fontSize: "16px",
    color: "#475569",
    lineHeight: "1.6"
  },

  roleBox: {
    marginTop: "25px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  },

  btnPrimary: {
    padding: "12px 18px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  btnSecondary: {
    padding: "12px 18px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },

  image: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
  },

  /* FEATURES */
  features: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "50px",
  padding: "0 40px"
},
  card: {
    padding: "20px",
    background: "white",
    borderRadius: "14px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    fontWeight: "500"
  },

  /* FAQ */
  faq: {
    marginTop: "70px",
    padding: "30px"
  },

  faqItem: {
    background: "white",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  },

  faqQ: {
    fontWeight: "bold",
    cursor: "pointer"
  },

  faqA: {
    marginTop: "8px",
    color: "#475569"
  }
};

export default LandingPage;