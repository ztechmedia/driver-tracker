import axios from "axios";
import config from "../constants/Axios";

const instance = axios.create({
  baseURL: config.baseURL,
});

export default instance;
