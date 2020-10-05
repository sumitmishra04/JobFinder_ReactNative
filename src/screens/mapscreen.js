import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Button, Icon } from "react-native-elements";

class MapScreen extends Component {
  static navigationOptions = {
    style: {
      marginTop: Platform.OS === "android" ? 24 : 0,
    },
    tabBarLabel: "Map",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    },
  };
  state = {
    mapLoaded: false,
    region: {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    },
  };
  componentDidMount() {
    this.setState({ mapLoaded: true });
  }
  onRegionChangeComplete = (region) => {
    this.setState({ region });
  };
  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate("deck");
    });
  };
  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      // we are animating view
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        ></MapView>
        <View style={styles.btnContainer}>
          <Button
            large
            buttonStyle={{
              backgroundColor: "#009688",
              color: "white",
              borderRadius: 0,
              height: 50,
            }}
            title="Search This Area"
            onPress={this.onButtonPress}
            icon={
              <Icon
                name="search"
                color="white"
                iconStyle={{ marginRight: 10 }}
              />
            }
          />
        </View>
      </View>
    );
  }
}

const styles = {
  btnContainer: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    width: "80%",
  },
};
export default connect(null, actions)(MapScreen);
