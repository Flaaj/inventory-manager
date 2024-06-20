import { describe, expect, it } from "vitest";
import { getManageInventoryPageModel } from "../modules/inventory/manage-inventory/manage-inventory.service";

describe("Manage inventory", () => {
  it("Shows inventory items", () => {
    const model = getManageInventoryPageModel(
      [],
      [
        { name: "Product 1", quantity: 10 },
        { name: "Product 2", quantity: 20 },
        { name: "Product 3", quantity: 30 },
        { name: "Product 4", quantity: 40 },
        { name: "Product 5", quantity: 50 },
      ],
      null,
      false,
      false
    );

    expect(model.inventoryItems).toStrictEqual([
      { name: "Product 1", quantity: 10 },
      { name: "Product 2", quantity: 20 },
      { name: "Product 3", quantity: 30 },
      { name: "Product 4", quantity: 40 },
      { name: "Product 5", quantity: 50 },
    ]);
  });

  it("Lists available products", () => {
    const model = getManageInventoryPageModel(
      [
        { name: "Product 1" },
        { name: "Product 2" },
        { name: "Product 3" },
        { name: "Product 4" },
        { name: "Product 5" },
      ],
      [],
      null,
      false,
      false
    );

    expect(model.productOptions).toStrictEqual([
      { name: "Product 1" },
      { name: "Product 2" },
      { name: "Product 3" },
      { name: "Product 4" },
      { name: "Product 5" },
    ]);
  });

  it("Filters out products that are already in the inventory", () => {
    const model = getManageInventoryPageModel(
      [
        { name: "Product 1" },
        { name: "Product 2" },
        { name: "Product 3" },
        { name: "Product 4" },
        { name: "Product 5" },
      ],
      [
        { name: "Product 1", quantity: 10 },
        { name: "Product 2", quantity: 20 },
        { name: "Product 3", quantity: 30 },
      ],
      null,
      false,
      false
    );

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
    let model = getManageInventoryPageModel([], [], null, false, false);

    expect(model.shouldShowLoadingIndicator).toBe(false);

    model = getManageInventoryPageModel([], [], null, true, false);

    expect(model.shouldShowLoadingIndicator).toBe(true);

    model = getManageInventoryPageModel([], [], null, false, true);

    expect(model.shouldShowLoadingIndicator).toBe(true);
  });

  it("Shows error message if request fails", () => {
    const model = getManageInventoryPageModel(
      [],
      [],
      new Error("Some of the inventory items are missing in the products list"),
      false,
      false
    );

    expect(model.error).toBe(
      "Some of the inventory items are missing in the products list"
    );
  });
});
