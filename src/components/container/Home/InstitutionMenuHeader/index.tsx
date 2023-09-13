import React, { useContext, useEffect } from "react";

import { Scontainer, Sitem, SmenuHeader, Soptions } from "./styles";
import { userContext, userContextType } from "@context/userContext";

type PropsType = {};

function InstitutionMenuHeader({}: PropsType) {
  const { expense, toggleSelectedInstitution, institution } = useContext(
    userContext
  ) as userContextType;

  useEffect(() => {
    console.log(institution);
  }, [institution]);

  return (
    <Scontainer>
      <SmenuHeader>
        <Soptions>
          {expense?.institutions?.map((institutionMap, index) =>
            institutionMap.id === institution?.id ? (
              <Sitem
                key={index}
                className="selected"
                onClick={() => {
                  toggleSelectedInstitution(institutionMap);
                }}
              >
                <h1>{institutionMap.name}</h1>
              </Sitem>
            ) : (
              <Sitem
                key={index}
                onClick={() => {
                  toggleSelectedInstitution(institutionMap);
                }}
              >
                <h1>{institutionMap.name}</h1>
              </Sitem>
            )
          )}
        </Soptions>
      </SmenuHeader>
    </Scontainer>
  );
}

export default InstitutionMenuHeader;
