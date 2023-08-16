import styled from "styled-components";

export const ScontainerInput = styled.div`
  > input {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    outline: none;
    font-size: 1.2rem;
  }
`;

export const ScontainerInputCheckbox = styled.div`
  display: inline-flex;

  input {
    display: none;
  }

  label {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: #fff;
    border: 0.2rem solid ${(props) => props.theme.backgroundPrimary};
    cursor: pointer;
  }

  input[type="checkbox"]:checked + label {
    background-color: #0eb3e0;
  }
`;
