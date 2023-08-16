import styled from "styled-components";

export const Scontent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Sheader = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
