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
  const { day, month, year, onChangeDate, onChangeMonth, onChangeYear } = props;
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
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        placeholder="Tanggal"
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        style={{
          width: "25%",
          height: "100%",
          borderWidth: 1,
          borderColor: "#ccc",
        }}
        selectedValue={day + ""}
        onValueChange={onChangeDate}
      >
        {days}
      </Picker>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        placeholder="Tanggal"
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        style={{ width: "45%", height: "100%" }}
        selectedValue={month}
        onValueChange={onChangeMonth}
      >
        {monthObject.map((month) => (
          <Picker.Item label={month.name} value={month.value} />
        ))}
      </Picker>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        placeholder="Tanggal"
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        style={{ width: "30%", height: "100%" }}
        selectedValue={year + ""}
        onValueChange={onChangeYear}
      >
        {years}
      </Picker>
    </View>
  );
};

export default DatePicker;
