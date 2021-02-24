import React, { useState } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

//load nativebase custom theme
import { Root, StyleProvider } from "native-base";
import theme from "./themes";

//load store
import store from "./store/createStore";

//load navigation
import NavigationContainer from "./navigation/NavigationContainer";

LogBox.ignoreAllLogs();

export default function App(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <Root>
      <StyleProvider style={theme()}>
        <Provider store={store}>
          <NavigationContainer />
        </Provider>
      </StyleProvider>
    </Root>
  );
}
