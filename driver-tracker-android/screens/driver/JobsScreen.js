import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Container, Tab, Tabs, Content } from "native-base";
//actions
import {
  getJobsAttemp,
  getJobsToday,
  jobSendStatus,
} from "../../store/actions/jobs";
//constants
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
//components
import JobList from "../../components/JobList";
import GeneralStatusBarColor from "../../components/UI/statusbar/GeneralStatusBarColor";
import Text from "../../components/UI/BodyText";
import DatePicker from "../../components/DatePicker";

const JobsScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userLogged);
  const loading = useSelector((state) => state.jobs.loading);
  const loading1 = useSelector((state) => state.jobs.loading1);
  const jobsToday = useSelector((state) => state.jobs.jobsToday);
  const jobsAttemp = useSelector((state) => state.jobs.jobsAttemp);
  const [tabPostion, setTabPosition] = useState("daily");
  const [day, setDay] = useState(new Date("2016-09-13").getDate());
  const [month, setMonth] = useState(new Date("2016-09-13").getMonth() + 1);
  const [year, setYear] = useState(new Date("2016-09-13").getFullYear());

  const onChangeDateHandler = (value) => {
    setDay(value);
    onFetchJobsDay();
  };

  const onChangeMonthHandler = (value) => {
    setMonth(value);
    onFetchJobsDay();
    if (value !== month) {
      onFetchJobsAttemp();
    }
  };

  const onChangeYearHandler = (value) => {
    setYear(value);
    onFetchJobsDay();
  };

  const onChangeTabHandler = () => {
    if (tabPostion === "daily") {
      setTabPosition("attemp");
      onFetchJobsAttemp();
    } else {
      setTabPosition("daily");
    }
  };

  const onFetchJobsDay = useCallback(() => {
    if (user) {
      const date = `${year}-${month}-${day}`;
      dispatch(getJobsToday(user.Rider_Name, date));
    }
  }, [dispatch, year, month, day]);

  const onFetchJobsAttemp = useCallback(() => {
    if (user) {
      const date = `${year}-${month}-${day}`;
      dispatch(getJobsAttemp(user.Rider_Name, date));
    }
  }, [dispatch, year, month, day]);

  const onStartOrderHandler = (id) => {
    const job = tabPostion === "daily" ? "today" : "attemp";
    const date = job === "attemp" ? `${year}-${month}-${day}` : null;
    Alert.alert(
      "Mulai Pengiriman",
      "Apakah anda yakin akan memulai pengiriman ?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Mulai",
          onPress: () => dispatch(jobSendStatus(id, "DELIVERY", job, date)),
        },
      ]
    );
  };

  useEffect(() => {
    if (year && month && day) {
      onFetchJobsDay();
    }
  }, [onFetchJobsDay]);

  let jobsAttempList =
    jobsAttemp.length > 0 && !loading ? (
      <View style={styles.tabBodyContainer}>
        <FlatList
          onRefresh={onFetchJobsAttemp}
          refreshing={loading}
          data={jobsAttemp}
          keyExtractor={(item) => item.ID + "awb1"}
          key="awb1"
          renderItem={(itemData) => (
            <JobList
              idleText="Mulai Pengiriman"
              loading={loading1}
              onStartOrder={onStartOrderHandler}
              awb={itemData.item}
            />
          )}
        />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={styles.centered}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onFetchJobsAttemp} />
        }
      >
        <Text>
          Tidak ada pengiriman tanggal: {`${day} / ${month} / ${year}`}
        </Text>
      </ScrollView>
    );

  let jobsTodayList =
    jobsToday.length > 0 && !loading ? (
      <View style={styles.tabBodyContainer}>
        <FlatList
          onRefresh={onFetchJobsDay}
          refreshing={loading}
          data={jobsToday}
          keyExtractor={(item) => item.ID + "awb2"}
          key="awb2"
          renderItem={(itemData) => (
            <JobList
              idleText="Mulai Pengiriman"
              loading={loading1}
              onStartOrder={onStartOrderHandler}
              awb={itemData.item}
            />
          )}
        />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={styles.centered}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onFetchJobsDay} />
        }
      >
        <Text>
          Tidak ada pengiriman tanggal: {`${day} / ${month} / ${year}`}
        </Text>
      </ScrollView>
    );

  return (
    <Container>
      <GeneralStatusBarColor
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />
      <Content contentContainerStyle={styles.content}>
        <View style={styles.header}></View>
        <View animation="fadeInUpBig" style={styles.footer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Daftar Pengiriman</Text>
          </View>
          <DatePicker
            style={{ marginTop: -30, marginBottom: 10 }}
            day={day}
            month={month}
            year={year}
            onChangeDate={onChangeDateHandler}
            onChangeMonth={onChangeMonthHandler}
            onChangeYear={onChangeYearHandler}
            config={{
              day: {
                width: "25%",
              },
              month: {
                width: "45%",
              },
              year: {
                width: "30%",
              },
            }}
          />
          <View style={styles.tabContainer}>
            <Tabs
              tabBarUnderlineStyle={styles.tabUnderline}
              onChangeTab={onChangeTabHandler}
            >
              <Tab
                textStyle={styles.textStyle}
                activeTextStyle={styles.textStyleActive}
                activeTabStyle={styles.tabStyleActive}
                tabStyle={styles.tabStyle}
                heading="Baru"
              >
                {loading ? (
                  <View style={styles.tabBodyContainer}>
                    <View style={{ height: "100%", justifyContent: "center" }}>
                      <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
                  </View>
                ) : (
                  jobsTodayList
                )}
              </Tab>
              <Tab
                textStyle={styles.textStyle}
                activeTextStyle={styles.textStyleActive}
                activeTabStyle={styles.tabStyleActive}
                tabStyle={styles.tabStyle}
                heading="Pengiriman Ulang"
              >
                {loading ? (
                  <View style={styles.tabBodyContainer}>
                    <View style={{ height: "100%", justifyContent: "center" }}>
                      <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
                  </View>
                ) : (
                  jobsAttempList
                )}
              </Tab>
            </Tabs>
          </View>
        </View>
      </Content>
    </Container>
  );
};

JobsScreen.navigationOptions = {
  header: () => null,
};

const styles = StyleSheet.create({
  btnDate: {
    backgroundColor: "grey",
    width: 80,
    height: 30,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    height: 65,
  },
  footer: {
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  title: {
    top: -25,
    width: "80%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  titleText: {
    textAlign: "center",
    fontSize: Fonts.title,
    fontWeight: "bold",
    color: Colors.primary,
    textTransform: "uppercase",
  },
  tabContainer: {
    top: -15,
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
    marginBottom: 150,
  },
});

export default JobsScreen;
