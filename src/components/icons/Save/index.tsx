import styled from "styled-components";

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: string | number;
  height: string | number;
}

const Scontent = styled.button`
  background-color: transparent;
  border: none;

  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s;

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 360px) {
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export const Save = ({
  width = "40",
  height = "40",
  onClick,
  disabled,
}: PropsType) => {
  return (
    <Scontent onClick={onClick} disabled={disabled}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="green"
        viewBox="0 0 256 256"
      >
        <rect width="256" height="256" fill="none"></rect>
        <polyline
          points="172 104 113.3 160 84 132"
          fill="none"
          stroke="green"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></polyline>
        <circle
          cx="128"
          cy="128"
          r="96"
          fill="none"
          stroke="green"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></circle>
      </svg>
    </Scontent>
  );
};
