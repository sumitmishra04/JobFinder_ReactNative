import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

class Slide extends Component {
  renderLastSlide = (index) => {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Onwards!"
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
        ></Button>
      );
    }
  };
  renderSlides = () => {
    return this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slide, { backgroundColor: slide.color }]}
        >
          <Text style={styles.slideText}>{slide.text}</Text>
          {this.renderLastSlide(index)}
        </View>
      );
    });
  };
  render() {
    const slides = this.renderSlides();
    // console.log(slides);
    return (
      <View>
        <ScrollView horizontal pagingEnabled style={{ height: "100%" }}>
          {slides}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  slide: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
  },
  slideText: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "#0288D1",
    width: "50%",
    marginLeft: "25%",
    marginTop: "15%",
  },
};
export default Slide;
