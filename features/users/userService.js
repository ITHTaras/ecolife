import axios from "axios";
const url = "https://d6f5-31-128-77-15.eu.ngrok.io/users/";

import AsyncStorage from "@react-native-async-storage/async-storage";

const register = async (data) => {
  const response = await axios.post(url, data);

  if (response.data.email) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (data) => {
  const response = await axios.post(url + "login", data);

  if (response.data.email) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const adminLogin = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(url + "admin/login", data, config);

  return response.data;
};

const update = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(url, data, config);

  if (response.data.email) {
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        email: response.data.email,
        name: response.data.name,
        image: response.data.image,
        token: token,
      })
    );
  }

  return {
    email: response.data.email,
    name: response.data.name,
    image: response.data.image,
    token: token,
  };
};

const userService = {
  register,
  login,
  adminLogin,
  update,
};

export default userService;
