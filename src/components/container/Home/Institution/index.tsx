import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import InstitutionMenuCard from "@containers/Home/InstitutionMenuCard";
import InstitutionMenuHeader from "@containers/Home/InstitutionMenuHeader";

import {
  Saside,
  ScontentModal,
  Sfilterform,
  Ssection,
  Swrapper,
} from "./styles";

import InstitutionForm from "../InstitutionForm";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import Shopping from "@containers/Home/Shopping";
import Cookies from "universal-cookie";
import { formatMorney } from "@helpers/formatMorney";
import moment from "moment";
import orderByCategory from "@helpers/orderByCategory";
import { userContext, userContextType } from "@context/userContext";

import { InstitutionInterface } from "@interfaces/*";
import { useFormik } from "formik";
import InputSelect from "@commons/InputSelect";

interface CategoryTotalsType {
  category: string;
  total: number;
}
interface ShoppingType {
  id: string;
  description: string;
  category: string;
  amount: string;
  paymentStatus: string;
  createAt: string;
  institutionId: string;
}
interface InstitutionType extends InstitutionInterface {
  totalAmount?: number;
  expenseId?: string;
  categoryTotals?: CategoryTotalsType[] | null | undefined;
  shoppings?: ShoppingType[];
}
interface CategoryTotalsMonthType {
  date: string;
  categoryTotals: CategoryTotalsType[];
}

const INITIAL_OPTIONS = {
  category: "all",
};

const keyCookies = "expense-manager";

export const Institution = () => {
  const cookies = new Cookies();

  const { institution, getExpense, expense } = useContext(
    userContext
  ) as userContextType;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalReportVisible, setIsModalReportVisible] =
    useState<boolean>(false);
  const [institutionUpdate, setInstitutionUpdate] =
    useState<InstitutionType | null>(null);

  const [categotyTotalsMonth, setCategoryTotalsMonth] =
    useState<CategoryTotalsMonthType>();

  function openModal() {
    setIsModalVisible(!isModalVisible);
  }

  function exitModal() {
    setIsModalVisible(!isModalVisible);
    setInstitutionUpdate(null);
  }

  async function updateInstitution(institutionData) {
    setInstitutionUpdate(institutionData);
    openModal();
  }

  async function deleteInstitution(institution) {
    const cookieValues = cookies.get(keyCookies);

    async function requestDelete() {
      await instances.delete("api/v2/institution", {
        params: {
          id: institution.id,
        },
      });

      const expenseId = cookieValues?.filter?.expense?.id;
      const institutionCreateAt = cookieValues?.filter?.dateSelected;
      getExpense(expenseId, institutionCreateAt);

      return;
    }

    await customToast(requestDelete);
  }

  function reportAll(institutions) {
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

  function reportCategory(categoty, institutions) {
    const doc = new jsPDF();

    if (institutions?.length) {
      const categotyTotalsCategoryTable = new Array();
      categotyTotalsMonth?.categoryTotals.map((findCategoryTotal) => {
        if (findCategoryTotal.category === categoty) {
          return categotyTotalsCategoryTable.push(
            "TOTAL A PAGAR",
            formatMorney(findCategoryTotal.total)
          );
        }
      });

      const institutionsByCategory = new Array();
      institutions.map((mapInstitution) => {
        const shoppingByCategory = mapInstitution?.shoppings?.filter(
          (mapShopping) => mapShopping.category === categoty
        );

        institutionsByCategory.push({
          ...mapInstitution,
          shoppings: shoppingByCategory,
        });
      });

      //Exibindo as tabelas de gastos de cada mês
      institutionsByCategory?.map((institution: InstitutionType, index) => {
        const shoppingsTable = institution.shoppings?.map((shopping) => {
          const amount =
            shopping.paymentStatus === "open"
              ? "+ " + `${formatMorney(shopping.amount)}`
              : "- " + `${formatMorney(shopping.amount)}`;
          const description = shopping.description;
          const category = shopping.category;
          const status = shopping.paymentStatus === "open" ? "Aberto" : "Pago";
          return [description, amount, category, status];
        });

        const totalInstitutionByCategory = institution.categoryTotals?.find(
          (findCategoryTotal) => findCategoryTotal.category === categoty
        );

        //Tabela de gastos
        if (institution?.shoppings?.length) {
          autoTable(doc, {
            theme: "plain",
            head: [[`${institution.name}`]],
            body: [],
            showHead: "firstPage",
          });

          autoTable(doc, {
            theme: "striped",
            head: [["Descrição", "Valor", "Responsavel", "Status"]],
            body: shoppingsTable,
            showHead: "firstPage",
          });

          autoTable(doc, {
            theme: "striped",
            body: [
              [
                `TOTAL ${institution.name}`,
                `${formatMorney(totalInstitutionByCategory?.total || 0)}`,
                "",
                "",
              ],
            ],
            showHead: "firstPage",
            bodyStyles: { fontSize: 9, fontStyle: "bold" },
          });
        }
      });

      //Exibindo total mensal
      autoTable(doc, {
        theme: "plain",
        body: [categotyTotalsCategoryTable],
        showHead: "firstPage",
        showFoot: "lastPage",
        bodyStyles: { fontSize: 13, fontStyle: "bolditalic" },
      });

      const cookiesValues = cookies.get("expense-manager");

      doc.save(`relatorio ${categoty} ${cookiesValues?.filter?.dateSelected}`);
    }
  }

  const onSubmitReportShopping = useFormik({
    initialValues: INITIAL_OPTIONS,
    onSubmit: async (values) => {
      if (values.category === "all") {
        return reportAll(expense?.institutions);
      }

      return reportCategory(values.category, expense?.institutions);
    },
  });

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
                totalAmount={expense?.totalPerMonth?.total || 0}
                items={expense?.categoryTotals?.map((categorie) => ({
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
                        setIsModalReportVisible(!isModalReportVisible);
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

          <Modal
            title="Relatório"
            isVisible={isModalReportVisible}
            handlerIsVisible={() => {
              setIsModalReportVisible(!isModalReportVisible);
            }}
          >
            <ScontentModal>
              <Sfilterform onSubmit={onSubmitReportShopping.handleSubmit}>
                <InputSelect
                  name="category"
                  id="category"
                  value={onSubmitReportShopping.values.category}
                  onChange={onSubmitReportShopping.handleChange}
                  defaultOption={{ value: "all", label: "Todos" }}
                  options={
                    categotyTotalsMonth?.categoryTotals.map((option) => ({
                      value: option.category,
                      label: option.category,
                    })) || []
                  }
                />
                <Button text="Baixar" type="submit" width="20rem" />
              </Sfilterform>
            </ScontentModal>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </Swrapper>
  );
};
