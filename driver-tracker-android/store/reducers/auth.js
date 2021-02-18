import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_CHECK_PHONE_SUCCESS,
  AUTH_CREATE_PASSWORD_SUCCESS,
  AUTH_START_PASSWORD,
} from "../actions/auth";

import { updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  loadingPassword: false,
  token: null,
  userLogged: null,
  kurir: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return setLoading(state, action);
    case AUTH_START_PASSWORD:
      return setLoadingPassword(state, action);
    case AUTH_FAIL:
      return setError(state, action);
    case AUTH_SUCCESS:
      return setUserLogged(state, action);
    case AUTH_CHECK_PHONE_SUCCESS:
      return setKurir(state, action);
    case AUTH_CREATE_PASSWORD_SUCCESS:
      return setCreatePassword(state, action);
    case AUTH_LOGOUT:
      return logout();
    default:
      return state;
  }
};

const setLoading = (state, action) => {
  return updateObject(state, {
    loading: true,
    kurir: null,
    error: null,
  });
};

const setLoadingPassword = (state, action) => {
  return updateObject(state, {
    loadingPassword: true,
    error: null,
  });
};

const setError = (state, action) => {
  return updateObject(state, {
    loading: false,
    loadingPassword: false,
    error: action.error,
  });
};

const setUserLogged = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    token: action.token,
    userLogged: action.userLogged,
  });
};

const setCreatePassword = (state, action) => {
  return updateObject(state, {
    loadingPassword: false,
    error: null,
    kurir: null,
  });
};

const setKurir = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    kurir: action.kurir,
  });
};

const logout = (state, action) => {
  return updateObject(state, initialState);
};

export default reducer;
