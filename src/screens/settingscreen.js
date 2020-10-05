import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { connect } from "react-redux";
import { CLEAR_LIKED_JOBS, FACEBOOK_LOGIN_FAIL } from "../../actions/types";
import { Button, Icon } from "react-native-elements";

class SettingScreen extends Component {
  // static navigationOptions = {
  //   header: {
  //     style: {
  //       marginTop: Platform.OS === "android" ? 24 : 0,
  //     },
  //   },
  // };
  render() {
    return (
      // we are animating view
      <View>
        <Button
          large
          buttonStyle={{ backgroundColor: "#F44336", color: "white" }}
          title="Reset Liked Jobs"
          onPress={this.props.clearLikedJobs}
          icon={
            <Icon
              name="delete-forever"
              color="white"
              iconStyle={{ marginRight: 10 }}
            />
          }
        />
        <Button
          large
          title="Logout"
          onPress={() => {
            this.props.onLogout();
            this.props.navigation.navigate("Welcome");
          }}
          icon={
            <Icon
              name="log-out"
              color="white"
              iconStyle={{ marginRight: 10 }}
            />
          }
        />
      </View>
    );
  }
}
function mapDispatchtoProps(dispatch) {
  return {
    clearLikedJobs: (job) =>
      dispatch({
        type: CLEAR_LIKED_JOBS,
      }),
    onLogout: () => dispatch({ type: FACEBOOK_LOGIN_FAIL }),
  };
}
export default connect(null, mapDispatchtoProps)(SettingScreen);
