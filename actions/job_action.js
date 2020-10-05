import axios from "axios";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from "./types";

const API_KEY = "AIzaSyBgCA6K-NFJS7nX5rY10YRibhd-iwUNx5s";
export const fetchJobs = (region, cb) => async (dispatch) => {
  try {
    const params = {
      apiKey: "abddf793ef0880cc2bb9e6a161bae2c7",
      apiId: "2ee60bac",
      baseUrl: "https://api.adzuna.com/v1/api/jobs",
      country: "gb",
      baseParam: "search/1?&results_per_page=20&content-type=application/json",
      search: "react",
    };

    await Permissions.askAsync(Permissions.LOCATION);

    const { latitude, longitude } = region;

    Location.setApiKey(API_KEY);

    const address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    }).catch((error) => {
      return console.log(error);
    });

    let city = address[0].city;
    city = "london";

    const targetURL = `${params.baseUrl}/${params.country}/${params.baseParam}&app_id=${params.apiId}&app_key=${params.apiKey}&what=${params.search}&where=${city}`;

    let { data } = await axios.get(targetURL);
    dispatch({
      type: FETCH_JOBS,
      payload: data.results,
    });
    cb();
  } catch (err) {
    console.log("ERROR    ", err);
  }
};

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS,
  };
};
