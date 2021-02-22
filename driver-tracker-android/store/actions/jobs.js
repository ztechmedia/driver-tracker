import axios from "../../axios/default";
import errorHandler from "../../utils/errorHandler";

export const JOBS_START = "JOBS_START";
export const JOBS_SEND_START = "JOBS_SEND_START";
export const JOBS_FAIL = "JOBS_FAIL";
export const JOBS_SUCCESS = "JOBS_SUCCESS";
export const JOBS_TODAY_SUCCESS = "JOBS_TODAY_SUCCESS";
export const JOBS_SEND_SUCCESS = "JOBS_SEND_SUCCESS";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getJobs = (rider, date) => async (dispatch) => {
  const data = { rider, date };

  try {
    dispatch(jobsStart());
    const request = await axios.post("/api/v1/jobs-attemp", data, config);
    dispatch(jobsSuccess(request.data.jobs));
  } catch (err) {
    dispatch(jobsFail(err.response.data.error));
    dispatch(errorHandler(err.response.data.error));
  }
};

export const getJobsToday = (rider, date) => async (dispatch) => {
  const data = { rider, date };

  try {
    dispatch(jobsStart());
    const request = await axios.post("/api/v1/jobs-today", data, config);
    console.log(request.data.jobs);
    dispatch(jobsTodaySuccess(request.data.jobs));
  } catch (err) {
    dispatch(jobsFail(err.response.data.error));
    dispatch(errorHandler(err.response.data.error));
  }
};

export const jobsSendPackage = (id) => async (dispatch) => {
  const data = {
    id,
    status: "DELIVERY",
  };

  try {
    dispatch(jobsSendStart());
    const request = await axios.post("/api/v1/job-send-start", data, config);
    dispatch(jobsSendSuccess(request.data.awb));
  } catch (err) {
    dispatch(jobsFail(err.response.data.error));
    dispatch(errorHandler(err.response.data.error));
  }
};

const jobsStart = () => (dispatch) => {
  dispatch({
    type: JOBS_START,
  });
};

const jobsSendStart = () => (dispatch) => {
  dispatch({
    type: JOBS_SEND_START,
  });
};

const jobsSendSuccess = (job) => (dispatch) => {
  dispatch({
    type: JOBS_SEND_SUCCESS,
    job,
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
