import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import API from "../services/api";

export default function InterviewerDashboard() {
  const navigate = useNavigate();
  

  const [bookings, setBookings] = useState([]);
const location = useLocation();


const email = location.state?.email || localStorage.getItem("email") || "";
console.log("email is"+ email);
const [profile, setProfile] = useState({
  name: "",
  email: email,
  bio: "",
  rating: 0,
});

console.log("profile.email is"+profile.email);
 useEffect(() => {
    if (email) {
      fetchBookings();
    }
  }, [email]);

const fetchBookings = async () => {
    try {
      const res = await API.get(
        `/booking/interviewer?email=${email}`
      );
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await API.get(
        `/interviewer/by-email?email=${email}`
      );
      console.log("res.data.email is:"+res.data.email);
      setProfile((prev) => ({
  ...prev,
  name: res.data.name ?? prev.name,
  bio: res.data.bio ?? prev.bio,
  rating: res.data.rating ?? prev.rating ?? 0,
}));
    } catch (err) {
      console.log(err);
    }
  };

  if (email) fetchProfile();
}, [email]);
  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
      fontFamily: "Inter, sans-serif",
      padding: "30px",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
       marginBottom: "20px",
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(10px)",
      padding: "22px",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    },

    left: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },

    avatar: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/847/847969.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    },

    name: { fontSize: "22px", fontWeight: "800" },
    email: { fontSize: "13px", color: "#6b7280" },

    roleBadge: {
      display: "inline-block",
      marginTop: "5px",
      fontSize: "11px",
      background: "#4f46e5",
      color: "white",
      padding: "4px 10px",
      borderRadius: "20px",
    },

    rating: {
      marginLeft: "8px",
      fontSize: "11px",
      background: "#facc15",
      padding: "3px 8px",
      borderRadius: "20px",
      fontWeight: "600",
    },

    editBtn: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      border: "none",
      background: "#4f46e5",
      color: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      boxShadow: "0 8px 20px rgba(79,70,229,0.3)",
    },

    statsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "15px",
      marginTop: "25px",
    },

    statBox: {
      background: "white",
      padding: "18px",
      borderRadius: "16px",
      textAlign: "center",
      boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
    },

    statNumber: { fontSize: "22px", fontWeight: "800", color: "#4f46e5" },
    statLabel: { fontSize: "12px", color: "#6b7280" },

    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginTop: "25px",
    },

   card: {
  background: "rgba(255,255,255,0.9)",
  borderRadius: "16px",
  padding: "15px",
  marginBottom: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  border: "1px solid rgba(0,0,0,0.05)",
},

row: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: "600",
},

small: {
  fontSize: "12px",
  color: "#666",
  marginTop: "5px",
},

    title: { fontSize: "16px", fontWeight: "800", marginBottom: "15px" },

    item: {
      padding: "10px",
      borderBottom: "1px solid #f1f1f1",
      fontSize: "14px",
      display: "flex",
      justifyContent: "space-between",
    },

    badgeUp: {
      background: "#dbeafe",
      color: "#1d4ed8",
      padding: "3px 8px",
      borderRadius: "10px",
      fontSize: "11px",
    },

    badgeDone: {
      background: "#dcfce7",
      color: "#166534",
      padding: "3px 8px",
      borderRadius: "10px",
      fontSize: "11px",
    },
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.left}>
          <div style={styles.avatar}></div>

          <div>
            <div style={styles.name}>
              {profile.name}
              <span style={styles.rating}>⭐ {profile.rating}</span>
            </div>

            <div style={styles.email}>{profile.email}</div>

           <div style={{
  marginTop: "6px",
  fontSize: "12px",
  color: "#6b7280",
  maxWidth: "400px",
}}>
  {profile.bio}
</div>
          </div>
        </div>

        {/* NAVIGATE TO NEW PAGE */}
        <button
          style={styles.editBtn}
         onClick={() =>
  navigate("/interviewer-profile", {
    state: {
      email: profile.email || localStorage.getItem("email"),
    },
  })
}
        >
          ✏️
          Edit Profile
        </button>
      </div>

      <div style={{
  background: "white",
  padding: "12px 18px",
  borderRadius: "12px",
  marginBottom: "15px",
  fontWeight: "700",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
}}>
  📅 Total Interviews: {bookings.length}
</div>

      {/* LIST */}
      {bookings.length === 0 ? (
        <p style={{ color: "#888" }}>No interviews yet</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} style={styles.card}>

            <div style={styles.row}>
              <b>{b.intervieweeEmail}</b>
              <span>{b.date}</span>
            </div>

            <div style={styles.small}>
              ⏰ Slot: {b.selectedSlot}
            </div>

            <span style={{
  padding: "3px 10px",
  borderRadius: "20px",
  fontSize: "11px",
  background: b.status === "CONFIRMED" ? "#dcfce7" : "#dbeafe",
  color: b.status === "CONFIRMED" ? "#166534" : "#1d4ed8",
}}>
  {b.status}
</span>
            {b.meetLink && (
  <a
    href={b.meetLink}
    target="_blank"
    style={{
      display: "inline-block",
      marginTop: "8px",
      fontSize: "12px",
      color: "white",
      background: "#4f46e5",
      padding: "6px 10px",
      borderRadius: "8px",
      textDecoration: "none",
    }}
  >
    🔗 Join Meet
  </a>
)}

          </div>
        ))
      )}

    </div>
  );
}