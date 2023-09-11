import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import InstitutionMenuCard from "@containers/Home/InstitutionMenuCard";
import InstitutionMenuHeader from "@containers/Home/InstitutionMenuHeader";

import { Saside, Ssection, Swrapper } from "./styles";

import InstitutionForm from "../InstitutionForm";
import { InstitutionType } from "@interfaces/*";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import Shopping from "@containers/Home/Shopping";
import Cookies from "universal-cookie";
import { formatMorney } from "@helpers/formatMorney";
import moment from "moment";
import orderByCategory from "@helpers/orderByCategory";
import { userContext, userContextType } from "@context/userContext";

interface CategoryTotalsType {
  category: string;
  total: number;
}
interface CategoryTotalsMonthType {
  date: string;
  categoryTotals: CategoryTotalsType[];
}
interface TotalsMonthType {
  date: string;
  total: number;
}

export const Institution = () => {
  const cookies = new Cookies();

  const { institution, setInstitution, expense } = useContext(
    userContext
  ) as userContextType;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [institutionUpdate, setInstitutionUpdate] =
    useState<InstitutionType | null>(null);

  const [categotyTotalsMonth, _setCategoryTotalsMonth] =
    useState<CategoryTotalsMonthType>();
  const [totalsMonth, _setTotalsMonth] = useState<TotalsMonthType>();

  function openModal() {
    setIsModalVisible(!isModalVisible);
  }

  function exitModal() {
    setIsModalVisible(!isModalVisible);
    setInstitutionUpdate(null);
  }

  async function deleteInstitution(institution: InstitutionType) {
    async function requestDelete() {
      return await instances
        .delete("api/institution", {
          params: {
            institutionId: institution.id,
          },
        })
        .then(async () => {
          // const { filter } = cookies.get("expense-manager");

          // await getExpense(filter?.expense?.id, filter.institutions.createAt);
          setInstitution(null);
        });
    }

    await customToast(requestDelete);
  }

  async function updateInstitution(institutionData: InstitutionType) {
    setInstitutionUpdate(institutionData);
    openModal();
  }

  async function report(institutions: InstitutionType[] | undefined) {
    const doc = new jsPDF();

    if (institutions?.length) {
      const totalPerDateTable = categotyTotalsMonth?.categoryTotals.map(
        (categoryTotal) => {
          const category = categoryTotal.category;
          const total = formatMorney(categoryTotal.total);

          return [category, total];
        }
      );

      doc.text(`#${institution?.createAt}`, 12, 10);

      //Exibindo as tabelas de gastos de cada mês
      institutions?.map((institution: InstitutionType, index) => {
        institution.shoppings?.sort(orderByCategory);

        const shoppingsTable = institution.shoppings?.map((shopping) => {
          const amount = formatMorney(shopping.amount);
          const description = shopping.description;
          const category = shopping.category;
          const status = shopping.paymentStatus === "open" ? "Aberto" : "Pago";

          return [description, amount, category, status];
        });

        autoTable(doc, {
          theme: "striped",
          head: [[`${institution.name}`, "", "", ""]],
          body: shoppingsTable,
          showHead: "firstPage",
          showFoot: "lastPage",
        });
      });

      //Exibindo as tabelas totais de cada instituição
      institutions?.map((institution: InstitutionType, index) => {
        institution.shoppings?.sort(orderByCategory);

        const categoryTotalsTable = institution.categoryTotals?.map(
          (categoryTotal) => {
            const category = categoryTotal.category;
            const total = formatMorney(categoryTotal.total);

            return [category, total];
          }
        );

        autoTable(doc, {
          theme: "grid",
          head: [[`TOTAL ${institution.name}`, ""]],
          body: categoryTotalsTable,
          showHead: "firstPage",
          showFoot: "lastPage",
        });
      });

      //Exibindo total mensal
      autoTable(doc, {
        theme: "plain",
        head: [[`TOTAL DO MÊS DE ${institution?.createAt}`, ""]],
        body: totalPerDateTable,
        showHead: "firstPage",
        showFoot: "lastPage",
      });

      const dateNow = moment().format("DD-MM-YYYY");

      doc.save(`relatorio-de-gastos-${dateNow}`);
    }
  }

  return (
    <Swrapper>
      <InstitutionMenuHeader />

      {institution ? (
        <div>
          <Ssection>
            <Saside>
              <InstitutionMenuCard
                title={institution?.name}
                totalAmount={institution.totalAmount || 0}
                items={institution?.categoryTotals?.map((categorie) => ({
                  name: categorie.category,
                  total: categorie.total,
                }))}
                openSettings={() => {
                  updateInstitution(institution);
                }}
              />
              <InstitutionMenuCard
                title="TOTAL MENSAL"
                totalAmount={totalsMonth?.total || 0}
                items={categotyTotalsMonth?.categoryTotals.map((categorie) => ({
                  name: categorie.category,
                  total: categorie.total,
                }))}
                isFooter={
                  <>
                    <Button onClick={openModal} text="Novo cartão" />
                    <Button
                      onClick={() => {
                        deleteInstitution(institution);
                      }}
                      text={`Excluir ${institution?.name}`}
                      typeButton="delete"
                    />

                    <Button
                      onClick={() => {
                        report(expense?.institutions);
                      }}
                      text="Baixar relatório"
                      typeButton=""
                    />
                  </>
                }
              />
            </Saside>

            <Shopping />
          </Ssection>

          <Modal
            title={
              institutionUpdate ? "Editando cartão" : "Criando novo cartão"
            }
            isVisible={isModalVisible}
            handlerIsVisible={exitModal}
          >
            <InstitutionForm
              exitModal={exitModal}
              institution={institutionUpdate}
            />
          </Modal>
        </div>
      ) : (
        ""
      )}
    </Swrapper>
  );
};
