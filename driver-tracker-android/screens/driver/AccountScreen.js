import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  Container,
  Content,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
  Tab,
  Tabs,
} from "native-base";
//actions
import { logout } from "../../store/actions/auth";
import {
  getFailedJobs,
  getCanceledJobs,
  getReceivedJobs,
  activateJob,
} from "../../store/actions/history-jobs";
//constants
import Colors from "../../constants/Colors";
//components
import GeneralStatusBarColor from "../../components/UI/statusbar/GeneralStatusBarColor";
import Text from "../../components/UI/BodyText";
import DatePicker from "../../components/DatePicker";
import JobList from "../../components/JobList";

const AccountScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userLogged);
  const loading = useSelector((state) => state.historyJobs.loading);
  const loading1 = useSelector((state) => state.historyJobs.loading1);
  const jobsFailed = useSelector((state) => state.historyJobs.jobsFailed);
  const jobsCanceled = useSelector((state) => state.historyJobs.jobsCanceled);
  const jobsReceived = useSelector((state) => state.historyJobs.jobsReceived);
  const [tabJobPostion, setTabJobPosition] = useState();
  const [tabActive, setTabactive] = useState("profile");
  const [month, setMonth] = useState(new Date("2016-09-13").getMonth() + 1);
  const [year, setYear] = useState(new Date("2016-09-13").getFullYear());

  const onChangeMonthHandler = (value) => {
    setMonth(value);
  };

  const onChangeYearHandler = (value) => {
    setYear(value);
  };

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const onChangeTabHandler = (i) => {
    setTabJobPosition(i);
    if (i === 0) {
      onFetchJobsFailedHandler();
    } else if (i === 1) {
      onFetchJobsCanceledHandler();
    } else if (i === 2) {
      onFetchJobsReceivedHandler();
    }
  };

  const onActivateHandler = (id) => {
    Alert.alert(
      "Mulai Pengiriman",
      "Apakah anda yakin akan mengaktifkan kembali pengiriman ini?, jika di aktifkan maka pengiriman akan langsung masuk ke Tab Pengiriman Ulang ?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Mulai",
          onPress: () =>
            dispatch(activateJob(id, "ATTEMP DELIVERY", tabJobPostion)),
        },
      ]
    );
  };

  const onFetchJobsFailedHandler = useCallback(() => {
    if (user) {
      dispatch(getFailedJobs(user.Rider_Name, year, month));
    }
  }, [dispatch, year, month]);

  const onFetchJobsCanceledHandler = useCallback(() => {
    if (user) {
      dispatch(getCanceledJobs(user.Rider_Name, year, month));
    }
  }, [dispatch, year, month]);

  const onFetchJobsReceivedHandler = useCallback(() => {
    if (user) {
      dispatch(getReceivedJobs(user.Rider_Name, year, month));
    }
  }, [dispatch, year, month]);

  const reuploadDocumentHandler = (awbId) => {
    props.navigation.navigate("UploadDocumentScreen", {
      awbId: awbId,
      position: "account",
    });
  };

  const imageDetailHandler = (imgUrl, awbNo) => {
    console.log(imgUrl);
    props.navigation.navigate("ImageDetailScreen", { imgUrl, awbNo });
  };

  useEffect(() => {
    if ((year, month)) {
      onFetchJobsFailedHandler();
    }
  }, [onFetchJobsFailedHandler]);

  let jobsFailedList =
    jobsFailed.length > 0 && !loading ? (
      <View style={styles.tabBodyContainer}>
        <FlatList
          onRefresh={onFetchJobsFailedHandler}
          refreshing={loading}
          data={jobsFailed}
          keyExtractor={(item) => item.ID + "awb1"}
          key="awb1"
          renderItem={(itemData) => (
            <JobList
              idleText="Aktifkan Kembali"
              loading={loading1}
              onStartOrder={onActivateHandler}
              awb={itemData.item}
            />
          )}
        />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={styles.centered}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onFetchJobsFailedHandler}
          />
        }
      >
        <Text>Tidak ada pengiriman gagal bulan ini</Text>
      </ScrollView>
    );

  let jobsCanceledList =
    jobsCanceled.length > 0 && !loading ? (
      <View style={styles.tabBodyContainer}>
        <FlatList
          onRefresh={onFetchJobsCanceledHandler}
          refreshing={loading}
          data={jobsCanceled}
          keyExtractor={(item) => item.ID + "awb1"}
          key="awb1"
          renderItem={(itemData) => (
            <JobList
              idleText="Aktifkan Kembali"
              loading={loading1}
              onStartOrder={onActivateHandler}
              awb={itemData.item}
            />
          )}
        />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={styles.centered}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onFetchJobsCanceledHandler}
          />
        }
      >
        <Text>Tidak ada pengiriman dibatalkan bulan ini</Text>
      </ScrollView>
    );

  let jobsReceivedList =
    jobsReceived.length > 0 && !loading ? (
      <View style={styles.tabBodyContainer}>
        <FlatList
          onRefresh={onFetchJobsCanceledHandler}
          refreshing={loading}
          data={jobsReceived}
          keyExtractor={(item) => item.ID + "awb1"}
          key="awb1"
          renderItem={(itemData) => (
            <JobList
              idleText="Aktifkan Kembali"
              loading={loading1}
              onStartOrder={onActivateHandler}
              awb={itemData.item}
              onReuploadDocument={reuploadDocumentHandler}
              onImageDetail={imageDetailHandler}
            />
          )}
        />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={styles.centered}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onFetchJobsReceivedHandler}
          />
        }
      >
        <Text>Tidak ada pengiriman selesai bulan ini</Text>
      </ScrollView>
    );

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
            <Fragment>
              <View
                style={{
                  marginTop: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DatePicker
                  style={{ marginTop: -15, marginBottom: 0 }}
                  month={month}
                  year={year}
                  onChangeMonth={onChangeMonthHandler}
                  onChangeYear={onChangeYearHandler}
                  config={{
                    month: {
                      width: "70%",
                    },
                    year: {
                      width: "30%",
                    },
                  }}
                />
              </View>
              <View style={{ height: "100%" }}>
                <Tabs
                  tabBarUnderlineStyle={styles.tabUnderline}
                  onChangeTab={({ i }) => onChangeTabHandler(i)}
                >
                  <Tab
                    textStyle={styles.textStyle}
                    activeTextStyle={styles.textStyleActive}
                    activeTabStyle={styles.tabStyleActive}
                    tabStyle={styles.tabStyle}
                    heading="Gagal"
                  >
                    {loading ? (
                      <View style={styles.tabBodyContainer}>
                        <View
                          style={{ height: "100%", justifyContent: "center" }}
                        >
                          <ActivityIndicator
                            size="large"
                            color={Colors.primary}
                          />
                        </View>
                      </View>
                    ) : (
                      jobsFailedList
                    )}
                  </Tab>
                  <Tab
                    textStyle={styles.textStyle}
                    activeTextStyle={styles.textStyleActive}
                    activeTabStyle={styles.tabStyleActive}
                    tabStyle={styles.tabStyle}
                    heading="Dibatalkan"
                  >
                    {loading ? (
                      <View style={styles.tabBodyContainer}>
                        <View
                          style={{ height: "100%", justifyContent: "center" }}
                        >
                          <ActivityIndicator
                            size="large"
                            color={Colors.primary}
                          />
                        </View>
                      </View>
                    ) : (
                      jobsCanceledList
                    )}
                  </Tab>
                  <Tab
                    textStyle={styles.textStyle}
                    activeTextStyle={styles.textStyleActive}
                    activeTabStyle={styles.tabStyleActive}
                    tabStyle={styles.tabStyle}
                    heading="Selesai"
                  >
                    {loading ? (
                      <View style={styles.tabBodyContainer}>
                        <View
                          style={{ height: "100%", justifyContent: "center" }}
                        >
                          <ActivityIndicator
                            size="large"
                            color={Colors.primary}
                          />
                        </View>
                      </View>
                    ) : (
                      jobsReceivedList
                    )}
                  </Tab>
                </Tabs>
              </View>
            </Fragment>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabUnderline: {
    backgroundColor: Colors.primary,
    height: 2,
    borderRadius: 20,
  },
  tabStyle: {
    backgroundColor: "#fff",
  },
  tabStyleActive: {
    backgroundColor: "#fff",
    color: Colors.primary,
  },
  textStyle: {
    color: Colors.primary,
    textTransform: "uppercase",
  },
  textStyleActive: {
    color: Colors.primary,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  tabBodyContainer: {
    marginBottom: 100,
  },
  //
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
