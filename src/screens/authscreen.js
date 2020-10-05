import React, { Component } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import * as actions from "../../actions";
class AuthScreen extends Component {
  async componentDidMount() {
    await AsyncStorage.removeItem("fb_token", (err) => console.log("fb_token"));
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }
  onAuthComplete(props) {
    if (props.token) {
      props.navigation.navigate("map");
    }
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }
  render() {
    return <View />;
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
