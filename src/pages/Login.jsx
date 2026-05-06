import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const isMobile = window.innerWidth < 768;
  const location = useLocation();
  const role =
  location.state?.role ||
  localStorage.getItem("role") ||
  "interviewee";
  console.log(role);
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
      role,
    });

    console.log("BACKEND RESPONSE:", res.data);

    const loggedUser = res.data?.user || { email };

    const message = res.data?.message || "";

    // 🔥 STOP navigation here
    if (message.toLowerCase().includes("another role")) {
      alert("⚠️ This email is registered for another role");
      return; // ❗ IMPORTANT
    }

    // ✅ save user
    localStorage.setItem("user", JSON.stringify(loggedUser));

    // ✅ navigation
    if (role === "interviewee") {
      navigate("/interview-choice");
    } else {
      navigate("/interviewer-dashboard", {
        state: {
          email: loggedUser.email,
          name: loggedUser.name || "",
        },
      });
    }

  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "";

    console.log("FULL ERROR:", msg);

    // 🔥 STOP here also
    if (msg.toLowerCase().includes("already registered")) {
      alert("⚠️ This email is registered for another role");
      return; // ❗ IMPORTANT
    }

    alert(msg || "Login failed");
  }
};const handleGoogleLogin = async () => {
  let user = null;

  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;

    console.log("Google User:", user);

    const res = await API.post("/auth/google-login", {
      email: user.email,
      name: user.displayName,
      role,
    });

    console.log("BACKEND RESPONSE:", res.data);

    const message = res.data?.message || "";

    // 🔥 STOP navigation if role mismatch
    if (message.toLowerCase().includes("another role")) {
      alert("⚠️ This email is registered for another role");
      return; // ❗ IMPORTANT
    }

    // ✅ Normal login
    localStorage.setItem("user", JSON.stringify({
      email: user.email,
      name: user.displayName,
    }));

    if (role === "interviewee") {
      navigate("/interview-choice");
    } else {
      navigate("/interviewer-dashboard", {
        state: {
          email: user.email,
          name: user.displayName,
        },
      });
    }

  } catch (error) {
    const msg = error.response?.data?.message || "";

    console.log("FULL ERROR:", msg);

    // 🔥 STOP here also
    if (msg.toLowerCase().includes("already registered")) {
      alert("⚠️ This email is registered for another role");
      return; // ❗ IMPORTANT
    }

    if (error.code === "auth/popup-blocked") {
      alert("⚠️ Popup blocked! Please allow popups and try again.");
    } else {
      alert(msg || "Google login failed");
    }
  }
};

  const getStyles = (isMobile) => ({
    container: {
  minHeight: "100vh", // ⭐ change
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6fb",
  fontFamily: "Inter, sans-serif",
  padding: isMobile ? "10px" : "20px",
  boxSizing: "border-box",
},

   card: {
  width: isMobile ? "100%" : "900px",
  flexDirection: isMobile ? "column" : "row",
  minHeight: isMobile ? "auto" : "520px",
  display: "flex",
  borderRadius: "16px",
  overflow: "hidden",
  background: "white",
  boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
  gap: isMobile ? "10px" : "0", // ⭐ spacing fix
},

    left: {
  width: isMobile ? "100%" : "50%",
  height: isMobile ? "auto" : "auto", // ❌ remove fixed 200px
  minHeight: isMobile ? "180px" : "auto", // ⭐ controlled height
  background: "#eef2ff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: isMobile ? "10px" : "20px",
  position: "relative",
},
   right: {
  width: isMobile ? "100%" : "50%",
  padding: isMobile ? "20px" : "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
},

    title: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "15px",
    },

   input: {
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  width: "100%",
  outline: "none",
  fontSize: "14px",
  background: "#f9fafb",
  color: "#111",
},

inputFocus: {
  border: "1px solid #4f46e5",
  background: "white",
  boxShadow: "0 0 0 3px rgba(79,70,229,0.1)",
},

    button: {
      padding: "11px",
      borderRadius: "8px",
      border: "none",
      background: "#4f46e5",
      color: "white",
      cursor: "pointer",
      fontWeight: "600",
    },

    googleBtn: {
      padding: "11px",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      marginBottom: "12px",
      textAlign: "center",
      cursor: "pointer",
    },

    divider: {
      textAlign: "center",
      margin: "8px 0",
      fontSize: "12px",
      color: "#64748b",
    },
  });
   const styles = getStyles(isMobile);


  return (
    <div style={styles.container}>
      <div style={styles.card}>

      {isMobile ? (

  // ================= MOBILE =================
  <div style={{ width: "100%" }}>

    {/* TOP BAR */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <img src="/icon-website.png" style={{ width: "22px" }} />
        <span style={{ fontWeight: "700" }}>
          MockInterview<span style={{ color: "#4f46e5" }}>X</span>
        </span>
      </div>

      <div style={{ color: "#4f46e5", fontWeight: "600" }}>
        {role === "interviewer" ? "👨‍🏫" : "👨‍💻"}
      </div>
    </div>

    {/* IMAGE */}
    <div style={{ textAlign: "center", marginBottom: "15px" }}>
      <img
        src={role === "interviewer" ? "/login-interviewer.png" : "/login.png"}
        style={{
          width: "100%",
          maxWidth: "260px",
          height: "auto"
        }}
      />
    </div>

    {/* FORM CARD */}
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
    }}>

      {/* GOOGLE */}
      <div
        onClick={handleGoogleLogin}
        style={{
          border: "1px solid #e2e8f0",
          padding: "12px",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "10px",
          cursor: "pointer"
        }}
      >
        Continue with Google
      </div>

      <div style={{ textAlign: "center", margin: "10px 0" }}>OR</div>

      {/* EMAIL */}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      />

      {/* FORGOT */}
      <div
        onClick={() => navigate("/forgot-password", { state: { role } })}
        style={{
          textAlign: "right",
          fontSize: "12px",
          color: "#4f46e5",
          marginBottom: "15px",
          cursor: "pointer"
        }}
      >
        Forgot password?
      </div>

      {/* LOGIN */}
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px"
        }}
      >
        Login
      </button>

      {/* REGISTER */}
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register", { state: { role } })}
          style={{ color: "#4f46e5", cursor: "pointer" }}
        >
          Register
        </span>
      </p>

    </div>
  </div>

) : (

  // ================= DESKTOP (UNCHANGED) =================
  <>
    {/* LEFT */}
    <div style={styles.left}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        position: "absolute",
        top: "15px",
        left: "20px",
      }}>
        <img src="/icon-website.png" style={{ width: "24px" }} />
        <span style={{ fontWeight: "700" }}>
          MockInterview<span style={{ color: "#4f46e5" }}>X</span>
        </span>
      </div>

      <img
        src={role === "interviewer" ? "/login-interviewer.png" : "/login.png"}
        style={{ maxWidth: "400px" }}
      />
    </div>

    {/* RIGHT */}
    <div style={styles.right}>
      <div style={{
        position: "absolute",
        top: "15px",
        right: "25px",
        fontWeight: "700",
        color: "#4f46e5"
      }}>
        {role === "interviewer"
          ? "👨‍🏫 Interviewer Login"
          : "👨‍💻 Interviewee Login"}
      </div>

      <div
        style={styles.googleBtn}
        onClick={handleGoogleLogin}
      >
        Continue with Google
      </div>

      <div style={styles.divider}>OR</div>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <div
        onClick={() => navigate("/forgot-password", { state: { role } })}
        style={{
          textAlign: "right",
          fontSize: "12px",
          color: "#4f46e5",
          marginBottom: "10px",
          cursor: "pointer"
        }}
      >
        Forgot password?
      </div>

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  </>
)}

      </div>
    </div>
  );
}