import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, ActivityIndicator, StyleSheet } from "react-native";
//actions
import { authCheckState } from "../store/actions/auth";
//constants
import Colors from "../constants/Colors";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch, authCheckState]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
