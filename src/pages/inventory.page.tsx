import { Button } from "../components/Button";
import Input from "../components/Input";
import { Select } from "../components/Select";
import { useManageInventoryPage } from "../modules/inventory/manage-inventory/useManageInventory";

export const InventoryPage = () => {
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
        className="flex gap-4 my-4 flex-col md:flex-row"
      >
        <Select
          label="Select product name:"
          id="product-name"
          name="product-name"
          className="flex-1"
        >
          {model.productOptions?.map((product) => (
            <option key={product.name} value={product.name}>
              {product.name}
            </option>
          ))}
        </Select>
        <Input
          label="Quantity:"
          id="product-quantity"
          type="number"
          name="product-quantity"
          min="1"
          step="1"
        />
        <Button type="submit">Add product</Button>
      </form>

      <h2 className="text-2xl font-bold text-blue-700 my-4">Your Inventory:</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          if (!model.inventoryItems) return;
          const inventoryItems = model.inventoryItems
            ?.map((item, index) => ({
              name: item.name,
              quantity: Number(formData.get(`inventory-${index + 1}-quantity`)),
            }))
            .filter((item) => item.quantity > 0);
          actions.saveInventory(inventoryItems);
        }}
      >
        <div className="flex flex-row justify-between">
          <span className="text-lg text-gray-500">Product name</span>
          <span className="text-lg text-gray-500">Quantity</span>
        </div>
        <ul>
          {model.inventoryItems?.length === 0 && (
            <li className="flex justify-between py-1 border-t last:border-b items-center">
              <p>No items in inventory</p>
            </li>
          )}
          {model.inventoryItems?.map((item, index) => (
            <li
              key={item.name}
              className="flex justify-between py-1 border-t last:border-b items-center"
            >
              <p>{item.name}</p>
              <Input
                type="number"
                id={`inventory-${index + 1}`}
                min="0"
                step="1"
                name={`inventory-${index + 1}-quantity`}
                defaultValue={item.quantity}
                className="w-20 shrink-0"
              />
            </li>
          ))}
        </ul>

        <div className="flex gap-4 mt-6 flex-col justify-center sm:flex-row">
          <Button type="submit" disabled={model.shouldShowLoadingIndicator}>
            Save inventory
          </Button>

          <Button
            type="button"
            onClick={() => actions.resetInventory()}
            disabled={model.shouldShowLoadingIndicator}
          >
            Reset inventory
          </Button>
        </div>

        {model.error && (
          <p className="text-red-600 text-center mt-4">{model.error}</p>
        )}

        {model.shouldShowLoadingIndicator && <p>Loading...</p>}
      </form>
    </div>
  );
};
