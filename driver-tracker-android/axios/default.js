import axios from "axios";
import config from "../constants/EndPoint";

const instance = axios.create({
  baseURL: config.baseURL,
});

export default instance;
