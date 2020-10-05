import firebase from "firebase";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AuthScreen from "./src/screens/authscreen";
import DeckScreen from "./src/screens/deckscreen";
import MapScreen from "./src/screens/mapscreen";
import ReviewScreen from "./src/screens/reviewscreen";
import SettingScreen from "./src/screens/settingscreen";
import WelcomeScreen from "./src/screens/welcomescreen";
import { Provider } from "react-redux";
import store from "./store";

const MainNavigator = createBottomTabNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Auth: { screen: AuthScreen },
    main: {
      screen: createBottomTabNavigator(
        {
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: {
                screen: ReviewScreen,
              },
              settings: { screen: SettingScreen },
            }),
          },
        },
        {
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
            showIcon: true,
          },
          tabBarPosition: "bottom",
        }
      ),
    },
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
  }
);
const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyAngD6KZo4u-kXuHDH02jxZfZxRBIrBhZc",
      authDomain: "one-time-password-c8722.firebaseapp.com",
      databaseURL: "https://one-time-password-c8722.firebaseio.com",
      projectId: "one-time-password-c8722",
      storageBucket: "one-time-password-c8722.appspot.com",
      messagingSenderId: "748975274718",
      appId: "1:748975274718:web:dd2ee1c3ebfe9cf942e04f",
      measurementId: "G-GECV324EG4",
    };
    firebase.initializeApp(firebaseConfig);
  }
  // renderNoMoreCards() {
  //   return (
  //     <Card>
  //       <Card.Title>All done ! </Card.Title>
  //       <Card.Divider />
  //       <Text style={{ marginBottom: 10 }}>
  //         There is no more jobs matching your requirement. Please try new
  //         filters.
  //       </Text>
  //       <Button
  //         buttonStyle={{
  //           borderRadius: 0,
  //           marginLeft: 0,
  //           marginRight: 0,
  //           marginBottom: 0,
  //         }}
  //         title="APPLY NEW FILTERS"
  //       />
  //     </Card>
  //   );
  // }
  // renderCard(item) {
  //   return (
  //     <Card key={item.id}>
  //       <Card.Title>{item.text} </Card.Title>
  //       <Card.Divider />
  //       <Card.Image source={{ uri: item.uri }} />
  //       <Text
  //         style={{
  //           marginBottom: 10,
  //           marginTop: 10,
  //           color: "#555",
  //           height: 100,
  //           paddingTop: 30,
  //         }}
  //       >
  //         {item.description}
  //       </Text>
  //       <Button
  //         buttonStyle={{
  //           borderRadius: 0,
  //           marginLeft: 0,
  //           marginRight: 0,
  //           marginBottom: 0,
  //         }}
  //         title="VIEW IN DETAIL"
  //       />
  //     </Card>
  //   );
  // }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppContainer />
          {/* <SignupForm />
        <SigninForm />
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        /> */}
        </View>
      </Provider>
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
