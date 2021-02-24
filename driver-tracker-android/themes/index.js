import customCommonColor from "./customCommonColor";
import getTheme from "../native-base-theme/components";
const theme = () => {
  const nbTheme = getTheme(customCommonColor);
  return nbTheme;
};

export default theme;
