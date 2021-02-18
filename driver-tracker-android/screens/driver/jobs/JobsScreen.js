import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Container, Tab, Tabs, Content } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
//actions
import { getJobs, getJobsToday } from "../../../store/actions/jobs";
//constants
import Colors from "../../../constants/Colors";
import Fonts from "../../../constants/Fonts";
//components
import JobList from "../../../components/JobList";
import GeneralStatusBarColor from "../../../components/UI/statusbar/GeneralStatusBarColor";
import Text from "../../../components/UI/BodyText";

const JobsScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userLogged);
  const loading = useSelector((state) => state.jobs.loading);
  const jobs = useSelector((state) => state.jobs.jobs);
  const jobsToday = useSelector((state) => state.jobs.jobsToday);
  const [tabPostion, setTabPosition] = useState("daily");
  const [date, setDate] = useState(new Date("2016-09-13"));
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    onFetchJobsDay();
    onFetchJobsMonth();
  };

  const onChangeTabHandler = () => {
    if (tabPostion === "daily") {
      setTabPosition("monthly");
      onFetchJobsMonth();
    }
  };

  const onFetchJobsDay = useCallback(() => {
    if (user) {
      dispatch(getJobsToday(user.Rider_Name, date));
    }
  }, [dispatch]);

  const onFetchJobsMonth = useCallback(() => {
    if (user) {
      dispatch(getJobs(user.Rider_Name, date));
    }
  }, [dispatch]);

  useEffect(() => {
    onFetchJobsDay();
  }, [onFetchJobsDay]);

  let jobsList =
    jobs.length > 0 && !loading ? (
      <View style={styles.tabBodyContainer}>
        <FlatList
          onRefresh={onFetchJobsMonth}
          refreshing={loading}
          data={jobs}
          keyExtractor={(item) => item.ID + "awb1"}
          key="awb1"
          renderItem={(itemData) => <JobList awb={itemData.item} />}
        />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={styles.centered}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onFetchJobsMonth} />
        }
      >
        <Text>Tidak ada pengiriman untuk di tampilkan!</Text>
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
          renderItem={(itemData) => <JobList awb={itemData.item} />}
        />
      </View>
    ) : (
      <ScrollView
        contentContainerStyle={styles.centered}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onFetchJobsDay} />
        }
      >
        <Text>Tidak ada pengiriman untuk di tampilkan!</Text>
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
            <TouchableOpacity onPress={() => setShow((show) => !show)}>
              <Text style={{ color: "grey" }} bold>
                Tanggal: {date.toString().substr(4, 12)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabContainer}>
            <Tabs
              tabContainerStyle={{ elevation: 0 }}
              tabBarUnderlineStyle={styles.tabUnderline}
              onChangeTab={() => onChangeTabHandler()}
            >
              <Tab
                textStyle={styles.textStyle}
                activeTextStyle={styles.textStyleActive}
                activeTabStyle={styles.tabStyleActive}
                tabStyle={styles.tabStyle}
                heading="Harian"
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
                heading="Bulananan"
              >
                {loading ? (
                  <View style={styles.tabBodyContainer}>
                    <View style={{ height: "100%", justifyContent: "center" }}>
                      <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
                  </View>
                ) : (
                  jobsList
                )}
              </Tab>
            </Tabs>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            textColor={Colors.primary}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
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
    marginBottom: 100,
  },
});

export default JobsScreen;
