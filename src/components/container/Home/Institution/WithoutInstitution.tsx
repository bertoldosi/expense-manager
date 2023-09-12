import React, { useState } from "react";

import InstitutionMenuHeader from "@containers/Home/InstitutionMenuHeader";
import InstitutionMenuCard from "@containers/Home/InstitutionMenuCard";
import InstitutionForm from "@containers/Home/InstitutionForm";
import { Button } from "@commons/Button";
import { Modal } from "@commons/Modal";

import {
  Saside,
  Ssection,
  ScontainerWithoutInstitution,
  SmenuHeader,
} from "./styles";

function WithoutInstitution() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function openModal() {
    setIsModalVisible(!isModalVisible);
  }

  function exitModal() {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <ScontainerWithoutInstitution>
      <div>
        <SmenuHeader>
          <h2>Cadastre um cartão!</h2>
        </SmenuHeader>
        <Ssection>
          <Saside>
            <InstitutionMenuCard
              totalAmount={0}
              isFooter={<Button text="Novo cartão" onClick={openModal} />}
            />
          </Saside>
        </Ssection>

        <Modal
          title="Criando novo cartão"
          isVisible={isModalVisible}
          handlerIsVisible={exitModal}
        >
          <InstitutionForm exitModal={exitModal} />
        </Modal>
      </div>
    </ScontainerWithoutInstitution>
  );
}

export default WithoutInstitution;
