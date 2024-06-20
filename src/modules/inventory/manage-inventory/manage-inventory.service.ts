type InventoryItem = {
  name: string;
  quantity: number;
};

type ManageInventoryPageModel = {
  products: Array<InventoryItem> | null;
  shouldShowLoadingIndicator: boolean;
};

export const getManageInventoryPageModel = (
  saveInventoryResponse?: Array<InventoryItem>,
  saveInventoryError?: Error | null,
  isSaveInventoryPending = false,
  isResetInventoryPending = false
): ManageInventoryPageModel => {
  return {
    products: saveInventoryResponse ?? null,
    shouldShowLoadingIndicator:
      isSaveInventoryPending || isResetInventoryPending,
  };
};
