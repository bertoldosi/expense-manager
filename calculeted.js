const expenseData = [
  {
    referenceMonth: "2025-01",
    owner: "joao.silva",
    currency: "BRL",

    accounts: [
      {
        id: "acc-001",
        bank: "Santander",

        transactions: [
          {
            id: "tx-001",
            description: "Supermercado",
            amount: 1000,
            person: "matheus",
            category: "alimentacao",
          },
          {
            id: "tx-003",
            description: "Assinatura Streaming",
            amount: 500,
            person: "matheus",
            category: "entretenimento",
          },
          {
            id: "tx-002",
            description: "Restaurante",
            amount: 1000,
            person: "fran",
            category: "alimentacao",
          },

          {
            id: "tx-004",
            description: "Farmácia",
            amount: 500,
            person: "fran",
            category: "saude",
          },
        ],
      },
      {
        id: "acc-002",
        bank: "Inter",

        transactions: [
          {
            id: "tx-001",
            description: "Supermercado",
            amount: 1000,
            person: "matheus",
            category: "alimentacao",
          },
          {
            id: "tx-002",
            description: "Restaurante",
            amount: 1000,
            person: "fran",
            category: "alimentacao",
          },
          {
            id: "tx-003",
            description: "Assinatura Streaming",
            amount: 500,
            person: "matheus",
            category: "entretenimento",
          },
          {
            id: "tx-004",
            description: "Farmácia",
            amount: 500,
            person: "fran",
            category: "saude",
          },
        ],
      },
    ],
  },
];

function isObjectEmpty(obj) {
  if (obj === undefined || null) return true;

  return Object.keys(obj).length === 0;
}

const even = (element, compare) => {
  return element.name === compare.name;
};

function calcAmountGroup(list = []) {
  let acc = [];
  const result = list.map((transaction) => {
    const hasPerson = acc.some(
      (element) => element.person === transaction.person
    );

    if (hasPerson) {
      acc.push((item) => {
        console.log(item);
      });
    }

    acc.push(transaction);

    return transaction;
  });

  result;
}

function calculeted() {
  const expense = expenseData[0];
  const accountByName = expense.accounts[0];
  const byPerson = calcAmountGroup(accountByName.transactions);

  const summaries = {
    byPerson: {
      total: 4000,
      items: [
        { name: "matheus", total: 2000 },
        { name: "fran", total: 2000 },
      ],
    },
    // byCategory: {
    //   total: 4000,
    //   items: [
    //     {
    //       total: 2000,
    //       name: "matheus",
    //       items: [
    //         { name: "alimentacao", total: 2000 },
    //         { name: "entretenimento", total: 2000 },
    //         { name: "saude", total: 2000 },
    //       ],
    //     },
    //   ],
    // },
  };
}

calculeted();
