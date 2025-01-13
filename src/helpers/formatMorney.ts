export const formatMorney = (value: number | string) => {
  // Verifica se o valor é uma string com vírgula (formato "84,00") e converte para número
  if (typeof value === "string" && value.includes(",")) {
    // Substitui vírgula por ponto para converter corretamente para número
    value = value.replace(".", "").replace(",", ".");
  }

  // Converte para número
  let parsedValue = Number(value);

  // Se a conversão para número falhar, trata como 0
  if (isNaN(parsedValue)) {
    parsedValue = 0;
  }

  // Divide por 100 apenas para números inteiros ou strings numéricas sem vírgula/ponto
  if (typeof value === "number" || /^[0-9]+$/.test(value.toString())) {
    parsedValue = parsedValue / 100;
  }

  console.log({ type: typeof parsedValue, value: parsedValue });

  // Formata o valor para moeda
  const valueFormat = parsedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return valueFormat;
};
