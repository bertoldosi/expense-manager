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

import { userContextData, userContextDataType } from "@context/userContextData";
import InstitutionForm from "../InstitutionForm";
import { InstitutionType } from "@interfaces/*";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import Shopping from "@containers/Home/Shopping";
import Cookies from "universal-cookie";
import { formatMorney } from "@helpers/formatMorney";
import moment from "moment";
import orderByCategory from "@helpers/orderByCategory";
import InputSelect from "@commons/InputSelect";
import { useFormik } from "formik";

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

const INITIAL_OPTIONS = {
  category: "all",
};

export const Institution = () => {
  const cookies = new Cookies();

  const { getExpense, institution, setInstitution, expense, categories } =
    useContext(userContextData) as userContextDataType;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalReportVisible, setIsModalReportVisible] =
    useState<boolean>(false);
  const [institutionUpdate, setInstitutionUpdate] =
    useState<InstitutionType | null>(null);

  const [categotyTotalsMonth, setCategoryTotalsMonth] =
    useState<CategoryTotalsMonthType>();
  const [totalsMonth, setTotalsMonth] = useState<TotalsMonthType>();

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
          const { filter } = cookies.get("expense-manager");

          await getExpense(filter?.expense?.id, filter.institutions.createAt);
          setInstitution(null);
        });
    }

    await customToast(requestDelete);
  }

  async function updateInstitution(institutionData: InstitutionType) {
    setInstitutionUpdate(institutionData);
    openModal();
  }

  function getCategoryTotalsMonthAndTotalsMonth(categoryTotals, totalsMonth) {
    const { filter } = cookies.get("expense-manager");

    const categoryTotalsFilter = categoryTotals.find(
      (categoryTotal: any) =>
        categoryTotal.date === filter.institutions.createAt
    );

    const totalMonthFilter = totalsMonth.find(
      (categoryTotalPerDate) =>
        categoryTotalPerDate.date === filter.institutions.createAt
    );

    setCategoryTotalsMonth(categoryTotalsFilter);
    setTotalsMonth(totalMonthFilter);
  }

  function reportAll(institutions: InstitutionType[] | undefined) {
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

  function reportCategory(
    categoty: string,
    institutions: InstitutionType[] | undefined
  ) {
    const doc = new jsPDF();

    if (institutions?.length) {
      const categotyTotalsCategoryTable = new Array();
      categotyTotalsMonth?.categoryTotals.map((findCategoryTotal) => {
        if (findCategoryTotal.category === categoty) {
          return categotyTotalsCategoryTable.push(
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

      doc.text(`#${institution?.createAt}`, 12, 10);

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
        if (institution.shoppings?.length) {
          autoTable(doc, {
            theme: "striped",
            head: [[`${institution.name}`, "", "", ""]],
            foot: [
              [
                "TOTAL",
                `${formatMorney(totalInstitutionByCategory?.total || 0)}`,
                "",
                "",
              ],
            ],
            body: shoppingsTable,
            showHead: "firstPage",
          });
        }
      });

      //Exibindo total mensal
      autoTable(doc, {
        theme: "plain",
        head: [["TOTAL A PAGAR"]],
        body: [categotyTotalsCategoryTable],
        showHead: "firstPage",
        showFoot: "lastPage",
      });

      const dateNow = moment().format("DD-MM-YYYY");
      doc.save(`relatorio-de-gastos-${dateNow}`);
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

  useEffect(() => {
    if (expense?.categoryTotalPerDate && expense?.totalPerDate) {
      getCategoryTotalsMonthAndTotalsMonth(
        expense.categoryTotalPerDate,
        expense.totalPerDate
      );
    }
  }, [expense]);

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
