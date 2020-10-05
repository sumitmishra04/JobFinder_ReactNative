import { combineReducers } from "redux";
import auth from "./authreducer";
import jobs from "./jobs_reducers";
import likedJobs from "./liked_reducer";
export default combineReducers({
  auth,
  jobs,
  likedJobs,
});
