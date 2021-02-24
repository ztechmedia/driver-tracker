import React from "react";
import Text from "../components/UI/BodyText";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

//auth screens
import StartupScreen from "../screens/StartupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import JobsScreen from "../screens/driver/JobsScreen";
import ActiveJobScreen from "../screens/driver/ActiveJobScreen";
import AccountScreen from "../screens/driver/AccountScreen";

//load constants
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTitleStyle: {
    fontFamily: Fonts.themeBold,
  },
  headerBackTitleStyle: {
    fontFamily: Fonts.themeRegular,
  },
  headerTintColor: Colors.primary,
};

const AuthNavigator = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    RegisterScreen: RegisterScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const DriverTrackerNavigator = createStackNavigator(
  {
    JobsScreen: JobsScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ActiveDriverTrackerNavigator = createStackNavigator(
  {
    ActiveJobScreen: ActiveJobScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AccountNavigator = createStackNavigator(
  {
    AccountScreen: AccountScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const tabScreenConfig = {
  Home: {
    screen: DriverTrackerNavigator,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="home-outline" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
      tabBarLabel: <Text>Beranda</Text>,
    },
  },
  Sending: {
    screen: ActiveDriverTrackerNavigator,
    navigationOptions: {
      tabBarLabel: "Sending",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="car-outline" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
      tabBarLabel: <Text>Pengiriman</Text>,
    },
  },
  Account: {
    screen: AccountNavigator,
    navigationOptions: {
      tabBarLabel: "Account",
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="person-outline" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
      tabBarLabel: <Text>Profile</Text>,
    },
  },
};

const DriverTrackerTabNavigator = createMaterialBottomTabNavigator(
  tabScreenConfig,
  {
    activeColor: "white",
    shifting: true,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  DriverTracker: DriverTrackerTabNavigator,
});

export default createAppContainer(MainNavigator);
