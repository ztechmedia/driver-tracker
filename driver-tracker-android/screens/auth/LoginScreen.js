import React, { useReducer, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Keyboard, Alert } from "react-native";
import { Container, Content, Button } from "native-base";
import * as Animatable from "react-native-animatable";
//actions
import { login } from "../../store/actions/auth";
//components
import Input from "../../components/UI/InputGenerator";
import Text from "../../components/UI/BodyText";
//reducers
import { FORM_UPDATE, formReducer } from "../../utils/formReducer";
//constants
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const [passVisibility, setPassVisibility] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      phone: "081317810060",
      password: "123456",
    },
    inputValidities: {
      phone: true,
      password: true,
    },
    formIsValid: true,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        input: inputIdentifier,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatchFormState]
  );

  const onSubmitHandler = () => {
    Keyboard.dismiss();
    dispatch(
      login(formState.inputValues.phone, formState.inputValues.password)
    );
  };

  const setVisibilityhandler = () => {
    setPassVisibility((visible) => !visible);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error.toString(), [{ text: "Closed" }]);
    }
  }, [error]);

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Welcome!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <View>
            <Input
              id="phone"
              type="icon-textbox"
              iconName="call-outline"
              label="No HP"
              keyboardType="number-pad"
              required
              autoCapitalize="none"
              errorText="Masukan nomor hp dengan benar"
              onInputChange={inputChangeHandler}
              initialValue={formState.inputValues.phone}
            />

            <Input
              id="password"
              type="icon-textbox"
              iconName={passVisibility ? "eye-outline" : "eye-off-outline"}
              label="Password"
              keyboardType="default"
              required
              secureTextEntry={!passVisibility}
              onSetVisibility={setVisibilityhandler}
              autoCapitalize="none"
              errorText="Masukan password"
              onInputChange={inputChangeHandler}
              initialValue={formState.inputValues.password}
            />
          </View>

          <View style={styles.btnContainer}>
            <Button
              full
              rounded
              style={styles.btnLogin}
              onPress={onSubmitHandler}
            >
              <Text style={styles.textLogin}>
                {loading ? "Loading..." : "Masuk"}
              </Text>
            </Button>
            <Button
              full
              rounded
              style={styles.btnRegister}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={styles.textRegister}>Buat Akun</Text>
            </Button>
          </View>

          <View style={styles.copyright}>
            <Text>@Copyright IT Development 2021</Text>
          </View>
        </Animatable.View>
      </Content>
    </Container>
  );
};

LoginScreen.navigationOptions = {
  header: () => null,
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Fonts.header,
  },
  textFooter: {
    color: "#05375a",
    fontSize: Fonts.footer,
  },
  btnContainer: {
    width: "100%",
    marginTop: 30,
  },
  btnLogin: {
    borderColor: "#ccc",
    borderWidth: 1,
  },
  textLogin: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Fonts.btn,
    textTransform: "uppercase",
  },
  btnRegister: {
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: "#ccc",
    marginTop: 15,
  },
  textRegister: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: Fonts.btn,
    textTransform: "uppercase",
  },
  images: {
    width: 100,
    height: 100,
  },
  copyright: {
    width: "100%",
    alignItems: "center",
    bottom: 30,
    position: "absolute",
    marginLeft: 20,
  },
});

export default LoginScreen;
