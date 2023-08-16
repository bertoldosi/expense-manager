import styled from "styled-components";

export const Scontent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.textSecondary};
  padding: 1rem 1.5rem;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const SselectingAll = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 1.3rem;
  }
`;

export const SbuttonsOptions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Sfilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.3rem;

  cursor: pointer;

  span {
    font-size: 1.5rem;
  }
`;

export const ScontentModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Sfilterform = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1rem;

  > button {
    margin-top: 2rem;
  }
`;
