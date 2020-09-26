import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Deck from "./src/deck";
import { Card, Button, Icon } from "react-native-elements";
import { DATA } from "./src/data";

export default class App extends Component {
  renderNoMoreCards() {
    return (
      <Card>
        <Card.Title>All done ! </Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>
          There is no more jobs matching your requirement. Please try new
          filters.
        </Text>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="APPLY NEW FILTERS"
        />
      </Card>
    );
  }
  renderCard(item) {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text} </Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: item.uri }} />
        <Text
          style={{
            marginBottom: 10,
            marginTop: 10,
            color: "#555",
            height: 100,
            paddingTop: 30,
          }}
        >
          {item.description}
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    flex: 1,
    backgroundColor: "#fff",
  },
});
