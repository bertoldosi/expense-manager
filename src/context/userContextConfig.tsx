import React, { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "src/styles/theme";
import { DefaultTheme } from "styled-components";

interface ThemeType {
  type: string;
  values: DefaultTheme;
}

export type UserContextConfigType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

type PropsConfigType = {
  children: React.ReactNode;
};

const keyStorageManager = "expense-manager-theme";

export const UserContextConfig =
  React.createContext<UserContextConfigType | null>(null);

const UserContextConfigProvider = ({ children }: PropsConfigType) => {
  const [theme, setTheme] = useState<ThemeType>({
    type: "light",
    values: lightTheme,
  });

  function toggleTheme() {
    if (theme.type === "dark") {
      localStorage.setItem(keyStorageManager, "light");

      setTheme({
        type: "light",
        values: lightTheme,
      });
    } else {
      localStorage.setItem(keyStorageManager, "dark");

      setTheme({
        type: "dark",
        values: darkTheme,
      });
    }
  }

  function initializeTheme() {
    const isBrowser = typeof window !== "undefined";

    const storedTheme = isBrowser
      ? localStorage.getItem(keyStorageManager)
      : null;

    if (storedTheme) {
      setTheme({
        type: storedTheme,
        values: storedTheme === "dark" ? darkTheme : lightTheme,
      });
    }
  }

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <UserContextConfig.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </UserContextConfig.Provider>
  );
};

export default UserContextConfigProvider;
