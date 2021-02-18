import { Alert } from "react-native";

const errorHandler = (error) => {
  return Alert.alert("An Error Occured!", error.toString(), [
    { text: "Closed" },
  ]);
};

export default errorHandler;
