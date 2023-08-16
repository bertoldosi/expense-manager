import styled from "styled-components";

export const Scontainer = styled.div`
  padding: 0 1rem;
  background-color: ${(props) => props.theme.backgroundSecondary};
  margin-bottom: 1rem;
`;

export const Scontent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1020px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Sconfig = styled.div`
  display: flex;
  align-items: center;
`;
