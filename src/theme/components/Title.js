// @flow

import { Platform } from "react-native";

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const titleTheme = {
    fontSize: variables.titleFontSize,
    fontFamily: variables.titleFontfamily,
    color: variables.titleFontColor,
    fontWeight: "700",
    textAlign: "center",
    paddingLeft: 4,
    marginLeft: undefined,
    paddingTop: 1
  };

  return titleTheme;
};
