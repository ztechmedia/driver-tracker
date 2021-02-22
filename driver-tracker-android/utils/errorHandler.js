import { Alert } from "react-native";

const errorHandler = (error) => {
  return Alert.alert(
    "An Error Occured!",
    error ? error.toString() : error + "",
    [{ text: "Closed" }]
  );
};

export default errorHandler;
