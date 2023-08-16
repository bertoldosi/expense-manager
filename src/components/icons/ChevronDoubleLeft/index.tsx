import styled from "styled-components";

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: string | number;
  height?: string | number;
}

const Scontent = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
`;

export const ChevronDoubleLeft = ({
  width = "40",
  height = "40",
  onClick,
  ...props
}: PropsType) => {
  return (
    <Scontent onClick={onClick} {...props}>
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
          d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
        />
      </svg>
    </Scontent>
  );
};
