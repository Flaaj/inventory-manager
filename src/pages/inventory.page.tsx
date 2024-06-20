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
          required
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
          <span className="text-lg text-gray-500 mr-10">Quantity</span>
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
                className="w-20 shrink-0 ml-auto mr-4"
                type="number"
                id={`inventory-${index + 1}`}
                min="0"
                step="1"
                name={`inventory-${index + 1}-quantity`}
                defaultValue={item.quantity}
                required
              />
              <button
                type="button"
                id={`delete-inventory-${index + 1}`}
                disabled={model.shouldShowLoadingIndicator}
                onClick={() => actions.deleteInventoryItem(item)}
              >
                <DeleteIcon />
              </button>
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

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="red"
    className="size-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);
