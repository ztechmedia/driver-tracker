import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withNavigationFocus } from "react-navigation";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
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
} from "native-base";
import {
  HeaderButtons,
  Item as HeaderItem,
} from "react-navigation-header-buttons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Table, TableWrapper, Rows, Col } from "react-native-table-component";
//constants
import Colors from "../../../constants/Colors";
//components
import HeaderButton from "../../../components/UI/HeaderButton";
import Text from "../../../components/UI/BodyText";
//actios
import { getActiveJobs } from "../../../store/actions/active-jobs";

const ActiveJobScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const user = useSelector((state) => state.auth.userLogged);
  const loading = useSelector((state) => state.activeJobs.loading);
  const activeJobs = useSelector((state) => state.activeJobs.activeJobs);
  const [date, setDate] = useState(new Date("2016-09-13"));
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onGetActiveJobsHandler = useCallback(() => {
    dispatch(getActiveJobs(user.Rider_Name, date));
  }, [dispatch, date]);

  useEffect(() => {
    if (user) {
      onGetActiveJobsHandler();
      navigation.setParams({ getActiveJobs: onGetActiveJobsHandler });
    }
  }, [onGetActiveJobsHandler]);

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
          <TouchableOpacity onPress={() => setShow((show) => !show)}>
            <Text style={{ color: "grey" }} bold>
              Tanggal: {date.toString().substr(4, 12)}
            </Text>
          </TouchableOpacity>
        </View>
        {!loading && activeJobs.length > 0 ? (
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
                        <Text>741607000110</Text>
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
                    <Button
                      full
                      rounded
                      style={{
                        backgroundColor: "#fff",

                        borderWidth: 1,
                        borderColor: "#ccc",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.primary,
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Update Status
                      </Text>
                    </Button>
                  </View>
                </Tab>
              );
            })}
          </Tabs>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}
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
