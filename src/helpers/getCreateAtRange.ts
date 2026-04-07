function getCreateAtRange(createAt?: string) {
  if (!createAt) {
    return undefined;
  }

  const [, monthValue, yearValue] = createAt.split("/").map(Number);

  return {
    gte: new Date(Date.UTC(yearValue, monthValue - 1, 1)),
    lt: new Date(Date.UTC(yearValue, monthValue, 1)),
  };
}

export default getCreateAtRange;
