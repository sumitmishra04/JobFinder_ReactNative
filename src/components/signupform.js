import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Axios from "axios";
const ROOT_URL =
  "https://us-central1-one-time-password-c8722.cloudfunctions.net";
class SignupForm extends Component {
  state = { phone: "" };

  handleSubmit = async () => {
    try {
      await Axios.post(ROOT_URL + "/createUser", {
        phone: "91" + this.state.phone,
      });
      await Axios.post(ROOT_URL + "/requestOTP", {
        phone: "91" + this.state.phone,
      });
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
        <Button
          title="Create Account and Recieve OTP"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default SignupForm;
