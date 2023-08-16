import styled from "styled-components";

type PropsType = {
  typeButton?: string;
  width?: string;
  height?: string;
};

export const Scontent = styled.button<PropsType>`
  width: 100%;
  max-width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  padding: 1rem;

  background-color: ${(props) => {
    if (props.typeButton === "primary") {
      return props.theme.backgroundInfo;
    }

    if (props.typeButton === "delete") {
      return props.theme.backgroundDanger;
    }
  }};

  color: ${(props) => {
    if (props.typeButton === "primary") {
      return props.theme.textInfo;
    }

    if (props.typeButton === "delete") {
      return props.theme.textDanger;
    }
  }};
`;
