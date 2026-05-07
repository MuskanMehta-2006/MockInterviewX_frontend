import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import API from "../services/api";

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
const [canResend, setCanResend] = useState(false);
    const [otp, setOtp] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

const role =
  location.state?.role ||
  localStorage.getItem("role") ||
  "interviewee";
const sendOtp = async () => {
  try {
    setLoading(true);
    setCanResend(false);

    console.log("Sending OTP for:", email, role);

    // 🔥 API CALL WITH ROLE
    await axios.post("http://localhost:8080/auth/send-otp", {
      email,
      role, // ✔️ IMPORTANT
      type: "REGISTER",
    });

    alert("OTP sent successfully 📩");
    setStep(2);

    // ⏳ TIMER START
    let time = 30;
    setTimer(time);

    const interval = setInterval(() => {
      time--;
      setTimer(time);

      if (time === 0) {
        clearInterval(interval);
        setCanResend(true);
      }
    }, 1000);

  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("DATA:", error.response?.data);

    const data = error.response?.data;

    let msg = "Something went wrong ❌";

    // 🔥 SAFE MESSAGE EXTRACTION
    if (typeof data === "string") {
      msg = data;
    } 
    else if (data?.message) {
      msg = data.message;
    } 
    else if (data?.error) {
      msg = data.error;
    } 
    else if (typeof data === "object") {
      msg = data.message || JSON.stringify(data);
    }

    // 🚨 ROLE MISMATCH HANDLING
    if (
      msg.toLowerCase().includes("another role") ||
      msg.toLowerCase().includes("different role")
    ) {
      msg =
        "Sorry ❌ This email is registered for another role.\nPlease login with correct role.";
    }

    // 🚨 ALREADY REGISTERED HANDLING
    if (msg.toLowerCase().includes("already")) {
      msg = "You are already registered! Please login ❌";
    }

    alert(msg);

  } finally {
    setLoading(false);
  }
};
const verifyOtp = async () => {
  try {
    await API.post("/auth/verify-otp", {
      email,
      otp,
    });

    alert("OTP verified ✅");
    setStep(3);

  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Invalid OTP ❌");
  }
};
const resetPassword = async () => {
  try {
    await API.post("/auth/reset-password", {
      email,
      newPassword:password
    });

    alert("Password reset successful 🚀");
    navigate("/login");

  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Reset failed ❌");
  }
};

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log(res.data);

    navigate("/interview-type");

  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Invalid Credentials ❌");
  }
};
  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log("Google User:", user);

    // 🔥 (IMPORTANT) send user to backend
    await API.post("/auth/google-login", {
      email: user.email,
      name: user.displayName,
    });

    // 🔥 store locally (session)
    localStorage.setItem("user", JSON.stringify({
      email: user.email,
      name: user.displayName,
    }));

    // 🔥 navigate next page
    navigate("/interview-type");

  } catch (error) {
    console.log("Google Login Error:", error.message);
  }
};
  
  const [step, setStep] = useState(1);

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6fb",
      fontFamily: "Inter, sans-serif",
      padding: "20px",
      boxSizing: "border-box",
    },

    card: {
      width: "900px",
      minHeight: "520px",
      display: "flex",
      borderRadius: "16px",
      overflow: "hidden",
      background: "white",
      boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
    },

    left: {
      width: "50%",
      position: "relative",
      background: "#eef2ff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },

    right: {
      width: "50%",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
  };

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
              position: "absolute",
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

          {/* IMAGE (ONLY ONCE) */}
         <img
  src={
    role === "interviewer"
      ? "/login-interviewer.png"
      : "/login.png"
  }
  alt="auth"
  style={{ height: "400px" }}
/>
        </div>


  

<div style={styles.right}>

  <div style={styles.title}>Create Account </div>

  {/* STEP 1 - EMAIL */}
  {step === 1 && (
    <>
      <label style={{ fontSize: "13px", fontWeight: "600", marginTop: 20 }}>
        Email*
      </label>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <button
        onClick={sendOtp}
        disabled={loading || !email}
        style={{
          ...styles.button,
          marginTop: "15px",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading
          ? "Sending OTP..."
          : timer > 0
          ? `Wait ${timer}s`
          : "Send OTP"}
      </button>

      {canResend && (
        <button
          onClick={sendOtp}
          style={{
            marginTop: "10px",
            background: "#f1f5f9",
            padding: "8px",
            borderRadius: "6px",
            cursor: "pointer",
            border: "none",
          }}
        >
          Resend OTP
        </button>
      )}
    </>
  )}

  {/* STEP 2 - OTP */}
  {step === 2 && (
    <>
      <label style={{ fontSize: "13px", fontWeight: "600", marginTop: 20 }}>
        Verify OTP*
      </label>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={styles.input}
      />

      <button
        style={{ ...styles.button, marginTop: "20px" }}
        onClick={verifyOtp}
      >
        Verify OTP
      </button>
    </>
  )}

  {/* STEP 3 - PASSWORD */}
  {step === 3 && (
    <>
      <label style={{ fontSize: "13px", fontWeight: "600", marginTop: 20 }}>
        Password*
      </label>

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <label style={{ fontSize: "13px", fontWeight: "600", marginTop: 20 }}>
        Confirm Password*
      </label>

      <input
        type="password"
        placeholder="Re-enter password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={styles.input}
      />

      <button
        style={{ ...styles.button, marginTop: "25px" }}
        onClick={async () => {
          if (password !== confirmPassword) {
            alert("Passwords do not match ❌");
            return;
          }

          if (!password || !confirmPassword) {
            alert("Please fill all fields ❌");
            return;
          }

          try {
            await axios.post("http://localhost:8080/api/auth/register", {
              email,
              password,
            });

            alert("Registration successful 🚀");
            navigate("/login");

          } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Registration failed ❌");
          }
        }}
      >
        Register
      </button>
    </>
  )}

</div>

</div>

      </div>
  );
}
