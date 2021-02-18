import React from "react";
import Text from "../components/UI/BodyText";
import { View, StyleSheet } from "react-native";
import { Icon } from "native-base";
import Colors from "../constants/Colors";

const JobList = (props) => {
  const {
    AWB_No,
    Account_Name,
    Destination,
    Consignee_Name,
    Consignee_Addr,
    AWB_Date,
  } = props.awb;
  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View style={styles.left}>
          <Icon style={styles.icon} name="car-outline" />
        </View>
        <View style={styles.right}>
          <Text style={styles.awbPt}>AWB No: {AWB_No}</Text>
          <Text style={styles.awbPt}>{Account_Name}</Text>
          <Text style={styles.awbDesc}>
            {Destination ? Destination : "..."}
          </Text>
          <Text style={styles.awbDesc}>{Consignee_Name}</Text>
          <Text style={styles.awbDesc}>{Consignee_Addr}</Text>
          <Text style={styles.awbDesc}>{AWB_Date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  awbPt: {
    fontWeight: "bold",
    color: "grey",
  },
  awbDesc: {
    color: "grey",
  },
  icon: {
    width: "100%",
    height: "auto",
    textAlign: "center",
    fontSize: 70,
    color: "grey",
  },
  card: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  left: {
    flex: 1,
    height: "auto",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  right: {
    flex: 3,
    marginLeft: 10,
    height: "100%",
    paddingHorizontal: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default JobList;
