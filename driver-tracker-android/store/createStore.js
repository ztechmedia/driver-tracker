import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// const composeEnhancers =
//   process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

//reducer
import authReducer from "./reducers/auth";
import jobsReducer from "./reducers/jobs";
import activeJobsReducer from "./reducers/active-jobs";
import historyJobsReducer from "./reducers/history-jobs";

const rootReducers = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  activeJobs: activeJobsReducer,
  historyJobs: historyJobsReducer,
});

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
  // composeEnhancers(applyMiddleware(thunk))
);

export default store;
