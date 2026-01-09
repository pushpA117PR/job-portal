import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"  // must match JSON Server port
});

export default API;
