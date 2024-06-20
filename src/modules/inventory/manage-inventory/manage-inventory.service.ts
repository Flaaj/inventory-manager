import { InventoryItem, Product } from "../../../api/types";

type ManageInventoryPageModel = {
  productOptions: Array<Product> | null;
  inventoryItems: Array<InventoryItem> | null;
  shouldShowLoadingIndicator: boolean;
  error: string | null;
};

export const getManageInventoryPageModel = (
  getProductsResponse?: Array<Product>,
  getInventoryItemsResponse?: Array<InventoryItem>,
  saveInventoryError?: Error | null,
  isSaveInventoryPending = false,
  isResetInventoryPending = false
): ManageInventoryPageModel => {
  const inventoryProductNames = new Set(
    getInventoryItemsResponse?.map((inventoryItem) => inventoryItem.name)
  );

  const filteredProducts = getProductsResponse?.filter(
    (product) => !inventoryProductNames.has(product.name)
  );

  return {
    productOptions: filteredProducts ?? null,
    inventoryItems: getInventoryItemsResponse ?? null,
    shouldShowLoadingIndicator:
      isSaveInventoryPending || isResetInventoryPending,
    error: saveInventoryError?.message ?? null,
  };
};
