import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SmenuHeader = styled.nav`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.textSecondary};

  > h2 {
    width: 100%;
    text-align: center;
  }
`;

export const Soptions = styled.div`
  width: 100%;
  height: 100%;
  max-width: max-content;
  display: flex;
  margin: 0 auto;
  overflow: auto;
`;

export const Sitem = styled.div`
  min-width: 8rem;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.selected {
    background-color: ${(props) => props.theme.backgroundSecondaryContrast};
    color: ${(props) => props.theme.textSecondaryContrast};
  }

  &:hover {
    background-color: ${(props) => props.theme.backgroundSecondaryContrast};
    color: ${(props) => props.theme.textSecondaryContrast};
  }
`;
