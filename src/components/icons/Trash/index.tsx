import styled from "styled-components";

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: string | number;
  height: string | number;
}

const Scontent = styled.button`
  background-color: transparent;
  border: none;
  display: flex;

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

export const Trash = ({
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
        fill="#FD3F5C"
        viewBox="0 0 256 256"
      >
        <rect width="256" height="256" fill="none"></rect>
        <line
          x1="216"
          y1="56"
          x2="40"
          y2="56"
          fill="none"
          stroke="#FD3F5C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="104"
          y1="104"
          x2="104"
          y2="168"
          fill="none"
          stroke="#FD3F5C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="152"
          y1="104"
          x2="152"
          y2="168"
          fill="none"
          stroke="#FD3F5C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <path
          d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
          fill="none"
          stroke="#FD3F5C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></path>
        <path
          d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
          fill="none"
          stroke="#FD3F5C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></path>
      </svg>
    </Scontent>
  );
};
