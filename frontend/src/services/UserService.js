import axios from "axios";

// Set the base URL for all API calls
const api = axios.create({
  baseURL: "http://localhost:3000/api/user",  // Update this with your actual base API URL
});

// Axios interceptor to add the token to the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// User login function
export const loginUser = async (email, password) => {
  const res = await api.post("/login", { email, password });
  // Store token and user data in localStorage
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.data));
  return res.data;
};

// User registration function
export const registerUser = async (fullname, username, email, password) => {
  const res = await api.post("/register", { fullname, username, email, password });
  return res.data;
};

// Verify OTP function
export const verifyOTP = async (email, otp) => {
  const res = await api.post("/verify-otp", { email, otp });
  return res.data;
};

// Regenerate OTP function
export const regenerateOTP = async (fullname, email) => {
  const res = await api.post("/regenerate-otp", { fullname, email });
  return res.data;
};

// Logout function
export const logoutUser = async () => {
  // Remove token and user data from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("chat");
  localStorage.removeItem("chats");
  // If you want, you can also call a logout API to invalidate the session on the server
  const res = await api.post("/logout");
  return res.data;
};

// Get user profile from local storage
export const getUserProfile = () => {
  try {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);  // Parse and return the user data
    } else {
      throw new Error("No user data found in localStorage");
    }
  } catch (error) {
    throw new Error("Failed to retrieve user profile");
  }
};

