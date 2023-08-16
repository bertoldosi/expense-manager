import React from "react";

interface PropsType extends React.SVGProps<SVGAElement> {}

export const BsChevronDown: React.FC<PropsType> = ({
  width = "40",
  height = "40",
  fill = "#f5f5ff",
  stroke = "#f5f5ff",
}) => {
  return (
    <svg
      className="BsChevronDown"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <polyline
        points="208 96 128 176 48 96"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></polyline>
    </svg>
  );
};
