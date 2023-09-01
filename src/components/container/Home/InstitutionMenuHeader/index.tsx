import React, { useContext } from "react";

import { Scontainer, Sitem, SmenuHeader, Soptions } from "./styles";
import { userContext, userContextType } from "@context/userContext";

type PropsType = {};

function InstitutionMenuHeader({}: PropsType) {
  const { expense, selectedInstitution, toggleSelectedInstitution } =
    useContext(userContext) as userContextType;

  if (expense?.institutions?.length === 0) {
    return (
      <SmenuHeader>
        <h2>Cadastre um cartão!</h2>
      </SmenuHeader>
    );
  }

  return (
    <Scontainer>
      <SmenuHeader>
        <Soptions>
          {expense?.institutions?.map((institutionMap, index) =>
            institutionMap.id === selectedInstitution?.id ? (
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
