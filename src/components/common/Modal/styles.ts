import styled from "styled-components";

export const Swrapper = styled.div`
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);

  padding: 6rem 1rem 2rem;

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
