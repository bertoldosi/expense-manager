import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ShoppingTableHeader from "../TableHeader";
import InputTable from "@commons/InputTable";

import { NoResult, Scontent, SrowTable } from "./styles";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import { formatedInputValue } from "@helpers/formatedInputValue";
import InputSelectTable from "@commons/InputSelectTable ";
import { Button } from "@commons/Button";
import { userContext, userContextType } from "@context/userContext";

import { InstitutionInterface, ShoppingInterface } from "@interfaces/*";
import { DragDrop } from "@commons/DragDrop";

interface InstitutionType extends InstitutionInterface {}
interface ShoppingType extends ShoppingInterface {}
interface ResultType {
  draggableId: string;
  type: string;
  reason: string;
  mode: string;
  source: {
    index: number;
    droppableId: string;
  };
  destination: { droppableId: string; index: number };
}

const options = [
  { label: "Aberto", value: "open" },
  { label: "Pago", value: "closed" },
];

function ShoppingTable() {
  const [idShoppingUpdate, setIdShoppingUpdate] = useState<string>("");

  const { institution, setInstitution, expense, recalculate } = useContext(
    userContext
  ) as userContextType;

  function onChangeShopping(ev: React.ChangeEvent<HTMLInputElement>) {
    const { id, name, value, checked } = ev.target;
    if (name != "selected") {
      setIdShoppingUpdate(id);
    }

    setInstitution((prevInstitution: InstitutionType) => {
      return {
        ...prevInstitution,
        shoppings: prevInstitution.shoppings?.map((shoppingMap) => {
          if (shoppingMap.id === id) {
            return {
              ...shoppingMap,
              [name]:
                name != "selected" ? formatedInputValue(value, name) : checked,
            };
          }

          return shoppingMap;
        }),
      };
    });
  }

  async function onChangeStatus(
    ev: React.ChangeEvent<HTMLInputElement>,
    shopping: ShoppingType
  ) {
    const { value } = ev.target;

    onChangeShopping(ev);
    await updateShopping({ ...shopping, paymentStatus: value });
  }

  async function updateShopping(shopping: ShoppingType) {
    setIdShoppingUpdate("");

    /* guardar os dados anteriores, para inserir novamente, em casos de erro ao deletar */
    const institutionOld = institution;
    const expenseOld = expense;

    /* salvando os novos valores localmente */
    const institutionUpdate = {
      ...institution,
      shoppings: institution?.shoppings?.map((mapShopping) => {
        if (mapShopping.id === shopping.id) {
          return shopping;
        }

        return mapShopping;
      }),
    };
    const expenseUpdate = {
      ...expense,
      institutions: expense?.institutions?.map((mapInstitution) => {
        if (mapInstitution.id == institutionUpdate?.id) {
          return institutionUpdate;
        }

        return mapInstitution;
      }),
    };

    shopping.amount = shopping.amount.replace(",", "");

    recalculate(expenseUpdate, institutionUpdate);

    async function requestUpdate() {
      return await instances
        .put("api/shoppings", {
          ...shopping,
          amount: shopping.amount.replace(/,/g, ""),
        })
        .catch((err) => {
          recalculate(expenseOld, institutionOld);

          throw new Error(
            "Houve algum erro ao tentar atualizar o item, tente novamente mais tarde!"
          );
        });
    }

    await customToast(requestUpdate);
  }

  async function updateItemsOrder(reorderedItems) {
    const requestUpdate = async () => {
      return await instances.put("api/reorder-shoppings", {
        shoppings: reorderedItems,
      });
    };
    await customToast(requestUpdate);
  }

  const reorder = (
    shoppings: ShoppingType[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(shoppings);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = async (result: ResultType) => {
    if (!result.destination) {
      return;
    }

    const shoppings = institution?.shoppings || [];

    const shoppingsReorded = reorder(
      shoppings,
      result.source.index,
      result.destination.index
    );

    setInstitution((prevInstitution: InstitutionType) => ({
      ...prevInstitution,
      shoppings: shoppingsReorded,
    }));

    await updateItemsOrder(shoppingsReorded);
  };

  const toggleDraggable = (id: string) => {
    const updatedItems = institution?.shoppings?.map((item: any) =>
      item.id === id ? { ...item, isDraggable: !item.isDraggable } : item
    );

    setInstitution((prevInstitution) => ({
      ...prevInstitution,
      shoppings: updatedItems,
    }));
  };

  if (institution?.shoppings?.length) {
    return (
      <>
        <ShoppingTableHeader />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Scontent {...provided.droppableProps} ref={provided.innerRef}>
                {institution?.shoppings?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => {
                      return (
                        <SrowTable
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          selected={item.selected || false}
                          key={index}
                          paymentStatus={item.paymentStatus}
                        >
                          <DragDrop
                            {...provided.dragHandleProps}
                            onClick={() => toggleDraggable(item.id)}
                          />

                          <strong>
                            <InputTable
                              id={item.id}
                              type="checkbox"
                              name="selected"
                              checked={item.selected}
                              onChange={onChangeShopping}
                            />
                            <InputTable
                              id={item.id}
                              name="description"
                              handleEnter={() => {
                                updateShopping(item);
                              }}
                              value={item.description || ""}
                              onChange={onChangeShopping}
                            />
                          </strong>
                          <strong>
                            <InputTable
                              id={item.id}
                              name="amount"
                              handleEnter={() => {
                                updateShopping(item);
                              }}
                              value={
                                formatedInputValue(item.amount, "amount") || ""
                              }
                              onChange={onChangeShopping}
                            />
                          </strong>
                          <strong>
                            <InputTable
                              id={item.id}
                              name="category"
                              handleEnter={() => {
                                updateShopping(item);
                              }}
                              value={item.category || ""}
                              onChange={onChangeShopping}
                            />
                          </strong>
                          <strong>
                            <InputSelectTable
                              options={options}
                              id={item.id}
                              name="paymentStatus"
                              value={item.paymentStatus}
                              onChange={(
                                ev: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                onChangeStatus(ev, item);
                              }}
                            />

                            {idShoppingUpdate === item.id && (
                              <Button
                                text="Salvar"
                                width="10rem"
                                height="2rem"
                                onClick={() => {
                                  updateShopping(item);
                                }}
                              />
                            )}
                          </strong>
                        </SrowTable>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Scontent>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }

  return (
    <>
      <ShoppingTableHeader />
      <Scontent>
        <NoResult>
          <span>Nenhum resultado encontrado!</span>
        </NoResult>
      </Scontent>
    </>
  );
}

export default ShoppingTable;
