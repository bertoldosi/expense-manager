import styled from "styled-components";

export const Scontainer = styled.div`
  height: 100vh;
  padding: 10rem 2rem;
`;

export const Scontent = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.backgroundSecondary};
  padding: 1rem 2rem;
`;

export const Sheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const Sbody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
