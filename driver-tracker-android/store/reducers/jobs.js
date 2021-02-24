import {
  JOBS_START,
  JOBS_FAIL,
  JOBS_ATTEMP_SUCCESS,
  JOBS_TODAY_SUCCESS,
  JOBS_TODAY_SEND_SUCCESS,
  JOBS_ATTEMP_SEND_SUCCESS,
  JOBS_SEND_START,
} from "../actions/jobs";

import { updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  loading1: false,
  jobsAttemp: [],
  jobsToday: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBS_START:
      return updateObject(state, {
        loading: true,
        error: null,
      });
    case JOBS_SEND_START:
      return updateObject(state, {
        loading1: true,
        error: null,
      });
    case JOBS_FAIL:
      return updateObject(state, {
        loading: false,
        loading1: false,
        error: action.error,
      });
    case JOBS_ATTEMP_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        jobsAttemp: action.jobs,
      });
    case JOBS_TODAY_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        jobsToday: action.jobs,
      });
    case JOBS_TODAY_SEND_SUCCESS:
      return setJobTodaySendSuccess(state, action);
    case JOBS_ATTEMP_SEND_SUCCESS:
      return setJobAttempSendSuccess(state, action);
    default:
      return state;
  }
};

const setJobTodaySendSuccess = (state, action) => {
  const jobTodayIndex = state.jobsToday
    .map((job) => job.ID)
    .indexOf(action.job.ID);

  const jobsToday = [...state.jobsToday];
  jobsToday[jobTodayIndex].AWB_Status = action.job.AWB_Status;

  return updateObject(state, {
    loading1: false,
    error: null,
    jobsToday: jobsToday,
  });
};

const setJobAttempSendSuccess = (state, action) => {
  const jobAttempIndex = state.jobsAttemp
    .map((job) => job.ID)
    .indexOf(action.job.ID);

  const jobsAttemp = [...state.jobsAttemp];
  jobsAttemp.splice(jobAttempIndex, 1);

  return updateObject(state, {
    loading1: false,
    error: null,
    jobsAttemp: jobsAttemp,
  });
};

export default reducer;
