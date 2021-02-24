import {
  JOBS_START,
  JOBS_FAIL,
  JOBS_SUCCESS,
  JOBS_TODAY_SUCCESS,
  JOBS_SEND_SUCCESS,
  JOBS_SEND_START,
} from "../actions/jobs";

import { updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  loading1: false,
  jobs: [],
  jobsToday: [],
  job: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_START:
      return setLoading(state, action);
    case JOBS_SEND_START:
      return setSendLoading(state, action);
    case JOBS_FAIL:
      return setError(state, action);
    case JOBS_SUCCESS:
      return setJobsSuccess(state, action);
    case JOBS_SEND_SUCCESS:
      return setJobSendSuccess(state, action);
    case JOBS_TODAY_SUCCESS:
      return setJobsTodaySuccess(state, action);
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

const setError = (state, action) => {
  return updateObject(state, {
    loading: false,
    loading1: false,
    error: action.error,
  });
};

const setJobsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    jobs: action.jobs,
  });
};

const setJobsTodaySuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    jobsToday: action.jobs,
  });
};

const setJobSendSuccess = (state, action) => {
  const jobIndex = state.jobsToday
    .map((job) => job.ID === action.job.ID)
    .indexOf(true);

  const jobs = [...state.jobsToday];
  jobs[jobIndex].AWB_Status = action.job.AWB_Status;

  return updateObject(state, {
    loading1: false,
    error: null,
    jobsToday: jobs,
  });
};

export default reducer;
