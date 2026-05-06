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

        {/* LEFT */}
        <div style={styles.left}>

          {/* BRAND */}
          <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    position: isMobile ? "static" : "absolute", // ⭐ FIX
    marginBottom: isMobile ? "10px" : "0",
    top: "15px",
    left: "20px",
  }}
>
            <img
              src="/icon-website.png"
              alt="logo"
              style={{ width: "24px", height: "24px" }}
            />

            <span style={{ fontWeight: "700", fontSize: "16px", color: "#111" }}>
              MockInterview
              <span style={{ color: "#4f46e5", fontWeight: "900" }}>X</span>
            </span>
          </div>

         <img
  src={role === "interviewer" ? "/login-interviewer.png" : "/login.png"}
  alt="auth"
 style={{
    width: "100%",
    maxWidth: isMobile ? "220px" : "400px", // ⭐ IMPORTANT
    height: "auto",
    objectFit: "contain"
  }}
/>

        </div>

  {/* RIGHT */}
<div style={styles.right}>
<div
  style={{
    position: "absolute",
    top: "15px",
    right: "25px",
    fontWeight: "700",
    fontSize: "14px",
    color: "#4f46e5"
  }}
>
  {role === "interviewer"
    ? "👨‍🏫 Interviewer Login"
    : "👨‍💻 Interviewee Login"}
</div>
 
<div
  style={{
    ...styles.googleBtn,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
  }}
  onClick={handleGoogleLogin}
>
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
    alt="google"
    style={{ width: "18px", height: "18px" }}
  />

  Continue with Google
</div>

  <div style={styles.divider}>OR</div>
{/* EMAIL */}
<div style={{ marginBottom: "12px" }}>
  <label
    style={{
      display: "block",
      fontSize: "13px",
      fontWeight: "600",
      marginBottom: "6px",
      color: "#111",
    }}
  >
    Email*
  </label>

  <input
    type="email"
    placeholder="Enter email"
    value={email}
  onChange={(e) => setEmail(e.target.value)}

    style={styles.input}
  />
</div>
{/* PASSWORD */}
<div style={{ marginBottom: "12px" }}>
  <label
    style={{
      display: "block",
      fontSize: "13px",
      fontWeight: "600",
      marginBottom: "6px",
      color: "#111",
    }}
  >
    Password*
  </label>

  <input
    type="password"
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={styles.input}
  />
</div>
  {/* FORGOT PASSWORD */}
  <div onClick={() => navigate("/forgot-password", { state: { role } })}
    style={{
      textAlign: "right",
      fontSize: "12px",
      color: "#4f46e5",
      cursor: "pointer",
      marginBottom: "10px",
      fontWeight: "500",
    }}
  >
    Forgot password?
  </div>

  {/* LOGIN BUTTON */}
  <button onClick={handleLogin} style={styles.button}>
  Login
</button>

  {/* REGISTER LINK */}
  <p style={{ marginTop: "12px", fontSize: "13px", color: "#64748b" }}>
    Don’t have an account?{" "}
    <span
      style={{
        color: "#4f46e5",
        fontWeight: "600",
        cursor: "pointer",
      }} onClick={() =>navigate("/register", { state: { role } })}
    >
      Register
    </span>
  </p>

</div>

      </div>
    </div>
  );
}