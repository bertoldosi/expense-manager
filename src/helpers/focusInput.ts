export const focusInput = (valor: string) => {
  const inputsTable = window.document.getElementsByName(valor);
  const firstInput = inputsTable[0];
  firstInput?.focus();
};
