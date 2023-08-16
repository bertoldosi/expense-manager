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

export const Settings = ({
  width = "40",
  height = "40",
  onClick,
  disabled,
}: PropsType) => {
  return (
    <Scontent onClick={onClick} disabled={disabled}>
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
    </Scontent>
  );
};
