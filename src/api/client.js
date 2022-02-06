import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://e-ipcr-backend.herokuapp.com/api",
});

export default apiClient;
