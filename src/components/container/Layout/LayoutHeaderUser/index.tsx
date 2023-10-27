import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useTheme } from "styled-components";
import { signOut, useSession } from "next-auth/react";

import { User } from "@icons/User";
import Dropdown from "@commons/Dropdown";
import { ToggleButtonTheme } from "@commons/ToggleButtonTheme";

import { Container, Footer, FooterText, Item, ItemText } from "./styles";

function LayoutHeaderUser() {
  const cookies = new Cookies();

  const theme = useTheme();
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  function handlerLogOut() {
    signOut();
    cookies.remove("expense-manager");
  }

  return (
    <Dropdown
      position="left"
      hideChevronIcon
      icon={<User color={theme.textSecondary} width={25} height={25} />}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <Container>
        <Item>
          <ItemText onClick={handlerLogOut}>Sair</ItemText>
        </Item>

        <Footer>
          <ToggleButtonTheme />
          <FooterText>{session?.user?.name}</FooterText>
        </Footer>
      </Container>
    </Dropdown>
  );
}

export default LayoutHeaderUser;
