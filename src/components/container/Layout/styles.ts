import styled from "styled-components";

export const LayoutMain = styled.main``;

export const Container = styled.div`
  height: 100vh;
  padding: 10rem 2rem;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.backgroundSecondary};
  padding: 1rem 2rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
