import styled from "styled-components";

export const Sselect = styled.select`
  width: 100%;
  padding: 1rem;
  border-radius: 0.3rem;
  font-weight: 800;

  background-color: ${(props) => props.theme.backgroundPrimary};
  color: ${(props) => props.theme.textSecondary};
  border: none;

  option {
    font-weight: 700;
  }
`;
