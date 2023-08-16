import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > input {
    width: 100%;
    height: 4rem;
    margin-bottom: 0.2rem;

    background-color: transparent;
    border: 1px solid;
    padding: 0 1.5rem;
    border-radius: 0.3rem;

    color: ${(props) => props.theme.textSecondary};
  }

  span {
    font-size: 1.3rem;
    color: #ff5733;
  }
`;
