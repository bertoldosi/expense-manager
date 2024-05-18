export const formatMorney = (value: number | string) => {
  value = Number(value) / 100;

  const valueFormat = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return valueFormat;
};
