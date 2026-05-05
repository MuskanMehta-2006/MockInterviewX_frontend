import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API from "../services/api";
export default function HumanInterview() {
  const [interviewers, setInterviewers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    fetchInterviewers();
  }, []);

  const fetchInterviewers = async () => {
    try {
      const res = await API.get("/interviewer/all");
      setInterviewers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBook = async (intv, date, time) => {
    if (!date || !time) {
      alert("⚠️ Please select date and time slot");
      return;
    }

    try {
      const res = await API.post(
        "/booking/create-order",
        { amount: intv.price }
      );

      const { orderId, amount, key } = res.data;

      const options = {
        key: key,
        amount: amount * 100,
        currency: "INR",
        name: "MockInterviewX",
        description: "Interview Booking",
        order_id: orderId,

        handler: async function (response) {
         toast.success("Payment Successful! Please wait a minute...Don't go back");

          await API.post("/booking/confirm", {
            
            intervieweeEmail: JSON.parse(localStorage.getItem("user")).email,
            interviewerEmail: intv.email,
            interviewerId: intv.id,
            date: date,
            selectedSlot: time,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            status: "PAID",
            
          });

          toast.success("🎉 Interview Booked Successfully!\n📩 Please check your email for further details");
        },

        prefill: {
          email: JSON.parse(localStorage.getItem("user")).email,
        },

        theme: {
          color: "#4f46e5",
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  const styles = {
    container: {
      padding: "40px",
      minHeight: "100vh",
      fontFamily: "Inter",
      background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    },

    title: {
      fontSize: "30px",
      fontWeight: "800",
      marginBottom: "25px",
    },

   grid: {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)", // 🔥 fix 2 cards per row
  gap: "20px",
},

    card: {
      background: "white",
      borderRadius: "18px",
      padding: "18px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      border: "1px solid #f1f5f9",
    },

    name: { fontSize: "17px", fontWeight: "700" },

    badge: {
      background: "#eef2ff",
      color: "#4f46e5",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "11px",
      marginTop: "4px",
      display: "inline-block",
    },

    btn: {
      marginTop: "10px",
      padding: "10px",
      width: "100%",
      border: "none",
      borderRadius: "10px",
      background: "#4f46e5",
      color: "white",
      cursor: "pointer",
    },

    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    modalCard: {
      width: "600px",
      background: "white",
      borderRadius: "16px",
      padding: "20px",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    header: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
},

name: {
  fontSize: "22px",
  fontWeight: "700",
  margin: 0,
},

email: {
  fontSize: "13px",
  color: "#6b7280",
},

intro: {
  fontSize: "14px",
  color: "#374151",
  marginBottom: "10px",
},

bio: {
  fontSize: "13px",
  color: "#6b7280",
  marginBottom: "15px",
},

statsGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
  marginBottom: "15px",
},

statBox: {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  background: "#f9fafb",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "13px",
},
subtitle: {
  fontSize: "14px",
  color: "#374151",
  marginTop: "-5px",
  marginBottom: "4px",
},

subtitleLight: {
  fontSize: "13px",
  color: "#6b7280",
  marginBottom: "40px",
},
links: {
  display: "flex",
  gap: "10px",
  marginBottom: "15px",
},

linkBtn: {
  padding: "6px 12px",
  borderRadius: "6px",
  background: "#eef2ff",
  color: "#4f46e5",
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: "600",
},

closeBtn: {
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background: "#ef4444",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
},
  };

  return (
    <div style={styles.container}>
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
  <div style={styles.title}>Choose Your Interviewer</div>

  <p style={styles.subtitle}>
    Select a mentor based on your goals and experience level.
  </p>

  <p style={styles.subtitleLight}>
    Pick a convenient date & time slot and book your mock interview instantly.
  </p>
</div>

      <div style={styles.grid}>
        {interviewers.map((intv) => {
          const isSelected = selectedId === intv.id;

          return (
            <div key={intv.id} style={styles.card}>
              
              {/* HEADER */}
             <div style={{ display: "flex", justifyContent: "space-between" }}>
  
  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <img
      src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
      alt="profile"
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />

    <div>
      <div style={styles.name}>{intv.name}</div>
      <div style={styles.badge}>{intv.speciality}</div>
    </div>
  </div>

  <div
    style={{
      fontSize: "12px",
      color: "#6366f1",
      cursor: "pointer",
      fontWeight: "600",
    }}
    onClick={() => setSelected(intv)}
  >
    See Profile →
  </div>

</div>
              {/* BIO */}
              <p style={{ fontSize: "13px", marginTop: "6px", color: "#555" }}>
                {intv.intro}
              </p>

              {/* INFO */}
              <p style={{ fontSize: "12px", marginTop: "5px" }}>
                💼 {intv.experience} yrs • 💰 ₹{intv.price}/Interview • ⭐ {intv.rating || "0"}
              </p>

              <p style={{ fontSize: "12px", marginTop: "8px", color: "#6b7280" }}>
                Choose your availability as per interviewer's schedule
              </p>

              {/* SLOTS */}
              <div>
                {intv.availability?.slice(0, 2).map((slot, i) => (
                  <div key={i}>
                    <div style={{ fontSize: "11px" }}>
                      📅 {new Date(slot.date).toDateString()}
                    </div>

                    {slot.timeSlots?.slice(0, 2).map((time, j) => (
                      <span
                        key={j}
                        onClick={() => {
                          setSelectedId(intv.id);
                          setSelectedDate(slot.date);
                          setSelectedTime(time);
                        }}
                        style={{
                          padding: "5px 10px",
                          margin: "3px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          cursor: "pointer",
                          background:
                            isSelected &&
                            selectedDate === slot.date &&
                            selectedTime === time
                              ? "#4f46e5"
                              : "#eef2ff",
                          color:
                            isSelected &&
                            selectedDate === slot.date &&
                            selectedTime === time
                              ? "white"
                              : "#4f46e5",
                        }}
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              {/* ERROR */}
              {isSelected && (!selectedDate || !selectedTime) && (
                <p style={{ fontSize: "11px", color: "red" }}>
                  ⚠️ Please select your slot
                </p>
              )}

              <button
                style={{
                  ...styles.btn,
                  opacity: isSelected && selectedDate && selectedTime ? 1 : 0.6,
                }}
                onClick={() => handleBook(intv, selectedDate, selectedTime)}
              >
                Book Interview
              </button>
            </div>
          );
        })}
      </div>

    {/* MODAL */}
{selected && (
  <div style={styles.modal}>
    <div style={styles.modalCard}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.name}>{selected.name}</h2>
          <p style={styles.email}>{selected.email}</p>
        </div>

        <div style={styles.badge}>
          {selected.speciality}
        </div>
      </div>

      {/* INTRO */}
      <p style={styles.intro}>{selected.intro}</p>

      {/* BIO */}
      <p style={styles.bio}>{selected.bio}</p>

      {/* STATS GRID */}
      <div style={styles.statsGrid}>
        <div style={styles.statBox}>
          <span>💼</span>
          <div>
            <b>{selected.experience}</b>
            <p>Years</p>
          </div>
        </div>

        <div style={styles.statBox}>
          <span>💰</span>
          <div>
            <b>₹{selected.price}</b>
            <p>Per Session</p>
          </div>
        </div>

        <div style={styles.statBox}>
          <span>⭐</span>
          <div>
            <b>{selected.rating || "0.0"}</b>
            <p>Rating</p>
          </div>
        </div>

        <div style={styles.statBox}>
          <span>🗣️</span>
          <div>
            <b>{selected.languages}</b>
            <p>Languages</p>
          </div>
        </div>
      </div>

      {/* LINKS */}
      <div style={styles.links}>
        {selected.linkedin && (
          <a href={selected.linkedin} target="_blank" style={styles.linkBtn}>
            LinkedIn
          </a>
        )}

        {selected.github && (
          <a href={selected.github} target="_blank" style={styles.linkBtn}>
            GitHub
          </a>
        )}
      </div>

      {/* BUTTON */}
      <button
        style={styles.closeBtn}
        onClick={() => setSelected(null)}
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
  );
}