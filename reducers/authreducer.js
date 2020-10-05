import {
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_LOGIN_SUCCESS,
  ON_LOGOUT,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case ON_LOGOUT:
      return { token: null };

    default:
      return state;
  }
}
