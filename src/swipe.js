import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPEOUT_DURATION = 250;

class Swipe extends Component {
  // static defaultProps = {
  //   onSwipeLeft() {},
  //   onSwipeRight() {},
  // };
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      // reposible for tap touch
      onStartShouldSetPanResponder: () => true,
      // responsible for drag event
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      // resposible for action when user release touch
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      },
    });
    this.state = { panResponder, position, index: 0 };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  forceSwipe(direction) {
    const screenWidth = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: {
        x: screenWidth,
        y: 0,
      },
      duration: SWIPEOUT_DURATION,
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];

    if (onSwipeRight && onSwipeLeft) {
      direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    }

    this.setState({ index: this.state.index + 1 });
    this.state.position.setValue({ x: 0, y: 0 });
  }
  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: {
        x: 0,
        y: 0,
      },
    }).start();
  }
  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...this.state.position.getLayout(),
      transform: [{ rotate }],
    };
  }
  renderCards = () => {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    const deck = this.props.data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item.id}
              style={[this.getCardStyle(), styles.cardStyle]}
              {...this.state.panResponder.panHandlers}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.cardStyle,
              { top: 5 * (i - this.state.index), zIndex: -i },
            ]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
    return Platform.OS === "android" ? deck : deck.reverse();
  };
  render() {
    return <View>{this.renderCards()}</View>;
  }
}
const styles = {
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
};
export default Swipe;
