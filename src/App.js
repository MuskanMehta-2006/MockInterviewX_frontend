import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";
import InterviewType  from "./pages/InterviewType";
import HumanInterview from "./pages/HumanInterview";
import ForgotPassword from "./pages/ForgotPassword";
import Dsa from "./pages/Dsa";
import { Toaster } from "react-hot-toast";
import Feedback from "./pages/Feedback";
import FundamentalsInterview from "./pages/FundamentalsInterview";
import FeedbackTheory from "./pages/FeedbackTheory";
import InterviewerDashboard from "./pages/InterviewerDashboard";
import InterviewerProfile from "./pages/InterviewerProfile";
import InterviewerChoicePage from "./pages/InterviewChoicePage";




function App() {
  return (
    <BrowserRouter>
   <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    duration: 8000, // ⏱️ zyada time dikhega
    style: {
      background: "#1e293b",
      color: "#fff",
      padding: "16px",
      borderRadius: "12px",
      fontSize: "14px",
      maxWidth: "420px",
      textAlign: "center",
    },
  }}
/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
  
        <Route path="/ai-interview/theory" element={<FundamentalsInterview/>}/>
        <Route path="/result" element={<Results/>} />
   
        <Route path="/interview-type" element={<InterviewType/>} />
         <Route path="/human-interview" element={<HumanInterview/>} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/ai-interview/coding" element={<Dsa/>} />
         
<Route path="/feedback" element={<Feedback />} /> 
<Route path="/feedback-theory" element={<FeedbackTheory />} /> 
<Route path="/interviewer-dashboard" element={<InterviewerDashboard/>}/>
<Route path="/interviewer-profile" element={<InterviewerProfile/>}/>
<Route path="/interview-choice" element={<InterviewerChoicePage/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;