type InventoryItem = {
  name: string;
  quantity: number;
};

type ManageInventoryPageModel = {
  products: Array<InventoryItem>;
};

const getManageInventoryPageModel = (
  response: Array<InventoryItem>
): ManageInventoryPageModel => {};
