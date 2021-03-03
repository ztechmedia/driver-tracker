import axios from "../../axios/default";
import errorHandler from "../../utils/errorHandler";

export const JOBS_START = "JOBS_START";
export const JOBS_SEND_START = "JOBS_SEND_START";
export const JOBS_FAIL = "JOBS_FAIL";
export const JOBS_ATTEMP_SUCCESS = "JOBS_ATTEMP_SUCCESS";
export const JOBS_TODAY_SUCCESS = "JOBS_TODAY_SUCCESS";
export const JOBS_TODAY_SEND_SUCCESS = "JOBS_TODAY_SEND_SUCCESS";
export const JOBS_ATTEMP_SEND_SUCCESS = "JOBS_ATTEMP_SEND_SUCCESS";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getJobsAttemp = (rider, date) => async (dispatch) => {
  const data = { rider, date };

  try {
    dispatch(jobsStart());
    const request = await axios.post("/api/v1/jobs-attemp", data, config);
    dispatch(jobsAttempSuccess(request.data.jobs));
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
    dispatch(jobsTodaySuccess(request.data.jobs));
  } catch (err) {
    dispatch(jobsFail(err.response.data.error));
    dispatch(errorHandler(err.response.data.error));
  }
};

export const jobSendStatus = (id, status, job, date = null) => async (
  dispatch
) => {
  const data = {
    id,
    status,
    date,
  };
  console.log(job);
  try {
    dispatch(jobSendStart());
    if (job === 0) {
      const request = await axios.post("/api/v1/job-send-status", data, config);
      console.log(request.data.awb);
      dispatch({ type: JOBS_TODAY_SEND_SUCCESS, job: request.data.awb });
    } else {
      const request = await axios.post(
        "/api/v1/job-send-status-activation",
        data,
        config
      );
      dispatch({ type: JOBS_ATTEMP_SEND_SUCCESS, job: request.data.awb });
    }
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

const jobSendStart = () => (dispatch) => {
  dispatch({
    type: JOBS_SEND_START,
  });
};

const jobsFail = (error) => (dispatch) => {
  dispatch({
    type: JOBS_FAIL,
    error,
  });
};

const jobsAttempSuccess = (jobs) => (dispatch) => {
  dispatch({
    type: JOBS_ATTEMP_SUCCESS,
    jobs,
  });
};

const jobsTodaySuccess = (jobs) => (dispatch) => {
  dispatch({
    type: JOBS_TODAY_SUCCESS,
    jobs,
  });
};
