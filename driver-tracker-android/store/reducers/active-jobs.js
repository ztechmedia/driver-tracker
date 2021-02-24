import {
  ACTIVE_JOBS_START,
  ACTIVE_JOBS_FAIL,
  ACTIVE_JOBS_SUCCESS,
  ACTIVE_JOB_SEND_SUCCESS,
  ACTIVE_JOB_SEND_START,
} from "../actions/active-jobs";

import { updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  loading1: false,
  activeJobs: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_JOBS_START:
      return setLoading(state, action);
    case ACTIVE_JOB_SEND_START:
      return setSendLoading(state, action);
    case ACTIVE_JOBS_FAIL:
      return setFail(state, action);
    case ACTIVE_JOBS_SUCCESS:
      return setSuccess(state, action);
    case ACTIVE_JOB_SEND_SUCCESS:
      return setJobSendSuccess(state, action);
    default:
      return state;
  }
};

const setLoading = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const setSendLoading = (state, action) => {
  return updateObject(state, {
    loading1: true,
    error: null,
  });
};

const setFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    loading1: false,
    error: action.error,
  });
};

const setSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    activeJobs: action.jobs,
  });
};

const setJobSendSuccess = (state, action) => {
  const jobIndex = state.activeJobs
    .map((job) => job.ID === action.job.ID)
    .indexOf(true);

  const jobs = [...state.activeJobs];

  if (
    action.job.AWB_Status === "CANCELED" ||
    action.job.AWB_Status === "FAILED DELIVERY"
  ) {
    jobs.splice(jobIndex, 1);
  } else {
    jobs[jobIndex].AWB_Status = action.job.AWB_Status;
  }

  return updateObject(state, {
    loading1: false,
    error: null,
    activeJobs: jobs,
  });
};

export default reducer;
