import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";


export default function InterviewerProfile() {
    const location = useLocation();

  const email =
    location.state?.email ||
    localStorage.getItem("email") ||
    "";

  console.log(email);

  const [form, setForm] = useState({
    name: "",
    email: email,   
    password: "",
    intro: "",
    speciality: "",
    experience: "",
    price: "",
    linkedin: "",
    github: "",
    bio: "",
    languages: "",
  });

  const [selectedDates, setSelectedDates] = useState([]);
  const [availability, setAvailability] = useState({});

  // ⏰ 40 min slots
  const generateSlots = () => {
    const slots = [];
    let h = 9, m = 0;
    const endH = 22;

    while (h < endH) {
      let nh = h;
      let nm = m + 40;

      if (nm >= 60) {
        nh += 1;
        nm -= 60;
      }

      const start = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const end = `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;

      slots.push(`${start} - ${end}`);

      h = nh;
      m = nm;
    }

    return slots;
  };

  const timeSlots = generateSlots();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleDate = (date) => {
    setSelectedDates((prev) =>
      prev.includes(date)
        ? prev.filter((d) => d !== date)
        : [...prev, date]
    );
  };

  const toggleSlot = (date, slot) => {
    setAvailability((prev) => {
      const existing = prev[date] || [];
      const updated = existing.includes(slot)
        ? existing.filter((s) => s !== slot)
        : [...existing, slot];

      return { ...prev, [date]: updated };
    });
  };

 const saveProfile = async () => {
  if (!form.name.trim()) return alert("Name is required");
  if (!form.password.trim()) return alert("Password is required");
  if (!form.speciality.trim()) return alert("Speciality is required");
  if (!form.bio.trim()) return alert("Bio is required");
  if (!form.intro.trim()) return alert("Intro is required");
  if (!form.experience) return alert("Experience is required");
  if (!form.price) return alert("Price is required");
  if (!form.languages.trim()) return alert("Languages is required");

  const payload = {
    name: form.name || "",
    email: email,   // 🔥 IMPORTANT FIX
    password: form.password || "",
    intro: form.intro || "",
    speciality: form.speciality || "",
    experience: form.experience ? parseInt(form.experience) : 0,
    price: form.price ? parseInt(form.price) : 0,
    linkedin: form.linkedin || "",
    github: form.github || "",
    bio: form.bio || "",
    languages: form.languages || "",
    availability: Object.keys(availability).map((date) => ({
      date,
      timeSlots: availability[date] || [],
    })),
  };

  try {
    const res = await axios.put(
      `http://localhost:8080/api/interviewer`, // 🔥 NO userId
      payload
    );

    console.log("SUCCESS:", res.data);
    alert("Profile Updated 🚀");
  } catch (err) {
    console.log(err);
    alert("Update Failed ❌");
  }
};
  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>👨‍💼 Interviewer Profile Setup</h2>
        <p style={styles.sub}>Fill details + select availability</p>

        {/* FORM */}
        <div style={styles.grid}>
          <input name="name" placeholder="Name" onChange={handleChange} style={styles.input} />
        <input
  name="email"
  value={form.email}
  disabled
  style={{
    ...styles.input,
    background: "#f3f4f6",
    cursor: "not-allowed",
    color: "#6b7280",
  }}
