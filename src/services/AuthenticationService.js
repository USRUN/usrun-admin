import axios from "../utils/axios";
import { setLocalStorage, removeLocalStorage, getLocalStorage } from "../utils";

const login = async (email, password) => {
  try {
    const response = await axios.post("/user/login", {
      email,
      password,
      type: 3,
    });
    setLocalStorage("user", response.data.data);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const logout = () => {
  removeLocalStorage("user");
};

const authHeader = () => {
  const user = getLocalStorage("user");
  if (user === null) {
    return {};
  } else {
    return { Authorization: "Bearer " + user.accessToken };
  }
};

const getUser = () => {
  return getLocalStorage('user');
}

export default {
  login,
  logout,
  authHeader,
  getUser
};
