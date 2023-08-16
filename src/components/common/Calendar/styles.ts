import styled from "styled-components";

export const Scontainer = styled.div`
  width: 20rem;
  height: 20rem;
  background-color: red;
`;
export const Sheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
`;
export const Scontent = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;

  > span {
    font-size: 1.4rem;
    background-color: rebeccapurple;
  }
`;
