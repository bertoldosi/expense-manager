import React from "react";
import styled from "styled-components";

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
}

const Scontent = styled.button<PropsType>`
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
      width: 1.5rem; /* Adjusted size */
      height: 1.5rem; /* Adjusted size */
    }
  }
`;

export const Edit: React.FC<PropsType> = ({
  width = "40",
  height = "40",
  onClick,
  disabled,
  backgroundColor = "#fff",
}: PropsType) => {
  return (
    <Scontent onClick={onClick} disabled={disabled}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={backgroundColor}
        viewBox="0 0 256 256"
      >
        <rect width="256" height="256" fill="none"></rect>
        <path
          d="M92.7,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4l-120,120A7.9,7.9,0,0,1,92.7,216Z"
          fill="none"
          stroke={backgroundColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12" /* Adjusted stroke width */
        ></path>
        <line
          x1="136"
          y1="64"
          x2="192"
          y2="120"
          fill="none"
          stroke={backgroundColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12" /* Adjusted stroke width */
        ></line>
      </svg>
    </Scontent>
  );
};
