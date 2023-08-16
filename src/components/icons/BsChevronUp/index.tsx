import React from "react";

interface PropsType extends React.SVGProps<SVGAElement> {}

export const BsChevronUp: React.FC<PropsType> = ({
  width = "40",
  height = "40",
  fill = "#fff",
  stroke = "#fff",
}) => {
  return (
    <svg
      className="BsChevronUp"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <polyline
        points="48 160 128 80 208 160"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></polyline>
    </svg>
  );
};
