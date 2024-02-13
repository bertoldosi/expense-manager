import styled from "styled-components";

export const Scontent = styled.div`
  width: min-content;

  div {
    display: flex;
  }
`;

export const Spointer = styled.div`
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textSecondary};
  margin: 0.2rem;
`;
