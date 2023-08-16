import { ReactNode } from "react";

import { BsChevronUp } from "src/components/icons/BsChevronUp";
import { BsChevronDown } from "src/components/icons/BsChevronDown";
import { Scontainer, Scontent, Sheader } from "./styles";
import { useTheme } from "styled-components";

type PropsType = {
  label?: string;
  icon?: ReactNode;
  children: ReactNode;
  hideChevronIcon?: boolean;
  position: "left" | "right" | "center";
  top?: string;
  isVisible: boolean;
  setIsVisible: Function;
};

function Dropdown({
  label,
  icon,
  children,
  hideChevronIcon,
  position,
  top = "7rem",
  isVisible = false,
  setIsVisible,
}: PropsType) {
  const theme = useTheme();

  const RenderIcon = ({ isVisible = false }) =>
    isVisible ? (
      <BsChevronUp
        width={25}
        height={25}
        fill={theme.textPrimary}
        stroke={theme.textPrimary}
      />
    ) : (
      <BsChevronDown
        width={25}
        height={25}
        fill={theme.textPrimary}
        stroke={theme.textPrimary}
      />
    );

  return (
    <Scontainer isVisible={isVisible}>
      <Sheader onClick={() => setIsVisible(!isVisible)}>
        {icon}
        {label && <strong>{label}</strong>}

        {!hideChevronIcon && <RenderIcon isVisible={isVisible} />}
      </Sheader>

      <Scontent
        isVisible={isVisible}
        position={position}
        top={top}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {children}
      </Scontent>
    </Scontainer>
  );
}

export default Dropdown;
