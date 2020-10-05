import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { connect } from "react-redux";
import Swipe from "../swipe";
import { Card, Button, Icon } from "react-native-elements";
import MapView from "react-native-maps";
import { LIKE_JOB } from "../../actions/types";
import moment from "moment";
class DeckScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "Jobs",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />;
    },
  };
  renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>All done ! </Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>
          There is no more jobs matching your requirement. Please try new
          filters.
        </Text>
        <Button
          large
          buttonStyle={{ backgroundColor: "#03A9F4", color: "white" }}
          title="Back To Map"
          onPress={() => this.props.navigation.navigate("map")}
          icon={
            <Icon
              name="my-location"
              color="white"
              iconStyle={{ marginRight: 10 }}
            />
          }
        />
      </Card>
    );
  };
  renderCard = (job) => {
    return (
      <Card key={job.id}>
        <Card.Title>
          {job.title.replace(/<strong>/g, "").replace(/<\/strong>/g, "")}
        </Card.Title>
        <View style={{ height: 300 }}>
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
        </View>

        <Card.Divider />
        <View style={styles.detailWrapper}>
          <Text>{job.company.display_name}</Text>
          <Text style={{ color: "#03A9F4" }}>
            {moment(job.created).fromNow()}
          </Text>
        </View>
        <Text
          style={{
            marginBottom: 10,
            marginTop: 10,
            color: "#555",
            height: 100,
            paddingTop: 30,
          }}
        >
          {job.description.replace(/<strong>/g, "").replace(/<\/strong>/g, "")}
        </Text>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="VIEW IN DETAIL"
        />
      </Card>
    );
  };
  render() {
    let jobArea = (
      <Swipe
        data={this.props.jobs}
        renderCard={this.renderCard}
        renderNoMoreCards={this.renderNoMoreCards}
        onSwipeRight={(job) => {
          console.log("onSwipeRight", job);
          this.props.likeJob(job);
        }}
        onSwipeLeft={() => {}}
      />
    );

    if (this.props.jobs.results && this.props.jobs.results.length === 0) {
      jobArea = (
        <View>
          <Text>Select area in maps to view jobs</Text>
        </View>
      );
    }
    return <View style={{ marginTop: 10 }}>{jobArea}</View>;
  }
}

function mapStateToProps({ jobs }) {
  return { jobs };
}
function mapDispatchtoProps(dispatch) {
  return {
    likeJob: (job) =>
      dispatch({
        payload: job,
        type: LIKE_JOB,
      }),
  };
}
const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
};

export default connect(mapStateToProps, mapDispatchtoProps)(DeckScreen);
