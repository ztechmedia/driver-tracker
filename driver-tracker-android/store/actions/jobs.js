import axios from "../../axios/default";
import errorHandler from "../../utils/errorHandler";
import { logout } from "./auth";

export const JOBS_START = "JOBS_START";
export const JOBS_FAIL = "JOBS_FAIL";
export const JOBS_SUCCESS = "JOBS_SUCCESS";
export const JOBS_TODAY_SUCCESS = "JOBS_TODAY_SUCCESS";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getJobs = (rider, date) => async (dispatch) => {
  const data = { rider, date };

  try {
    dispatch(jobsStart());
    const request = await axios.post("/api/v1/jobs", data, config);
    dispatch(jobsSuccess(request.data.jobs));
  } catch (err) {
    errorHandler(err.response.data.error);
    dispatch(jobsFail(err.response.data.error));
    dispatch(logout());
  }
};

export const getJobsToday = (rider, date) => async (dispatch) => {
  const data = { rider, date };
  try {
    dispatch(jobsStart());
    const request = await axios.post("/api/v1/jobs-today", data, config);
    dispatch(jobsTodaySuccess(request.data.jobs));
  } catch (err) {
    errorHandler(err.response.data.error);
    dispatch(jobsFail(err.response.data.error));
    dispatch(logout());
  }
};

const jobsStart = () => (dispatch) => {
  dispatch({
    type: JOBS_START,
  });
};

const jobsFail = (error) => (dispatch) => {
  dispatch({
    type: JOBS_FAIL,
    error,
  });
};

const jobsSuccess = (jobs) => (dispatch) => {
  dispatch({
    type: JOBS_SUCCESS,
    jobs,
  });
};

const jobsTodaySuccess = (jobs) => (dispatch) => {
  dispatch({
    type: JOBS_TODAY_SUCCESS,
    jobs,
  });
};
