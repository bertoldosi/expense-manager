import React from "react";

interface GetShoppingType {
  id: string;
  name: string;
  category: string;
  institutionId: string;
}

function Edit() {
  const [shoppings, setShoppings] = React.useState<GetShoppingType[]>([]);

  async function fetchShoppings() {
    try {
      const response = await fetch("/api/filter-all-shoppings/getShopping");
      const data = await response.json();
      console.log("Fetched shoppings:", data);
      setShoppings(data);
    } catch (error) {
      console.error("Error fetching shoppings:", error);
    }
  }

  React.useEffect(() => {
    fetchShoppings();
  }, []);

  return (
    <div>
      <h1>Lista de Compras</h1>
      <ul>
        {shoppings.map((shopping) => (
          <div>
            <li key={shopping.id}>
              <span>{shopping.name}</span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Edit;
