import React, { useReducer, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Label, Input, Item, Icon } from "native-base";

//constants
import Colors from "../../constants/Colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputGenerator = (props) => {
  const { onInputChange, id } = props;
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    let isValid = true;
    if (props.required) isValid = text.trim() !== "" && isValid;
    if (props.min) isValid = +text >= props.min;
    if (props.max) isValid = +text <= props.max;
    if (props.minLength) isValid = text.length >= props.minLength && isValid;
    if (props.maxLength) isValid = text.length <= props.maxLength && isValid;
    if (props.isEmail) {
      const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      isValid = pattern.test(text) && isValid;
    }
    if (props.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(text) && isValid;
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatch({
      type: INPUT_BLUR,
    });
  };

  let inputElement;

  switch (props.type) {
    case "icon-textbox":
      inputElement = (
        <Item
          style={styles.item}
          error={!inputState.isValid && inputState.touched}
          floatingLabel
        >
          <Label>{props.label}</Label>
          <Icon
            onPress={props.onSetVisibility ? props.onSetVisibility : null}
            style={styles.icon}
            active
            name={props.iconName}
          />
          <Input
            style={styles.input}
            {...props}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
          />
        </Item>
      );
      break;
  }

  return (
    <View style={styles.inputContainer}>
      {inputElement}
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  errorContainer: {
    marginLeft: 0,
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  item: {
    borderColor: Colors.primary,
  },
  itemSuccess: {
    borderColor: Colors.primary,
  },
});

export default InputGenerator;
