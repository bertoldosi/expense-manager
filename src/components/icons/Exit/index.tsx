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

export const Exit = ({ width = "40", height = "40", ...props }: PropsType) => {
  return (
    <Scontent {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="#fff"
        viewBox="0 0 256 256"
      >
        <rect width="256" height="256" fill="none"></rect>
        <circle
          cx="128"
          cy="128"
          r="96"
          fill="none"
          stroke="#fff"
          strokeMiterlimit="10"
          strokeWidth="16"
        ></circle>
        <line
          x1="160"
          y1="96"
          x2="96"
          y2="160"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="160"
          y1="160"
          x2="96"
          y2="96"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
      </svg>
    </Scontent>
  );
};
