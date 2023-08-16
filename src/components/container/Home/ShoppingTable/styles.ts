import styled from "styled-components";

interface SrowTableType {
  paymentStatus: "closed" | "open";
  selected: boolean;
}

export const Scontent = styled.div`
  height: calc(100vh - 32.2rem);
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background: ${(props) => props.theme.backgroundPrimary};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.textPrimary};
  }

  @media (max-width: 700px) {
    height: min-content;
  }
`;

export const SrowTable = styled.span<SrowTableType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  background-color: ${(props) =>
    props.paymentStatus == "closed"
      ? props.theme.backgroundSuccess
      : props.theme.backgroundSecondary};

  background-color: ${(props) =>
    props.selected && props.theme.backgroundSecondaryContrast};

  > strong {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;

    input {
      color: ${(props) => props.theme.textSecondary};
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.backgroundSecondaryContrast};
    color: ${(props) => props.theme.textSecondaryContrast};

    > strong {
      input,
      select {
        color: ${(props) => props.theme.textSecondaryContrast};
      }
    }
  }
`;

export const NoResult = styled.div`
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.textSecondary};
  border-radius: 0.3rem;

  span {
    font-size: 2rem;
  }
`;
