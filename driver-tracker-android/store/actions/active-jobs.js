import axios from "../../axios/default";
import errorHandler from "../../utils/errorHandler";

export const ACTIVE_JOBS_START = "ACTIVE_JOBS_START";
export const ACTIVE_JOBS_FAIL = "ACTIVE_JOBS_FAIL";
export const ACTIVE_JOBS_SUCCESS = "ACTIVE_JOBS_SUCCESS";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getActiveJobs = (rider, date) => async (dispatch) => {
  const data = { rider, date };
  try {
    dispatch(activeJobsStart());
    const request = await axios.post("/api/v1/jobs-active", data, config);
    console.log(request.data.jobs);
    dispatch(activeJobsSuccess(request.data.jobs));
  } catch (err) {
    dispatch(activeJobsFail(err.response.data.error));
    dispatch(errorHandler(err.response.data.error));
  }
};

const activeJobsStart = () => (dispatch) => {
  dispatch({
    type: ACTIVE_JOBS_START,
  });
};

const activeJobsFail = (error) => (dispatch) => {
  dispatch({
    type: ACTIVE_JOBS_FAIL,
    error,
  });
};

const activeJobsSuccess = (jobs) => (dispatch) => {
  dispatch({
    type: ACTIVE_JOBS_SUCCESS,
    jobs,
  });
};
