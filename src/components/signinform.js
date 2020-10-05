import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Axios from "axios";
import firebase from "firebase";

const ROOT_URL =
  "https://us-central1-one-time-password-c8722.cloudfunctions.net";
class SigninForm extends Component {
  state = { phone: "", code: "" };

  handleSubmit = async () => {
    try {
      const { data } = await Axios.post(ROOT_URL + "/verifyOTP", {
        phone: "91" + this.state.phone,
        code: this.state.code,
      });
      firebase.auth().signInWithCustomToken(data.token);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      // we are animating view
      <View>
        <Input
          label="Enter Phone Number"
          value={this.state.phone}
          onChangeText={(phone) => this.setState({ phone })}
        />
        <Input
          label="Enter OTP"
          value={this.state.code}
          onChangeText={(code) => this.setState({ code })}
        />
        <Button title="Signin" onPress={this.handleSubmit} />
      </View>
    );
  }
}

export default SigninForm;
