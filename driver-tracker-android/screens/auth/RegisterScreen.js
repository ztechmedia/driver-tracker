import React, { useReducer, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import {
  Container,
  Content,
  Button,
  ListItem,
  Left,
  Icon,
  Body,
} from "native-base";

//actions
import { checkPhone, createPassword } from "../../store/actions/auth";
//reducers
import { FORM_UPDATE, formReducer } from "../../utils/formReducer";
//components
import Input from "../../components/UI/InputGenerator";
import Text from "../../components/UI/BodyText";
//constants
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

const RegisterScreen = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const loadingPassword = useSelector((state) => state.auth.loadingPassword);
  const kurir = useSelector((state) => state.auth.kurir);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      phone: "",
    },
    inputValidities: {
      phone: true,
    },
    formIsValid: true,
  });

  const onCheckPhoneHandler = useCallback(() => {
    dispatch(checkPhone(formState.inputValues.phone));
  }, [dispatch, formState]);

  const onCreatePasswordHandler = useCallback(() => {
    dispatch(createPassword(kurir.Phone));
  }, [dispatch, kurir]);

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

  useEffect(() => {
    if (kurir) {
      props.navigation.navigate("CreatePasswordScreen", {
        kurir,
      });
    }
  }, [kurir]);

  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        <View style={{ marginTop: 30, paddingLeft: 10 }}>
          <Icon
            onPress={() => props.navigation.goBack()}
            name="arrow-back-outline"
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
        >
          <Input
            id="phone"
            type="icon-textbox"
            iconName="call-outline"
            label="No Hp"
            keyboardType="number-pad"
            required
            autoCapitalize="none"
            errorText="Masukan nomer hp dengan benar"
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.phone}
          />

          <View>
            <Button
              full
              rounded
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
              }}
              onPress={onCheckPhoneHandler}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: Fonts.btn,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {loading ? "Mengecek..." : "Cek No HP"}
              </Text>
            </Button>
          </View>
        </View>
        {kurir && (
          <View
            animation="fadeInUpBig"
            style={{
              flex: 1,
              paddingHorizontal: 10,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: Colors.primary,
              paddingVertical: 20,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: Colors.primary }}>
                  <Icon active name="person" />
                </Button>
              </Left>
              <Body>
                <Text>{kurir.Rider_Name}</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: Colors.primary }}>
                  <Icon active name="car-outline" />
                </Button>
              </Left>
              <Body>
                <Text>{kurir.Rider_ID}</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: Colors.primary }}>
                  <Icon active name="call" />
                </Button>
              </Left>
              <Body>
                <Text>{kurir.Phone}</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: Colors.primary }}>
                  <Icon active name="card" />
                </Button>
              </Left>
              <Body>
                <Text>SIM: {kurir.Type_SIM}</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: Colors.primary }}>
                  <Icon active name="person-circle-outline" />
                </Button>
              </Left>
              <Body>
                <Text>{`${kurir.Status_Karyawan} ( ${kurir.Status} )`}</Text>
              </Body>
            </ListItem>
            <View style={{ marginTop: 10 }}>
              <Button
                full
                rounded
                style={{
                  color: Colors.primary,
                  backgroundColor: "#fff",
                }}
                onPress={onCreatePasswordHandler}
              >
                <Text
                  style={{
                    fontSize: Fonts.btn,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: Colors.primary,
                  }}
                >
                  {loadingPassword ? "Membuatkan password..." : "Buat Password"}
                </Text>
              </Button>
            </View>
          </View>
        )}
      </Content>
    </Container>
  );
};

RegisterScreen.navigationOptions = {
  header: () => null,
};

export default RegisterScreen;
