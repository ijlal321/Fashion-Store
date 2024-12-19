import axios from "axios";

const baseURL = process.env.VITE_REACT_APP_BACKEND_URL || 
  (import.meta.mode === "development" ? "http://localhost:5000/api" : "/api");

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
