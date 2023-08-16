import styled from "styled-components";

export const Swrapper = styled.div`
  width: 100%;
  height: calc(100vh - 8.4rem);
  left: 0;
  top: 8.4rem;
  position: absolute;
  background: rgba(0, 0, 0, 0.9);

  padding: 3rem 1rem;

  display: flex;
  justify-content: center;
`;

export const Scontent = styled.div`
  width: 100%;
  max-width: 50rem;
  height: min-content;
  border-radius: 0.3rem;
  overflow: hidden;
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.textSecondary};
`;

export const Sheader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  background-color: ${(props) => props.theme.backgroundSecondaryContrast};
  color: ${(props) => props.theme.textSecondaryContrast};
`;

export const Ssection = styled.section`
  padding: 1rem;
  overflow-y: auto;
`;
