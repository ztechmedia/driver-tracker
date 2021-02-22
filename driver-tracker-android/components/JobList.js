import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Icon, Button } from "native-base";

//components
import Text from "./UI/BodyText";

const JobList = (props) => {
  let btn;

  const {
    ID,
    AWB_No,
    Account_Name,
    Destination,
    Consignee_Name,
    Consignee_Addr,
    AWB_Status,
  } = props.awb;

  const { onStartOrder, loading } = props;

  if (AWB_Status === "PROCESSED" || AWB_Status === "PROCESSED2") {
    btn = "start";
  } else {
    btn = "processed";
  }

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
          <Text style={styles.awbDesc}>{AWB_Status}</Text>
          <View style={{ marginTop: 5 }}>
            {btn === "start" ? (
              <Button
                full
                rounded
                style={{ height: 30 }}
                onPress={() => onStartOrder(ID)}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    "Mulai Pengiriman"
                  )}
                </Text>
              </Button>
            ) : (
              <Button
                full
                rounded
                style={{ height: 30, backgroundColor: "#ccc" }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Di Proses
                </Text>
              </Button>
            )}
          </View>
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
