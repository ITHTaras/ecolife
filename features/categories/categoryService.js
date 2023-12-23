import axios from "axios";
const url = "https://ecolifeserver-production.up.railway.app/categories";
const pointUrl = "https://ecolifeserver-production.up.railway.app/points/";

const getCategories = async () => {
  const response = await axios.get(url);
  return response.data;
};

const addCategory = async (data, token) => {
  const headers = {
    token,
  };

  const response = await axios.post(url, data);
  return response.data;
};

const addPoint = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(config);
  const response = await axios.post(pointUrl, data, config);
  console.log(response.data);
  return response.data;
};

const activatePoint = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  data.password = data.password.slice(0, -7);

  const response = await axios.post(pointUrl + "activate", data, config);
  return response.data;
};

const complain = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(pointUrl + "complain", data, config);
  return response.data;
};

const categoryService = {
  getCategories,
  addCategory,
  addPoint,
  activatePoint,
  complain,
};

export default categoryService;
