export const maskDate = (value: string, name: string): string => {
  if (name === "expirationDate") {
    value = value.replace(/^(\d{3})(\d{3})(\d{4}).*/, "($1) $2-$3");
    return value;
  }

  return value;
};
