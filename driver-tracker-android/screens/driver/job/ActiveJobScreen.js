import React from "react";
import { withNavigationFocus } from "react-navigation";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import {
  Container,
  Content,
  Tab,
  Tabs,
  ScrollableTab,
  List,
  ListItem,
} from "native-base";
import {
  HeaderButtons,
  Item as HeaderItem,
} from "react-navigation-header-buttons";
import { Table, TableWrapper, Rows, Col } from "react-native-table-component";
//constants
import Colors from "../../../constants/Colors";
//components
import HeaderButton from "../../../components/UI/HeaderButton";
import Logo from "../../../assets/img/logo.jpeg";
import Text from "../../../components/UI/BodyText";
//dummy data
const DATA = [
  {
    order: "Pengiriman #1",
  },
  {
    order: "Pengiriman #2",
  },
  {
    order: "Pengiriman #3",
  },
];

const ActiveJobScreen = () => {
  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <Tabs
          renderTabBar={() => (
            <ScrollableTab
              tabsContainerStyle={styles.tabContainer}
              underlineStyle={styles.underlineStyle}
            />
          )}
        >
          {DATA.map((dt) => {
            const tableTitle = [
              "Account Name",
              "Origin",
              "Destination",
              "Consigne",
              "Address",
            ];
            const tableData = [
              ["Eka Boga Inti, PT."],
              ["Jakarta"],
              ["Sleman"],
              ["EKA BOGA INTI PT YOGYAKARTA"],
              ["Jl.Kaliurang Km 5.6 Yogyakarta SLE"],
            ];

            return (
              <Tab
                textStyle={styles.textStyle}
                activeTextStyle={styles.textStyleActive}
                activeTabStyle={styles.tabStyleActive}
                tabStyle={styles.tabStyle}
                heading={dt.order}
              >
                <View style={styles.imgContainer}>
                  <Image style={styles.img} source={Logo} />
                </View>
                <ScrollView style={styles.listContainer}>
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
                          borderStyle={{ borderWidth: 1, borderColor: "#000" }}
                        >
                          <TableWrapper style={styles.wrapper}>
                            <Col
                              data={tableTitle}
                              style={styles.title}
                              heightArr={[28, 28, 28, 50, 50]}
                              textStyle={{
                                ...styles.text,
                                color: "#fff",
                              }}
                            />
                            <Rows
                              data={tableData}
                              flexArr={[2]}
                              heightArr={[28, 28, 28, 50, 50]}
                              textStyle={styles.text}
                            />
                          </TableWrapper>
                        </Table>
                      </View>
                    </ListItem>
                  </List>
                </ScrollView>
              </Tab>
            );
          })}
        </Tabs>
        <View style={styles.imgContainer}></View>
      </Content>
    </Container>
  );
};

ActiveJobScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "On Going",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <HeaderItem
          title="Cart"
          iconName="map"
          color={Colors.primary}
          onPress={() => {}}
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
  imgContainer: {},
  img: {
    width: "auto",
    height: 200,
  },
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
