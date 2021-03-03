import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from "react-native";
import { Button } from "native-base";
//constants
import config from "../constants/EndPoint";
import Colors from "../constants/Colors";
//components
import Text from "./UI/BodyText";

const JobList = (props) => {
  const {
    ID,
    AWB_No,
    Account_Name,
    Destination,
    Consignee_Name,
    Consignee_Addr,
    AWB_Status,
    AWB_Date,
    AWB_Img,
  } = props.awb;

  const { onStartOrder, loading, idleText } = props;

  let btn;
  if (
    AWB_Status === "PROCESSED" ||
    AWB_Status === "PROCESSED2" ||
    AWB_Status === "ATTEMP DELIVERY" ||
    AWB_Status === "FAILED DELIVERY" ||
    AWB_Status === "CANCELED"
  ) {
    btn = (
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
          {loading ? <ActivityIndicator size="small" color="#fff" /> : idleText}
        </Text>
      </Button>
    );
  } else if (AWB_Status === "DOCUMENT RECEIVED") {
    btn = (
      <Button
        full
        rounded
        style={{ height: 30, backgroundColor: "orange" }}
        onPress={() => props.onReuploadDocument(ID)}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Upload Ulang Dokumen
        </Text>
      </Button>
    );
  } else {
    btn = (
      <Button full rounded style={{ height: 30, backgroundColor: "#ccc" }}>
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
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View style={styles.left}>
          {AWB_Status === "DOCUMENT RECEIVED" ? (
            <TouchableHighlight
              onPress={() =>
                props.onImageDetail(`${config.publicImgURL}${AWB_Img}`, AWB_No)
              }
            >
              <Image
                source={{ uri: `${config.publicImgURL}${AWB_Img}` }}
                style={{
                  width: 90,
                  height: 120,
                  borderWidth: 1,
                  borderColor: Colors.primary,
                  borderRadius: 10,
                }}
              />
            </TouchableHighlight>
          ) : (
            <Text style={styles.icon}>{Consignee_Name.charAt(0)}</Text>
          )}
        </View>
        <View style={styles.right}>
          <Text style={styles.awbPt}>AWB No: {AWB_No}</Text>
          <Text style={styles.awbPt}>{Account_Name}</Text>
          <Text style={styles.awbDesc}>
            {Destination ? Destination : "..."}
          </Text>
          <Text style={styles.awbDesc}>{Consignee_Name}</Text>
          <Text style={styles.awbDesc}>{Consignee_Addr}</Text>
          <Text style={styles.awbDesc}>Tanggal: {AWB_Date}</Text>
          <View style={{ marginTop: 5 }}>{btn}</View>
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
