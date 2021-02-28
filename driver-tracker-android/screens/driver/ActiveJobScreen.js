import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withNavigationFocus } from "react-navigation";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import {
  Container,
  Content,
  Tab,
  Tabs,
  ScrollableTab,
  List,
  ListItem,
  Button,
  Body,
  Left,
  Icon,
} from "native-base";
import {
  HeaderButtons,
  Item as HeaderItem,
} from "react-navigation-header-buttons";
import { Table, TableWrapper, Rows, Col } from "react-native-table-component";
//constants
import Colors from "../../constants/Colors";
//components
import HeaderButton from "../../components/UI/HeaderButton";
import Text from "../../components/UI/BodyText";
import DatePicker from "../../components/DatePicker";
//actios
import {
  getActiveJobs,
  jobActiveSendStatus,
} from "../../store/actions/active-jobs";
import Fonts from "../../constants/Fonts";

const height = Dimensions.get("window").height;

const ActiveJobScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const user = useSelector((state) => state.auth.userLogged);
  const loading = useSelector((state) => state.activeJobs.loading);
  const loading1 = useSelector((state) => state.activeJobs.loading1);
  const activeJobs = useSelector((state) => state.activeJobs.activeJobs);
  const [awbId, setAwbId] = useState(null);
  const [show, setShow] = useState(false);
  const [day, setDay] = useState(new Date("2016-09-13").getDate());
  const [month, setMonth] = useState(new Date("2016-09-13").getMonth() + 1);
  const [year, setYear] = useState(new Date("2016-09-13").getFullYear());

  const onChangeDateHandler = (value) => {
    setDay(value);
  };

  const onChangeMonthHandler = (value) => {
    setMonth(value);
  };

  const onChangeYearHandler = (value) => {
    setYear(value);
  };

  const onChangeAwbId = (awbId) => {
    setAwbId(awbId);
  };

  const onCloseStatus = () => {
    setAwbId(null);
    setShow(false);
  };

  const onChangeStatusHandler = useCallback(
    (status) => {
      dispatch(jobActiveSendStatus(awbId, status));
      onCloseStatus();
    },
    [dispatch, awbId]
  );

  const onGetActiveJobsHandler = useCallback(() => {
    const date = `${year}-${month}-${day}`;
    if (user) {
      dispatch(getActiveJobs(user.Rider_Name, date));
    }
  }, [dispatch, year, month, day]);

  useEffect(() => {
    if (year && month && day) {
      onGetActiveJobsHandler();
      navigation.setParams({ getActiveJobs: onGetActiveJobsHandler });
    }
  }, [onGetActiveJobsHandler]);

  useEffect(() => {
    if (awbId !== null) {
      setShow(true);
    }
  }, [awbId]);

  let activeJobsList =
    !loading && activeJobs.length > 0 ? (
      <Tabs
        renderTabBar={() => (
          <ScrollableTab
            tabsContainerStyle={styles.tabContainer}
            underlineStyle={styles.underlineStyle}
          />
        )}
      >
        {activeJobs.map((job) => {
          const tableTitle = [
            "Account Name",
            "Origin",
            "Destination",
            "Consigne",
            "Address",
          ];

          const tableData = [
            [`${job.Account_Name}`],
            [`${job.Origin}`],
            [`${job.Destination}`],
            [`${job.Consignee_Name}`],
            [`${job.Consignee_Addr}`],
          ];
          return (
            <Tab
              textStyle={styles.textStyle}
              activeTextStyle={styles.textStyleActive}
              activeTabStyle={styles.tabStyleActive}
              tabStyle={styles.tabStyle}
              heading={job.Account_Name}
              key={job.AWB_No}
            >
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={onGetActiveJobsHandler}
                  />
                }
              >
                <List>
                  <ListItem itemDivider>
                    <Text>No. AWB</Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      {job.AWB_No} (Status:{" "}
                      <Text
                        bold
                        style={
                          job.AWB_Status === "FAILED DELIVERY"
                            ? { color: "red" }
                            : null
                        }
                      >
                        {job.AWB_Status}
                      </Text>
                      )
                    </Text>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>Tujuan</Text>
                  </ListItem>

                  <ListItem>
                    <View style={styles.container}>
                      <Table
                        borderStyle={{
                          borderWidth: 1,
                          borderColor: "#000",
                        }}
                      >
                        <TableWrapper style={styles.wrapper}>
                          <Col
                            data={tableTitle}
                            style={styles.title}
                            heightArr={[50, 28, 28, 50, 50]}
                            textStyle={{
                              ...styles.text,
                              color: "#fff",
                            }}
                          />
                          <Rows
                            data={tableData}
                            flexArr={[2]}
                            heightArr={[50, 28, 28, 50, 50]}
                            textStyle={styles.text}
                          />
                        </TableWrapper>
                      </Table>
                    </View>
                  </ListItem>
                </List>
              </ScrollView>
              <View style={{ marginBottom: 15, paddingHorizontal: 20 }}>
                {job.AWB_Status === "RECEIVED" ? (
                  <Button
                    full
                    rounded
                    style={{
                      backgroundColor: "orange",
                      borderWidth: 1,
                      borderColor: "#ccc",
                    }}
                    onPress={() =>
                      navigation.navigate("UploadDocumentScreen", {
                        awbId: job.ID,
                      })
                    }
                  >
                    <Text
                      style={{
                        color: "#fff",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Upload Dokumen
                    </Text>
                  </Button>
                ) : (
                  <Button
                    full
                    rounded
                    style={{
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#ccc",
                    }}
                    onPress={() => onChangeAwbId(job.ID)}
                  >
                    <Text
                      style={{
                        color: Colors.primary,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {loading1 ? "Updating..." : "Update Status"}
                    </Text>
                  </Button>
                )}
              </View>
            </Tab>
          );
        })}
      </Tabs>
    ) : (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onGetActiveJobsHandler}
          />
        }
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>
          Tidak ada pengiriman aktif tanggal: {`${day} / ${month} / ${year}`}
        </Text>
      </ScrollView>
    );

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <View
          style={{
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DatePicker
            style={{ marginTop: -15, marginBottom: -30 }}
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
        </View>

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          activeJobsList
        )}

        {show && (
          <View
            style={{
              height: height * 0.52,
              width: "100%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingHorizontal: 10,
              borderColor: Colors.primary,
              borderWidth: 1,
              position: "absolute",
              bottom: 0,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: Colors.primary, fontSize: Fonts.title }}>
                Update Status
              </Text>
            </View>
            <ScrollView>
              <List>
                <ListItem
                  icon
                  onPress={() => onChangeStatusHandler("RECEIVED")}
                >
                  <Left>
                    <Button style={{ backgroundColor: Colors.primary }}>
                      <Icon active name="checkmark-done-circle-outline" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>RECEIVED</Text>
                  </Body>
                </ListItem>
                <ListItem
                  icon
                  onPress={() => onChangeStatusHandler("FAILED DELIVERY")}
                >
                  <Left>
                    <Button style={{ backgroundColor: "orange" }}>
                      <Icon active name="close-circle-outline" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>FAILED DELIVERY</Text>
                  </Body>
                </ListItem>
                <ListItem
                  icon
                  onPress={() => onChangeStatusHandler("CANCELED")}
                >
                  <Left>
                    <Button style={{ backgroundColor: "red" }}>
                      <Icon active name="trash-outline" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>CANCELED</Text>
                  </Body>
                </ListItem>
              </List>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Button
                  style={{
                    backgroundColor: Colors.primary,
                  }}
                  onPress={onCloseStatus}
                >
                  <Icon active name="close-outline" />
                </Button>
              </View>
            </ScrollView>
          </View>
        )}
      </Content>
    </Container>
  );
};

ActiveJobScreen.navigationOptions = (navData) => {
  const getActiveJobs = navData.navigation.getParam("getActiveJobs");
  return {
    headerTitle: "On Going",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <HeaderItem
          title="Cart"
          iconName="refresh-outline"
          color={Colors.primary}
          onPress={getActiveJobs}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: Colors.primary },
  text: { textAlign: "left", paddingHorizontal: 5 },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  underlineStyle: {
    backgroundColor: Colors.primary,
  },
  tabContainer: {
    backgroundColor: "#fff",
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
  },
});

export default withNavigationFocus(ActiveJobScreen);
