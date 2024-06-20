import { InventoryItem, Product } from "../../../api/types";

type ManageInventoryPageModel = {
  products: Array<Product> | null;
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
  return {
    products: getProductsResponse ?? null,
    inventoryItems: getInventoryItemsResponse ?? null,
    shouldShowLoadingIndicator:
      isSaveInventoryPending || isResetInventoryPending,
    error: saveInventoryError?.message ?? null,
  };
};
