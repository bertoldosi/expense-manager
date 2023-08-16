import styled from "styled-components";

export const Sselect = styled.select`
  width: 100%;
  min-width: 8rem;
  background-color: transparent;
  color: ${(props) => props.theme.textSecondary};
  border: none;

  cursor: pointer;

  option {
    background-color: ${(props) => props.theme.backgroundSecondary};
    color: ${(props) => props.theme.textSecondary};
    padding: 20rem;
    font-weight: 700;
  }
`;
