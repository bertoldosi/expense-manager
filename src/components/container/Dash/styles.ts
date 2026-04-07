import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 0;
  overflow: visible;

  @media (max-width: 900px) {
    height: auto;
    overflow: visible;
  }
`;

export const Sactions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-shrink: 0;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SchartArea = styled.div`
  flex: 1;
  height: calc(100dvh - 16rem);
  max-height: calc(100dvh - 16rem);
  min-height: 0;
  overflow: hidden;

  @media (max-width: 900px) {
    height: auto;
    max-height: none;
    overflow: visible;
  }
`;

export const SfilterWrapper = styled.div`
  width: 100%;
  max-width: 22rem;

  @media (max-width: 700px) {
    max-width: 100%;
  }
`;

export const Sform = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1rem;

  > button {
    margin-top: 2rem;
  }
`;

export const Srepeat = styled.div`
  width: 100%;
  margin-top: 1rem;

  > h2 {
    margin-bottom: 1rem;
  }
`;
