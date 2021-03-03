import axios from "../../axios/default";
import errorHandler from "../../utils/errorHandler";

export const HISTORY_JOBS_START = "HISTORY_JOBS_START";
export const HISTORY_JOBS_SEND_START = "HISTORY_JOBS_SEND_START";
export const HISTORY_JOBS_FAILED_SEND_SUCCESS =
  "HISTORY_JOBS_FAILED_SEND_SUCCESS";
export const HISTORY_JOBS_CANCELED_SEND_SUCCESS =
  "HISTORY_JOBS_CANCELED_SEND_SUCCESS";
export const HISTORY_JOBS_FAILED_SUCCESS = "HISTORY_JOBS_FAILED_SUCCESS";
export const HISTORY_JOBS_CANCELED_SUCCESS = "HISTORY_JOBS_CANCELED_SUCCESS";
export const HISTORY_JOBS_RECEIVED_SUCCESS = "HISTORY_JOBS_RECEIVED_SUCCESS";
export const HISTORY_JOBS_FAIL = "HISTORY_JOBS_FAIL";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getFailedJobs = (rider, year, month) => async (dispatch) => {
  const data = { rider, year, month };
  try {
    dispatch({
      type: HISTORY_JOBS_START,
    });
    const request = await axios.post("/api/v1/jobs-failed", data, config);
    dispatch({ type: HISTORY_JOBS_FAILED_SUCCESS, jobs: request.data.jobs });
  } catch (err) {
    dispatch({ type: HISTORY_JOBS_FAIL, error: err.response.data.error });
    dispatch(errorHandler(err.response.data.error));
  }
};

export const getCanceledJobs = (rider, year, month) => async (dispatch) => {
  const data = { rider, year, month };
  try {
    dispatch({
      type: HISTORY_JOBS_START,
    });
    const request = await axios.post("/api/v1/jobs-canceled", data, config);
    dispatch({ type: HISTORY_JOBS_CANCELED_SUCCESS, jobs: request.data.jobs });
  } catch (err) {
    dispatch({ type: HISTORY_JOBS_FAIL, error: err.response.data.error });
    dispatch(errorHandler(err.response.data.error));
  }
};

export const getReceivedJobs = (rider, year, month) => async (dispatch) => {
  const data = { rider, year, month };
  try {
    dispatch({
      type: HISTORY_JOBS_START,
    });
    const request = await axios.post("/api/v1/jobs-received", data, config);
    dispatch({
      type: HISTORY_JOBS_RECEIVED_SUCCESS,
      jobs: request.data.jobs,
    });
  } catch (err) {
    dispatch({ type: HISTORY_JOBS_FAIL, error: err.response.data.error });
    dispatch(errorHandler(err.response.data.error));
  }
};

export const activateJob = (id, status, job) => async (dispatch) => {
  const data = {
    id,
    status,
  };

  try {
    dispatch({
      type: HISTORY_JOBS_SEND_START,
    });
    const request = await axios.post("/api/v1/job-send-status", data, config);
    if (job === 0) {
      dispatch({
        type: HISTORY_JOBS_FAILED_SEND_SUCCESS,
        job: request.data.awb,
      });
    } else if (job === 1) {
      dispatch({
        type: HISTORY_JOBS_CANCELED_SEND_SUCCESS,
        job: request.data.awb,
      });
    }
  } catch (err) {
    dispatch({ type: HISTORY_JOBS_FAIL, error: err.response.data.error });
    dispatch(errorHandler(err.response.data.error));
  }
};
