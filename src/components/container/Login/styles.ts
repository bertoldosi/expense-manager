import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;
`;

export const ButtonGoogle = styled.button`
  width: 100%;
  max-width: 15rem;
  height: 4rem;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundSecondaryContrast};
  color: ${(props) => props.theme.textSecondaryContrast};
  padding: 1rem;
  border-radius: 0.3rem;
`;

export const TextGoogle = styled.span`
  font-size: 1.5rem;
`;
