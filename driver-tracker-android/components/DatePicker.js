import React from "react";
import { View } from "react-native";
import { Picker, Icon } from "native-base";

const days = [];
const years = [];

for (let i = 1; i <= 31; i++) {
  days.push(<Picker.Item label={i + ""} value={i + ""} />);
}

for (let i = 2010; i <= 20199; i++) {
  years.push(<Picker.Item label={i + ""} value={i + ""} />);
}

let monthObject = [
  {
    name: "Januari",
    value: 1,
  },
  {
    name: "Februari",
    value: 2,
  },
  {
    name: "Maret",
    value: 3,
  },
  {
    name: "April",
    value: 4,
  },
  {
    name: "Mei",
    value: 5,
  },
  {
    name: "Juni",
    value: 6,
  },
  {
    name: "July",
    value: 7,
  },
  {
    name: "Agustus",
    value: 8,
  },
  {
    name: "September",
    value: 9,
  },
  {
    name: "Oktober",
    value: 10,
  },
  {
    name: "November",
    value: 11,
  },
  {
    name: "Desember",
    value: 12,
  },
];

const DatePicker = (props) => {
  return (
    <View
      style={{
        ...props.style,
        height: 60,
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {props.day && (
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Tanggal"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          style={{
            width: `${props.config.day.width}`,
            height: "100%",
          }}
          selectedValue={props.day + ""}
          onValueChange={props.onChangeDate}
        >
          {days}
        </Picker>
      )}

      {props.month && (
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Tanggal"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          style={{ width: `${props.config.month.width}`, height: "100%" }}
          selectedValue={props.month}
          onValueChange={props.onChangeMonth}
        >
          {monthObject.map((month) => (
            <Picker.Item label={month.name} value={month.value} />
          ))}
        </Picker>
      )}

      {props.year && (
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Tanggal"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          style={{ width: `${props.config.year.width}`, height: "100%" }}
          selectedValue={props.year + ""}
          onValueChange={props.onChangeYear}
        >
          {years}
        </Picker>
      )}
    </View>
  );
};

export default DatePicker;
