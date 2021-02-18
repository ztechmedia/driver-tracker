import {
  JOBS_START,
  JOBS_FAIL,
  JOBS_SUCCESS,
  JOBS_TODAY_SUCCESS,
} from "../actions/jobs";

import { updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  jobs: [],
  jobsToday: [],
  job: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_START:
      return setLoading(state, action);
    case JOBS_FAIL:
      return setError(state, action);
    case JOBS_SUCCESS:
      return setJobsSuccess(state, action);
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

const setError = (state, action) => {
  return updateObject(state, {
    loading: false,
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

export default reducer;
