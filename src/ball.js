import React, { Component } from "react";
import { View, Animated } from "react-native";

class Ball extends Component {
  componentWillMount() {
    // ValueXY : where the item is at current point of time
    this.position = new Animated.ValueXY(0, 0); // start
    // spring changes the current position over certain amt of time
    Animated.spring(this.position, {
      toValue: {
        x: 200,
        y: 500,
      },
    }).start(); // finish at 200, 500
  }
  render() {
    return (
      // we are animating view
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball} />
      </Animated.View>
    );
  }
}

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "black",
  },
};

export default Ball;
