import { useManageInventoryPage } from "../modules/inventory/manage-inventory/useManageInventory";

const InventoryPage = () => {
  const { actions, model } = useManageInventoryPage();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const productName = formData.get("product-name") as string;
          const productQuantity = Number(formData.get("product-quantity"));
          if (productName && productQuantity) {
            actions.addInventoryItem({
              name: productName,
              quantity: productQuantity,
            });
          }
          e.currentTarget.reset();
        }}
      >
        <select name="product-name">
          {model.productOptions?.map((product) => (
            <option key={product.name} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        <input type="number" name="product-quantity" min="1" step="1" />
        <button type="submit">Add product</button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          if (!model.inventoryItems) return;
          const inventoryItems = model.inventoryItems?.map((item, index) => ({
            name: item.name,
            quantity: Number(formData.get(`inventory-${index + 1}-quantity`)),
          }));
          actions.saveInventory(inventoryItems);
        }}
      >
        <ul>
          {model.inventoryItems?.map((item, index) => (
            <li key={item.name}>
              <p>{item.name}</p>
              <input
                type="number"
                id={`inventory-${index + 1}`}
                min="0"
                step="1"
                name={`inventory-${index + 1}-quantity`}
                defaultValue={item.quantity}
              />
            </li>
          ))}
        </ul>

        <div>
          <button type="submit" disabled={model.shouldShowLoadingIndicator}>
            Save inventory
          </button>

          <button
            type="button"
            onClick={() => actions.resetInventory()}
            disabled={model.shouldShowLoadingIndicator}
          >
            Reset inventory
          </button>
        </div>

        {model.error && <p>{model.error}</p>}

        {model.shouldShowLoadingIndicator && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default InventoryPage;
