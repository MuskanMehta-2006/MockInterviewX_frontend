import axios from "axios";

// Base URL (backend)
const API = axios.create({
  baseURL: "https://mockinterviewxbackend-production.up.railway.app/api",
});

export default API;