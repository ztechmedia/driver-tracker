import React from "react";
import { Text, StyleSheet } from "react-native";

import Fonts from "../../constants/Fonts";

const BodyText = (props) => {
  let text = props.bold ? (
    <Text style={{ ...styles.textBold, ...props.style }}>{props.children}</Text>
  ) : (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );

  return text;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.themeRegular,
    fontSize: Fonts.body,
  },
  textBold: {
    fontFamily: Fonts.themeBold,
    fontSize: Fonts.body,
  },
});

export default BodyText;
