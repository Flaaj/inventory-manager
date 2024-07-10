import { describe, expect, it } from "vitest";
import { ManageInventoryPageModelParams, getManageInventoryPageModel } from "../modules/inventory/manage-inventory/manage-inventory.service";

describe("Manage inventory", () => {
  const baseParams: ManageInventoryPageModelParams = {
    products: undefined,
    inventoryItems: undefined,
    saveInventoryError: null,
    isSaveInventoryPending: false,
    isResetInventoryPending: false,
  };

  it("Shows inventory items", () => {
    const params = {
      ...baseParams,
      inventoryItems: [
        { name: "Product 1", quantity: 10 },
        { name: "Product 2", quantity: 20 },
        { name: "Product 3", quantity: 30 },
        { name: "Product 4", quantity: 40 },
        { name: "Product 5", quantity: 50 },
      ],
    };

    const model = getManageInventoryPageModel(params);

    expect(model.inventoryItems).toStrictEqual([
      { name: "Product 1", quantity: 10 },
      { name: "Product 2", quantity: 20 },
      { name: "Product 3", quantity: 30 },
      { name: "Product 4", quantity: 40 },
      { name: "Product 5", quantity: 50 },
    ]);
  });

  it("Lists available products", () => {
    const params = {
      ...baseParams,
      products: [
        { name: "Product 1" },
        { name: "Product 2" },
        { name: "Product 3" },
        { name: "Product 4" },
        { name: "Product 5" },
      ],
    };

    const model = getManageInventoryPageModel(params);

    expect(model.productOptions).toStrictEqual([
      { name: "Product 1" },
      { name: "Product 2" },
      { name: "Product 3" },
      { name: "Product 4" },
      { name: "Product 5" },
    ]);
  });

  it("Filters out products that are already in the inventory", () => {
    const params = {
      ...baseParams,
      products: [
        { name: "Product 1" },
        { name: "Product 2" },
        { name: "Product 3" },
        { name: "Product 4" },
        { name: "Product 5" },
      ],
      inventoryItems: [
        { name: "Product 1", quantity: 10 },
        { name: "Product 2", quantity: 20 },
        { name: "Product 3", quantity: 30 },
      ],
    };

    const model = getManageInventoryPageModel(params);

    expect(model.productOptions).toStrictEqual([
      { name: "Product 4" },
      { name: "Product 5" },
    ]);

    expect(model.inventoryItems).toStrictEqual([
      { name: "Product 1", quantity: 10 },
      { name: "Product 2", quantity: 20 },
      { name: "Product 3", quantity: 30 },
    ]);
  });

  it("Shows loading indicator if request is processing", () => {
    let model = getManageInventoryPageModel({
      ...baseParams,
      isSaveInventoryPending: false,
      isResetInventoryPending: false,
    });

    expect(model.shouldShowLoadingIndicator).toBe(false);

    model = getManageInventoryPageModel({
      ...baseParams,
      isSaveInventoryPending: true,
      isResetInventoryPending: false,
    });

    expect(model.shouldShowLoadingIndicator).toBe(true);

    model = getManageInventoryPageModel({
      ...baseParams,
      isSaveInventoryPending: false,
      isResetInventoryPending: true,
    });

    expect(model.shouldShowLoadingIndicator).toBe(true);
  });

  it("Shows error message if request fails", () => {
    const params = {
      ...baseParams,
      saveInventoryError: new Error(
        "Some of the inventory items are missing in the products list"
      ),
    };

    const model = getManageInventoryPageModel(params);

    expect(model.error).toBe(
      "Some of the inventory items are missing in the products list"
    );
  });
});
