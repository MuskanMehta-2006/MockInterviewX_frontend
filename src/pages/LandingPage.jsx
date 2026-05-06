import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  
  const isMobile = window.innerWidth < 768; 
   const styles = getStyles(isMobile);
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
<div style={styles.navbar}>

  {/* LEFT - LOGO */}
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <img
      src="/icon-website.png"
      alt="logo"
      style={{ width: "34px", height: "34px" }}
    />

    <span style={{ color: "#111", fontWeight: "800", fontSize: "18px" }}>
      MockInterview
    </span>

    <span style={{ color: "#3b82f6", fontWeight: "900", fontSize: "18px" }}>
      X
    </span>
  </div>

  {/* CENTER LINKS (desktop only) */}
  {!isMobile && (
    <div style={styles.navLinks}>
      <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Home
      </span>

      <span onClick={() => handleScroll(featuresRef)}>
        Features
      </span>

      <span onClick={() => handleScroll(faqRef)}>
        FAQs
      </span>

      <span
        style={{ color: "#6366f1", fontWeight: "600" }}
        onClick={() => {
          document.getElementById("hero-section")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        Earn 💰
      </span>
    </div>
  )}

  {/* RIGHT BUTTONS */}
  <div style={styles.navRight}>
    <div
      style={styles.earnBtn}
      onClick={() => {
        handleRoleSelect("INTERVIEWER");
        navigate("/login");
      }}
    >
      💰 Earn
    </div>

    <button
      style={styles.practiceBtn}
      onClick={() => handleRoleSelect("INTERVIEWEE")}
    >
      Practice
    </button>
  </div>

  {/* MOBILE LINKS (second row) */}
  {isMobile && (
    <div style={styles.navLinks}>
      <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Home
      </span>

      <span onClick={() => handleScroll(featuresRef)}>
        Features
      </span>

      <span onClick={() => handleScroll(faqRef)}>
        FAQs
      </span>

      <span
        style={{ color: "#6366f1", fontWeight: "600" }}
        onClick={() => {
          document.getElementById("hero-section")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        Earn 💰
      </span>
    </div>
  )}


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
const getStyles = (isMobile) => ({
  page: {
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
    minHeight: "100vh",
     overflowX: "hidden" // ⭐ FIX overflow
  },
navRight: {
  display: "flex",
  alignItems: "center",
  gap: "10px"
},




earnBtn: {
  padding: "6px 10px",
  background: "#eef2ff",
  color: "#4f46e5",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "13px"
},

practiceBtn: {
  padding: "8px 14px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
},
navbar: {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  display: "flex",
  flexDirection: isMobile ? "column" : "row", // ✅ FIX
  justifyContent: "space-between",
  alignItems: isMobile ? "center" : "center",
  padding: isMobile ? "10px 16px" : "12px 30px",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 2px 15px rgba(0,0,0,0.06)"
},

  /* NAV LINKS (add this in JSX manually) */
  navLinks: {
  display: "flex",
  gap: isMobile ? "12px" : "24px",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: isMobile ? "10px" : "0",
  fontSize: "14px",
  fontWeight: "500",
  color: "#444",
  cursor: "pointer"
},
  hero: {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "40px 16px" : "60px 40px",
    gap: "30px" // ✅ spacing fix
  },

  left: {
    flex: 1,
    minWidth: "280px",
    textAlign: isMobile ? "center" : "left" // ✅ mobile center
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },

  title: {
    fontSize: isMobile ? "28px" : "42px",
    fontWeight: "bold",
    color: "#0f172a",
    lineHeight: "1.2"
  },

  subtitle: {
    marginTop: "15px",
    fontSize: isMobile ? "14px" : "16px",
    color: "#475569",
    lineHeight: "1.6"
  },

  roleBox: {
    marginTop: "25px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: isMobile ? "center" : "flex-start"
  },

  btnPrimary: {
    padding: "12px 18px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: isMobile ? "14px" : "16px"
  },

  btnSecondary: {
    padding: "12px 18px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: isMobile ? "14px" : "16px"
  },

  image: {
    width: "100%",
    maxWidth: isMobile ? "300px" : "600px", // ✅ responsive image
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
  },

  features: {
  display: "grid",
 gridTemplateColumns: isMobile
  ? "1fr"
  : "repeat(4, 1fr)", // ⭐ FIXED layout
  justifyContent: "center", // ⭐ center align grid
  gap: isMobile ? "16px" : "20px",
  padding: isMobile ? "0 12px" : "0 60px", // ⭐ better alignment
  marginTop: "50px",
  maxWidth: "1200px",
  marginLeft: "auto",
  marginRight: "auto"
},

 card: {
  padding: "18px",
  background: "white",
  borderRadius: "14px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  width: "100%",
  maxWidth: "280px", // ✅ prevents stretch
  margin: "0 auto",  // ✅ center each card
},

  /* FAQ */
  faq: {
    marginTop: "70px",
    padding: isMobile ? "20px" : "30px"
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
    color: "#475569",
    fontSize: isMobile ? "14px" : "15px"
  }
});

export default LandingPage;