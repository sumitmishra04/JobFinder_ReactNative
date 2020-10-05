import React, { Component } from "react";
import { View, Text, Platform, Linking } from "react-native";
import { connect } from "react-redux";
import { Card, Button, Icon } from "react-native-elements";
import MapView from "react-native-maps";
import moment from "moment";

import { ScrollView } from "react-native-gesture-handler";
class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Review Jobs",
      tabBarLabel: "Review",
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="description" size={30} color={tintColor} />;
      },
      headerRight: () => (
        <Button
          title="Settings"
          onPress={() => navigation.navigate("settings")}
          type="clear"
          color="rgba(0, 122, 255, 1)"
        />
      ),
      style: {
        marginTop: Platform.OS === "android" ? 24 : 0,
      },
    };
  };
  renderLikedJobs = () => {
    console.log("-------------this.props.likedJobs", this.props.likedJobs);
    return this.props.likedJobs.map((job) => {
      return (
        <Card key={job.id}>
          <Card.Title>
            {job.title.replace(/<strong>/g, "").replace(/<\/strong>/g, "")}
          </Card.Title>
          <Card.Divider />

          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: job.latitude || 37,
                longitude: job.longitude || -122,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02,
              }}
              scrollEnabled={false}
              cacheEnabled={Platform.OS === "android"}
            ></MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>
                {job.title.replace(/<strong>/g, "").replace(/<\/strong>/g, "")}
              </Text>
              <Text style={{ color: "#03A9F4" }}>
                {moment(job.created).fromNow()}
              </Text>
            </View>
          </View>

          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: "#03A9F4",
            }}
            onPress={() => Linking.openURL(job.redirect_url)}
            title="APPLY NOW"
          />
        </Card>
      );
    });
  };
  render() {
    return (
      <View>
        <ScrollView>{this.renderLikedJobs()}</ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    marginTop: 10,
  },
  italics: {
    fontStyle: "italic",
  },
};

export default connect(mapStateToProps)(ReviewScreen);
