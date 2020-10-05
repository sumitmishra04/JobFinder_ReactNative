import { LIKE_JOB, CLEAR_LIKED_JOBS } from "../actions/types";
import _ from "lodash";

export default function (state = [], action) {
  switch (action.type) {
    case LIKE_JOB:
      const jobs = _.unionBy([action.payload, ...state], "id");
      console.log("REDUCER", action.payload);
      console.log("REDUCER", jobs);
      return jobs;
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
}
