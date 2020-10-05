import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "./types";
import AsyncStorage from "@react-native-community/async-storage";

import * as Facebook from "expo-facebook";

export const facebookLogin = () => async (dispatch) => {
  let token = await AsyncStorage.getItem("fb_token");
  console.log("TOKEN ", token);
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async (dispatch) => {
  try {
    const fbCred = { appId: "616693999000661", appName: "JobFinder" };
    await Facebook.initializeAsync(fbCred);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });

    if (type === "cancel") {
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    AsyncStorage.setItem("fb_token", token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};
