import { describe, expect, it } from "vitest";
import { getManageInventoryPageModel } from "../modules/inventory/manage-inventory/manage-inventory.service";

describe("Manage inventory", () => {
  it("Shows inventory", () => {
    const model = getManageInventoryPageModel(
      [
        { name: "Product 1", quantity: 10 },
        { name: "Product 2", quantity: 20 },
        { name: "Product 3", quantity: 30 },
      ],
      null,
      false,
      false
    );

    expect(model.products).toStrictEqual([
      { name: "Product 1", quantity: 10 },
      { name: "Product 2", quantity: 20 },
      { name: "Product 3", quantity: 30 },
    ]);
  });

  it("Shows loading indicator if request is processing", () => {
    let model = getManageInventoryPageModel(undefined, undefined, false, false);

    expect(model.shouldShowLoadingIndicator).toBe(false);

    model = getManageInventoryPageModel(undefined, undefined, true, false);

    expect(model.shouldShowLoadingIndicator).toBe(true);

    model = getManageInventoryPageModel(undefined, undefined, false, true);

    expect(model.shouldShowLoadingIndicator).toBe(true);
  });
});
