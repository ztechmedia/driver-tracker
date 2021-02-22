import {
  ACTIVE_JOBS_START,
  ACTIVE_JOBS_FAIL,
  ACTIVE_JOBS_SUCCESS,
} from "../actions/active-jobs";

import { updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  activeJobs: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_JOBS_START:
      return setLoading(state, action);
    case ACTIVE_JOBS_FAIL:
      return setFail(state, action);
    case ACTIVE_JOBS_SUCCESS:
      return setSuccess(state, action);
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

const setFail = (state, action) => {
  return updateObject(state, {
    loading: false,
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

export default reducer;
