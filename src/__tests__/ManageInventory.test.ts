import { describe, expect, it } from "vitest";

describe("Manage inventory", () => {
  it("Shows inventory", () => {
    const productsFromApi = [
      { name: "Product 1", quantity: 10 },
      { name: "Product 2", quantity: 20 },
      { name: "Product 3", quantity: 30 },
    ];

    const model = getManageInventoryPageModel(productsFromApi);

    expect(model.products).toStrictEqual([
      { name: "Product 1", quantity: 10 },
      { name: "Product 2", quantity: 20 },
      { name: "Product 3", quantity: 30 },
    ]);
  });
});