/>
          <input name="password" placeholder="Password" onChange={handleChange} style={styles.input} />

          <input name="speciality" placeholder="Speciality" onChange={handleChange} style={styles.input} />
          

          <input name="bio" placeholder="Bio" onChange={handleChange} style={styles.fullInput} />
          <textarea
    name="intro"
    placeholder="Intro"
    onChange={handleChange}
    style={styles.introInput}
  />
          <input name="experience" placeholder="Experience" onChange={handleChange} style={styles.input} />
          <input name="price" placeholder="Price Per Interview" onChange={handleChange} style={styles.input} />

          <input name="languages" placeholder="Languages you expertise" onChange={handleChange} style={styles.input} />
          <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} style={styles.input} />
          <input name="github" placeholder="GitHub URL" onChange={handleChange} style={styles.input} />

        
        </div>

        {/* DATE */}
        <h3 style={styles.sectionTitle}>📅 Select Dates</h3>

        <input
          type="date"
          style={styles.dateInput}
          onChange={(e) => toggleDate(e.target.value)}
        />

        {/* SELECTED DATES */}
        <div style={styles.box}>
          {selectedDates.map((d) => (
            <span key={d} style={styles.chip}>
              📅 {d}
              <span onClick={() => toggleDate(d)} style={styles.remove}>×</span>
            </span>
          ))}
        </div>

        {/* TIME SLOTS PER DATE */}
        {selectedDates.map((date) => (
          <div key={date} style={styles.dateBlock}>
            <h4>📅 {date}</h4>

            <div style={styles.slotGrid}>
              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  onClick={() => toggleSlot(date, slot)}
                  style={{
                    ...styles.slot,
                    ...(availability[date]?.includes(slot)
                      ? styles.selectedSlot
                      : {}),
                  }}
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* FINAL SHOW */}
        <div style={styles.finalBox}>
          <h4>📦 Your Availability</h4>

          {Object.keys(availability).map((date) => (
            <div key={date}>
              <b>{date}</b>
              <div>
                {(availability[date] || []).map((t) => (
                  <span key={t} style={styles.finalChip}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SAVE */}
        <button style={styles.saveBtn} onClick={saveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #f0f9ff)",
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: "Inter, sans-serif",
  },

  card: {
  width: "980px",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
  borderRadius: "24px",
  padding: "30px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.08)",
  border: "1px solid #eef2ff",
  boxSizing: "border-box",
},

  title: {
    fontSize: "28px",
    fontWeight: "900",
    color: "#111827",
    marginBottom: "5px",
  },
introInput: {
  width: "100%",
  minHeight: "120px",
 padding: "5px 0px 0px 15px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  outline: "none",
  fontSize: "14px",
  transition: "0.2s",
  background: "#fff",
  resize: "vertical",
  gridColumn: "1 / -1",
},
  sub: {
    color: "#6b7280",
    marginBottom: "25px",
    fontSize: "14px",
  },

  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "14px",
  width: "100%",
  boxSizing: "border-box",
},

  input: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "14px",
    transition: "0.2s",
    background: "#fff",
  },

  fullInput: {
    gridColumn: "span 2",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
  },

  sectionTitle: {
    marginTop: "25px",
    fontWeight: "800",
    color: "#4f46e5",
    fontSize: "15px",
  },

  dateInput: {
    padding: "12px",
    marginTop: "10px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    width: "100%",
  },

  box: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "12px",
  },

  chip: {
    background: "linear-gradient(135deg,#eef2ff,#e0e7ff)",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  remove: {
    cursor: "pointer",
    color: "#ef4444",
    fontWeight: "bold",
  },

  dateBlock: {
    marginTop: "22px",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid #eef2ff",
    background: "#fafafa",
  },

  slotGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },

  slot: {
    padding: "8px 12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "12px",
    cursor: "pointer",
    transition: "0.2s",
    background: "white",
  },

  selectedSlot: {
    background: "#4f46e5",
    color: "white",
    border: "1px solid #4f46e5",
    transform: "scale(1.05)",
  },

  finalBox: {
    marginTop: "30px",
    padding: "18px",
    background: "#f8fafc",
    borderRadius: "16px",
    border: "1px solid #eef2ff",
  },

  finalRow: {
    marginBottom: "12px",
  },

  finalChip: {
    margin: "4px",
    padding: "5px 10px",
    background: "#e0e7ff",
    borderRadius: "999px",
    fontSize: "11px",
    display: "inline-block",
  },

  saveBtn: {
    marginTop: "25px",
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg,#4f46e5,#6366f1)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(79,70,229,0.3)",
  },
};