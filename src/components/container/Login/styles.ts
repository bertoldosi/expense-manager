import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;

  > button {
    height: 4rem;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.backgroundSecondaryContrast};
    color: ${(props) => props.theme.textSecondaryContrast};
    padding: 1rem;
    border-radius: 0.3rem;
  }
`;
