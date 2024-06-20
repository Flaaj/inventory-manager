import { describe, expect, it } from "vitest";
import { getNewProductPageModel } from "../modules/products/use_cases/add-product/add-product.service";

describe("New product page model", () => {
  it("Shows the form to add a product if user didn't submit yet", () => {
    const model = getNewProductPageModel(undefined, undefined, false);

    expect(model.shouldShowForm).toBe(true);
    expect(model.error).toBe(null);
    expect(model.products).toBe(null);
    expect(model.shouldShowSuccessMessage).toBe(false);
    expect(model.shouldShowLoadingIndicator).toBe(false);
  });

  it("Shows the form and error message on error", () => {
    const model = getNewProductPageModel(undefined, {
      error: "product name already exists",
    });

    expect(model.shouldShowForm).toBe(true);
    expect(model.error).toEqual("product name already exists");
  });

  it("Hides the form and shows success message and products list if user submits the form correctly", () => {
    const model = getNewProductPageModel(
      [
        { name: "Product 1" }, //
        { name: "Product you just added" },
      ],
      undefined,
      false
    );

    expect(model.shouldShowForm).toBe(false);
    expect(model.products).toStrictEqual([
      { name: "Product 1" }, //
      { name: "Product you just added" },
    ]);
    expect(model.shouldShowSuccessMessage).toBe(true);
  });

  it("Shows loading indicator if request is processing", () => {
    const model = getNewProductPageModel(undefined, undefined, true);

    expect(model.shouldShowLoadingIndicator).toBe(true);
  });
});
