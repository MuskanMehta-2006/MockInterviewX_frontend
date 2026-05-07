import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { color } from "framer-motion";
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
const role = location.state?.role || "interviewee";
console.log("forgot passward"+role);

const sendOtp = async () => {
  try {
    setLoading(true);
    setCanResend(false);

    alert("Checking email...");

    // 🔥 SEND OTP WITH ROLE
    await axios.post("http://localhost:8080/api/auth/send-otp", {
  email,
  role,
  type: "FORGOT",
});

    alert("OTP sent successfully 📩");
    setStep(2);

    // ⏳ TIMER
    setTimer(30);
    let time = 30;

    const interval = setInterval(() => {
      time--;
      setTimer(time);

      if (time === 0) {
        clearInterval(interval);
        setCanResend(true);
      }
    }, 1000);

  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message;

    console.log("OTP ERROR:", error.response?.data);

    // 🚨 ROLE MISMATCH HANDLING
    if (
      msg === "EMAIL_ALREADY_REGISTERED_AS_OTHER_ROLE" ||
      msg === "This email is registered with another role"
    ) {
      alert(
        "This email is registered with another role.\nSorry ❌ Please login with correct role."
      );
      return;
    }

    if (msg === "This email is not registered") {
      alert("No account found with this email ❌ Please register first.");
      return;
    }

    alert(msg || "Failed to send OTP ❌");

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
  src={role === "interviewer" ? "/login-interviewer.png" : "/login.png"}
  alt="auth"
  style={{ height: "400px" }}
/>

        </div>
<div style={styles.right}>

  <div style={styles.title}>Reset Password 🔐</div>

  {/* STEP 1 - EMAIL */}
  {step === 1 && (
    <>
      <label style={{ fontSize: "13px", fontWeight: "600" , marginTop:20 }}>
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
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #5f5bff, #4f46e5)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "20px",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    transition: "0.2s ease",
  }}
  onMouseOver={(e) => {
    if (!loading) e.target.style.opacity = "0.9";
  }}
  onMouseOut={(e) => {
    if (!loading) e.target.style.opacity = "1";
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
      <label style={{ fontSize: "13px", fontWeight: "600", marginTop:20}}>
        OTP*
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

  {/* STEP 3 - NEW PASSWORD */}
  {step === 3 && (
    <>
      <label style={{ fontSize: "13px", fontWeight: "600" , marginTop:20}}>
        New Password*
      </label>

      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <label style={{ fontSize: "13px", fontWeight: "600" , marginTop:30 }}>
        Re-enter Password*
      </label>

      <input
        type="password"
        placeholder="Re-enter new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={styles.input}
      />

     <button
  style={{ ...styles.button, marginTop: "25px" }}
  onClick={async () => {
    // 1️⃣ validation
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    if (!password || !confirmPassword) {
      alert("Please fill both fields ❌");
      return;
    }

    try {
      // 2️⃣ API call
      await API.post("/auth/reset-password", {
        email,
        newPassword: password,
      });

      alert("Password reset successful 🚀");
      navigate("/login");

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Reset failed ❌");
    }
  }}
>
  Reset Password
</button>
    </>
  )}

</div>

</div>

      </div>
  );
}
