import React, { Fragment, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {
  Container,
  Content,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
} from "native-base";
//actions
import { logout } from "../../../store/actions/auth";
//constants
import Colors from "../../../constants/Colors";
//components
import GeneralStatusBarColor from "../../../components/UI/statusbar/GeneralStatusBarColor";
import JobList from "../../../components/JobList";
import Text from "../../../components/UI/BodyText";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userLogged);
  const [tabActive, setTabactive] = useState("profile");

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Container>
      <GeneralStatusBarColor
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />
      <Content contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <Icon style={styles.icon} name="person-outline" />
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setTabactive("order")}
              style={styles.tabTextContainer}
            >
              <Text style={styles.tabText}>Pengiriman</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTabactive("profile")}
              style={styles.tabTextContainer}
            >
              <Text style={styles.tabText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.dotContainer}>
            {tabActive === "order" ? (
              <Text style={styles.dot}>•</Text>
            ) : (
              <Text></Text>
            )}

            {tabActive === "profile" ? (
              <Text style={styles.dot}>•</Text>
            ) : (
              <Text></Text>
            )}
          </View>
          {tabActive === "profile" && user ? (
            <Fragment>
              <View style={styles.profileList}>
                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: Colors.primary }}>
                      <Icon active name="person" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>{user.Rider_Name}</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: Colors.primary }}>
                      <Icon active name="car-outline" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>{user.Rider_ID}</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: Colors.primary }}>
                      <Icon active name="call" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>{user.Phone}</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: Colors.primary }}>
                      <Icon active name="card" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>SIM: {user.Type_SIM}</Text>
                  </Body>
                </ListItem>
                <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: Colors.primary }}>
                      <Icon active name="person-circle-outline" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>{`${user.Status_Karyawan} ( ${user.Status} )`}</Text>
                  </Body>
                </ListItem>
              </View>

              <View style={styles.btnLogoutContainer}>
                <Button onPress={logoutHandler} full rounded style={styles.btn}>
                  <Text style={styles.btnText}>Logout</Text>
                </Button>
              </View>
            </Fragment>
          ) : (
            <ScrollView style={styles.orderList}></ScrollView>
          )}
        </View>
      </Content>
    </Container>
  );
};

AccountScreen.navigationOptions = {
  header: () => null,
};

const styles = StyleSheet.create({
  btnLogoutContainer: {
    position: "absolute",
    width: "100%",
    bottom: 15,
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: "#fff",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  btnText: {
    textTransform: "uppercase",
    fontSize: 18,
    color: Colors.primary,
  },
  textOrder: {
    padding: 10,
  },
  orderList: {
    marginTop: 15,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  dot: {
    fontSize: 32,
    color: Colors.primary,
  },
  profileList: {
    marginTop: 10,
    paddingRight: 20,
  },
  tabText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
  },
  tabContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    width: "100%",
    bottom: 0,
    paddingHorizontal: 20,
  },
  tabTextContainer: {
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 30,
    width: 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: "100%",
  },
  profile: {
    height: 100,
    width: 100,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: -50,
    borderRadius: 50,
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 75,
    color: Colors.primary,
  },
});

export default AccountScreen;
