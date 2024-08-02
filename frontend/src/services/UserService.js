import axios from "axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("http://localhost:3000/api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.data));
  return res.data;
};

export const registerUser = async (fullname, username, email, password) => {
  const res = await axios.post("http://localhost:3000/api/user/register", {
    fullname,
    username,
    email,
    password,
  });
  return res.data;
};

export const verifyOTP = async (email, otp) => {
  const res = await axios.post("http://localhost:3000/api/user/verify-otp", {
    email,
    otp,
  });
  return res.data;
};

export const regenerateOTP = async (fullname, email) => {
  const res = await axios.post(
    "http://localhost:3000/api/user/regenerate-otp",
    {
      fullname,
      email,
    }
  );
  return res.data;
};
