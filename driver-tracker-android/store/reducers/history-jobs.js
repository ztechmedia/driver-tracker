import {
  HISTORY_JOBS_START,
  HISTORY_JOBS_SEND_START,
  HISTORY_JOBS_FAILED_SEND_SUCCESS,
  HISTORY_JOBS_CANCELED_SEND_SUCCESS,
  HISTORY_JOBS_FAILED_SUCCESS,
  HISTORY_JOBS_CANCELED_SUCCESS,
  HISTORY_JOBS_RECEIVED_SUCCESS,
  HISTORY_JOBS_FAIL,
} from "../actions/history-jobs";

import { updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  loading1: false,
  jobsFailed: [],
  jobsCanceled: [],
  jobsReceived: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_JOBS_START:
      return updateObject(state, {
        loading: true,
        error: null,
      });
    case HISTORY_JOBS_SEND_START:
      return updateObject(state, {
        loading1: true,
        error: null,
      });
    case HISTORY_JOBS_FAILED_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        jobsFailed: action.jobs,
      });
    case HISTORY_JOBS_CANCELED_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        jobsCanceled: action.jobs,
      });
    case HISTORY_JOBS_RECEIVED_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        jobsReceived: action.jobs,
      });
    case HISTORY_JOBS_FAILED_SEND_SUCCESS:
      return setJobFailedSendSuccess(state, action);
    case HISTORY_JOBS_CANCELED_SEND_SUCCESS:
      return setJobCanceledSendSuccess(state, action);
    case HISTORY_JOBS_FAIL:
      return updateObject(state, {
        loading: false,
        loading1: false,
        error: action.error,
      });
    default:
      return state;
  }
};

const setJobFailedSendSuccess = (state, action) => {
  const jobIndex = state.jobsFailed
    .map((job) => job.ID === action.job.ID)
    .indexOf(true);

  const jobs = [...state.jobsFailed];
  jobs.splice(jobIndex, 1);

  return updateObject(state, {
    loading1: false,
    error: null,
    jobsFailed: jobs,
  });
};

const setJobCanceledSendSuccess = (state, action) => {
  const jobIndex = state.jobsCanceled
    .map((job) => job.ID === action.job.ID)
    .indexOf(true);

  const jobs = [...state.jobsCanceled];
  jobs.splice(jobIndex, 1);

  return updateObject(state, {
    loading1: false,
    error: null,
    jobsCanceled: jobs,
  });
};
