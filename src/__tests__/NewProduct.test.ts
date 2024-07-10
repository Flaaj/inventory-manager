import { describe, expect, it } from "vitest";
import {
  NewProductPageModelParams,
  getNewProductPageModel,
} from "../modules/products/add-product/add-product.service";

describe("New product page model", () => {
  const baseParams: NewProductPageModelParams = {
    response: undefined,
    error: null,
    isPending: false,
    isSuccess: false,
  };

  it("Shows the form to add a product if user didn't submit yet", () => {
    const params = { ...baseParams };

    const model = getNewProductPageModel(params);

    expect(model.error).toBe(null);
    expect(model.products).toBe(null);
    expect(model.shouldShowSuccessMessage).toBe(false);
    expect(model.shouldShowLoadingIndicator).toBe(false);
  });

  it("Shows error message on error", () => {
    const params = {
      ...baseParams,
      error: new Error("product name already exists"),
    };

    const model = getNewProductPageModel(params);

    expect(model.error).toEqual("product name already exists");
  });

  it("Shows success message and products list if user submits the form correctly", () => {
    const params = {
      ...baseParams,
      isSuccess: true,
      response: [
        { name: "Product 1" }, //
        { name: "Product you just added" },
      ],
    };

    const model = getNewProductPageModel(params);

    expect(model.products).toStrictEqual([
      { name: "Product 1" }, //
      { name: "Product you just added" },
    ]);
    expect(model.shouldShowSuccessMessage).toBe(true);
  });

  it("Shows loading indicator if request is processing", () => {
    const params = {
      ...baseParams,
      isPending: true,
    };

    const model = getNewProductPageModel(params);

    expect(model.shouldShowLoadingIndicator).toBe(true);
  });
});
