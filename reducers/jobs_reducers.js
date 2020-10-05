import { FETCH_JOBS } from "../actions/types";

const initial_state = {
  results: [],
};
export default function (state = initial_state, action) {
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload;

    default:
      return state;
  }
}
