import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundSecondary};

  @keyframes flip {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(-180deg);
    }
  }

  & .image {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .coin {
    animation: flip 0.5s ease-in-out infinite alternate-reverse both;
    svg {
      width: 18rem;
      height: 18rem;
    }
  }
`;
