import styled from "styled-components";

export const Container = styled.div`
  margin: 0 1rem;

  input {
    opacity: 0;
    position: absolute;
  }
  label {
    border: 1px solid ${(props) => props.theme.textSecondary};

    width: 42px;
    height: 20px;
    background-color: #333;
    display: flex;
    border-radius: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    position: relative;
    cursor: pointer;
    transform: scale(1.5);
    > div {
      width: 20px;
      height: 20px;
      background-color: white;
      position: absolute;
      top: -1px;
      left: -1px;
      border-radius: 50%;
      transition: transform 0.2s linear;
    }
  }
  input:checked + label > div {
    transform: translateX(24px);
  }
`;
