import React, { Component } from "react";
import { View } from "react-native";
import Slide from "../components/slides";
import { AppLoading } from "expo";
import SigninForm from "../components/signinform";
import _ from "lodash";
import AsyncStorage from "@react-native-community/async-storage";

const SLIDE_DATA = [
  { text: "Welcome to JobApp", color: "#03A9F4" },
  { text: "Use this to get a job", color: "#009688" },
  { text: "Set your location , then swipe away", color: "#03A9F4" },
];
class WelcomeScreen extends Component {
  state = { token: null };

  onSlidesComplete = () => {
    this.props.navigation.navigate("Auth");
  };
  async componentWillMount() {
    let token = await AsyncStorage.getItem("fb_token");
    if (token) {
      this.props.navigation.navigate("map");
      this.setState({ token });
    } else this.setState({ token: false });
  }
  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <View>
        <Slide data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    );
  }
}

export default WelcomeScreen;
