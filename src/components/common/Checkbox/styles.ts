import styled, { css } from "styled-components";

type PropsScontainer = {
  checked?: boolean;
};

export const Scontainer = styled.div<PropsScontainer>`
  font-size: 1.2rem;
  transition: background 0.3s;

  &:hover {
    border-radius: 0.3rem;
    background-color: ${(props) => props.theme.backgroundSecondary};
    color: ${(props) => props.theme.backgroundSecondary};
    font-weight: bold;
    cursor: pointer;
  }

  ${(props) =>
    props.checked &&
    css`
      border-radius: 0.3rem;
      background-color: ${(props) => props.theme.backgroundSecondary};
      color: ${(props) => props.theme.backgroundSecondary};
      font-weight: bold;
    `}

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    user-select: none;
  }
`;
