import React, { Dispatch, ReactNode, SetStateAction } from "react";

import { Exit } from "src/components/icons/Exit";

import { Scontent, Sheader, Ssection, Swrapper } from "./styles";

type PropsType = {
  children: ReactNode;
  title: string;
  isVisible: boolean;
  handlerIsVisible: Dispatch<SetStateAction<boolean>>;
};

export const Modal = ({
  children,
  title,
  isVisible,
  handlerIsVisible,
}: PropsType) => {
  return (
    <>
      {isVisible && (
        <Swrapper>
          <Scontent>
            <Sheader>
              <h1>{title}</h1>
              <Exit
                width={20}
                height={20}
                onClick={() => {
                  handlerIsVisible(!isVisible);
                }}
              />
            </Sheader>
            <Ssection>{children}</Ssection>
          </Scontent>
        </Swrapper>
      )}
    </>
  );
};
