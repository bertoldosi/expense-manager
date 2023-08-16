interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: string | number;
  height: string | number;
}

export const Repeat = ({ width = "40", height = "40" }: PropsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="#32A960"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <polyline
        points="200 88 224 64 200 40"
        fill="none"
        stroke="#32A960"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></polyline>
      <path
        d="M32,128A64.1,64.1,0,0,1,96,64H224"
        fill="none"
        stroke="#32A960"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
      <polyline
        points="56 168 32 192 56 216"
        fill="none"
        stroke="#32A960"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></polyline>
      <path
        d="M224,128a64.1,64.1,0,0,1-64,64H32"
        fill="none"
        stroke="#32A960"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></path>
    </svg>
  );
};
