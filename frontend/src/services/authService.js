import axios from "axios";

const API_URL = "http://localhost:8000" + "/api/users/";

// register a user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    if (response.data.message === "Invalid credentials") {
      localStorage.removeItem("user");
      return null;
    } else {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  }
  return response.data;
};

// logout a user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
