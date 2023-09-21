import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import GlobalStyle from "../styles/globalStyle";
import Theme from "src/styles/theme";

import Layout from "@containers/Layout";
import { Wrapped } from "@commons/Wrapped";
import UserContextProviderConfig from "@context/userContextConfig";
import UserContextProvider from "@context/userContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const AppLayout = Component.layout || Layout;

  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <UserContextProviderConfig>
          <Theme>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <GlobalStyle />
            <AppLayout>
              <Wrapped>
                <Component {...pageProps} />
              </Wrapped>
            </AppLayout>
          </Theme>
        </UserContextProviderConfig>
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
