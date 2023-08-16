import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import {
  UserContextConfig,
  UserContextConfigType,
} from "@context/userContextConfig";

type ThemeTypes = {
  children: ReactNode;
};

export const lightTheme = {
  backgroundPrimary: "#fff",
  textPrimary: "#333",

  backgroundSecondary: "#E7E9EB",
  textSecondary: "#111",

  backgroundSecondaryContrast: "#666",
  textSecondaryContrast: "#fff",

  backgroundInfo: "#296dff",
  textInfo: "#fff",

  backgroundSuccess: "#2DD36F",
  textSuccess: "#FF0000",

  backgroundWarning: "#FFC409",
  textWarning: "#000",

  backgroundDanger: "#D11A2A",
  textDanger: "#fff",
};

export const darkTheme = {
  backgroundPrimary: "#1B1B1D",
  textPrimary: "#FFFFFF",

  backgroundSecondary: "#333333",
  textSecondary: "#FFFFFF",

  backgroundSecondaryContrast: "#0074B7",
  textSecondaryContrast: "#fff",

  backgroundInfo: "#296dff",
  textInfo: "#fff",

  backgroundSuccess: "#2DD36F",
  textSuccess: "#222",

  backgroundWarning: "#FFC409",
  textWarning: "#0000FF",

  backgroundDanger: "#EB445A",
  textDanger: "#fff",
};

const Theme = ({ children }: ThemeTypes) => {
  const { theme } = React.useContext(
    UserContextConfig
  ) as UserContextConfigType;

  return <ThemeProvider theme={theme.values}>{children}</ThemeProvider>;
};

export default Theme;
