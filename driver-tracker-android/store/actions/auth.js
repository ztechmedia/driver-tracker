import axios from "../../axios/default";
import {
  saveDataToStorage,
  removeDataFromStorage,
  getDataFromStorage,
} from "../../utils/utility";
import * as NavigationServices from "../../services/navigation/NavigationServices";

//error handler
import errorHandler from "../../utils/errorHandler";
import { Alert } from "react-native";

export const AUTH_START = "AUTH_START";
export const AUTH_START_PASSWORD = "AUTH_START_PASSWORD";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_CHECK_PHONE_SUCCESS = "AUTH_CHECK_PHONE_SUCCESS";
export const AUTH_CREATE_PASSWORD_SUCCESS = "AUTH_CREATE_PASSWORD_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

//set time outline
let timer;

//axios config
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//login
export const login = (phone, password) => async (dispatch) => {
  const data = {
    phone,
    password,
  };

  try {
    dispatch(authStart());
    const request = await axios.post("/api/v1/auth/login", data, config);
    await saveDataToStorage("userData", {
      token: request.data.token,
      userLogged: request.data.user,
    });
    dispatch(authSuccess(request.data.token, request.data.user));
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${request.data.token}`;
    NavigationServices.navigate("DriverTracker");
  } catch (err) {
    errorHandler(err.response.data.error);
    dispatch(authFail(err.response.data.error));
  }
};

//check phone exist
export const checkPhone = (phone) => async (dispatch) => {
  const data = { phone };

  try {
    dispatch(authStart());
    const request = await axios.post("/api/v1/auth/check-phone", data, config);
    dispatch(checkPhoneSuccess(request.data.kurir));
  } catch (err) {
    dispatch(authFail(err.response.data.error));
    dispatch(errorHandler(err.response.data.error));
  }
};

//create password 123456
export const createPassword = (phone) => async (dispatch) => {
  const data = { phone };
  try {
    dispatch({
      type: AUTH_START_PASSWORD,
    });
    const request = await axios.post(
      "/api/v1/auth/create-password",
      data,
      config
    );

    if (request.data.success) {
      NavigationServices.navigate("LoginScreen", {
        kurir: {
          phone,
          password: "123456",
        },
      });
      dispatch({
        type: AUTH_CREATE_PASSWORD_SUCCESS,
      });
      Alert.alert("Sukses!", request.data.message);
    }
  } catch (err) {
    dispatch(authFail(err.response.data.error));
    dispatch(errorHandler(err.response.data.error));
  }
};

//auth check state handler
export const authCheckState = () => async (dispatch) => {
  const userData = await getDataFromStorage("userData");

  if (!userData) {
    dispatch(logout());
  } else {
    const { token, userLogged } = userData;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    dispatch(authSuccess(token, userLogged));
    NavigationServices.navigate("DriverTracker");
  }
};

//logout
export const logout = () => async (dispatch) => {
  delete axios.defaults.headers.common["authorization"];
  await removeDataFromStorage("userData");
  dispatch({
    type: AUTH_LOGOUT,
  });
  NavigationServices.navigate("Auth");
};

//set loading on auth action
const authStart = () => {
  return {
    type: AUTH_START,
  };
};

//set error on auth action
const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};

//set user when login success
const authSuccess = (token, userLogged) => {
  return {
    type: AUTH_SUCCESS,
    token,
    userLogged,
  };
};

//set kurir detail when phone number exist
const checkPhoneSuccess = (kurir) => {
  return {
    type: AUTH_CHECK_PHONE_SUCCESS,
    kurir,
  };
};
