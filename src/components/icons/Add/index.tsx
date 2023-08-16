interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: string | number;
  height: string | number;
}

export const Add = ({ width = "40", height = "40" }: PropsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="green"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <line
        x1="40"
        y1="64"
        x2="216"
        y2="64"
        fill="none"
        stroke="green"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="40"
        y1="128"
        x2="216"
        y2="128"
        fill="none"
        stroke="green"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="40"
        y1="192"
        x2="144"
        y2="192"
        fill="none"
        stroke="green"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="184"
        y1="192"
        x2="232"
        y2="192"
        fill="none"
        stroke="green"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="208"
        y1="168"
        x2="208"
        y2="216"
        fill="none"
        stroke="green"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
    </svg>
  );
};
