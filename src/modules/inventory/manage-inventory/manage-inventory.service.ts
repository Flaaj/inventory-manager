import { InventoryItems } from "../../../models/inventory-items";
import { Products } from "../../../models/products";

type ManageInventoryPageModel = {
  productOptions: Products | null;
  inventoryItems: InventoryItems | null;
  shouldShowLoadingIndicator: boolean;
  error: string | null;
};

export type ManageInventoryPageModelParams = {
  products?: Products;
  inventoryItems?: InventoryItems;
  saveInventoryError?: Error | null;
  isSaveInventoryPending: boolean;
  isResetInventoryPending: boolean;
};

export const getManageInventoryPageModel = (
  params: ManageInventoryPageModelParams
): ManageInventoryPageModel => {
  const {
    products,
    inventoryItems,
    saveInventoryError,
    isSaveInventoryPending,
    isResetInventoryPending,
  } = params;

  const inventoryProductNames = new Set(
    inventoryItems?.map((inventoryItem) => inventoryItem.name)
  );

  const filteredProducts = products?.filter(
    (product) => !inventoryProductNames.has(product.name)
  );

  return {
    productOptions: filteredProducts ?? null,
    inventoryItems: inventoryItems ?? null,
    shouldShowLoadingIndicator:
      isSaveInventoryPending || isResetInventoryPending,
    error: saveInventoryError?.message ?? null,
  };
};
