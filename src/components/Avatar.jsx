function Avatar({ speaking }) {
  return (
    <div className="avatar-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
        alt="AI Interviewer"
        className={speaking ? "avatar speaking" : "avatar"}
      />

      <p>{speaking ? "🗣 Speaking..." : "🤖 Waiting for question..."}</p>
    </div>
  );
}

export default Avatar;