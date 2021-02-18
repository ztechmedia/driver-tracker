import commonColor from "../native-base-theme/variables/commonColor";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
const platform = Platform.OS;

const customCommonColor = {
  ...commonColor,
  brandPrimary: platform === "ios" ? "#007aff" : Colors.primary,
  get buttonPrimaryBg() {
    return this.brandPrimary;
  },
};

export default customCommonColor;
