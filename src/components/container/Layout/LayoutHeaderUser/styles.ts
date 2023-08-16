import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  min-width: 20rem;
  background-color: ${(props) => props.theme.backgroundSecondary};
`;

export const ScontentFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid ${(props) => props.theme.textSecondary};
  font-size: 1.2rem;
  padding: 1.5rem 0;

  span {
    margin-top: 1rem;
  }
`;

export const Sitem = styled.div`
  transition: background 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.backgroundSecondaryContrast};
    color: ${(props) => props.theme.textSecondaryContrast};

    font-weight: 600;
    a,
    span {
      color: ${(props) => props.theme.textSecondaryContrast};
    }
  }

  &.no-emphasis {
    background-color: initial;
    font-weight: initial;
    cursor: default;
  }

  a {
    width: 100%;
    height: 100%;
    display: block;
    text-decoration: none;
    color: ${(props) => props.theme.textPrimary};
    font-size: 1.2rem;

    padding: 1rem;
  }

  span {
    width: 100%;
    height: 100%;
    display: block;
    color: ${(props) => props.theme.textPrimary};
    font-size: 1.5rem;
    padding: 1rem;
  }
`;
