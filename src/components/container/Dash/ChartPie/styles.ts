import styled from "styled-components";

const skeletonShimmer = `
  @keyframes skeletonShimmer {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }
`;

export const SContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SChartCard = styled.div`
  font-size: 1.5rem;
  display: grid;
  grid-template-columns: minmax(320px, 1.2fr) minmax(260px, 0.8fr);
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.textSecondary};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SSummary = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  > div {
    min-width: 180px;
    padding: 1rem 1.25rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.45);
  }
`;

export const SSummaryLabel = styled.span`
  display: block;
  margin-bottom: 0.35rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textSecondary};
  opacity: 0.8;
`;

export const SSummaryValue = styled.strong`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textPrimary};
`;

export const SChartWrapper = styled.div`
  position: relative;
  min-height: 340px;
`;

export const SCenterLabel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;

  > span {
    font-size: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.75;
  }

  > strong {
    max-width: 190px;
    text-align: center;
    font-size: 1.75rem;
    line-height: 1.15;
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const SLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  max-height: 340px;
  overflow: auto;
  padding-right: 0.25rem;
`;

export const SLegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.42);

  small {
    display: block;
    margin-top: 0.2rem;
    text-align: right;
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.75;
  }
`;

export const SLegendHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.textPrimary};
`;

export const SLegendDot = styled.span`
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 999px;
  flex-shrink: 0;
`;

export const SLegendValue = styled.strong`
  color: ${({ theme }) => theme.textPrimary};
`;

export const SSkeletonSummaryCard = styled.div`
  min-width: 180px;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.42);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const SSkeletonBlock = styled.div<{ width: string; height: string }>`
  ${({ width, height }) => `
    width: ${width};
    height: ${height};
  `}
  border-radius: 0.35rem;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.25) 25%,
    rgba(255, 255, 255, 0.5) 37%,
    rgba(255, 255, 255, 0.25) 63%
  );
  background-size: 400% 100%;
  animation: skeletonShimmer 1.2s ease-in-out infinite;

  ${skeletonShimmer}
`;

export const SSkeletonCircle = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 999px;
  margin: 1rem auto;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.22) 25%,
    rgba(255, 255, 255, 0.45) 37%,
    rgba(255, 255, 255, 0.22) 63%
  );
  background-size: 400% 100%;
  animation: skeletonShimmer 1.2s ease-in-out infinite;

  ${skeletonShimmer}
`;

export const SSkeletonLegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.42);
`;
