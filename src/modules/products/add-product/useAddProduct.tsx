import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getNewProductPageModel } from "./add-product.service";

const responseSchema = z.array(z.object({ name: z.string() }));
const errorSchema = z.object({ error: z.string() });

const createAddProductAdapter = () => async (productName: string) => {
  const response = await fetch(`${process.env.API_URL}/product`, {
    method: "PUT",
    body: JSON.stringify({ name: productName }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = errorSchema.parse(await response.json()).error;
    throw new Error(message);
  }

  return responseSchema.parse(await response.json());
};

const useAddProduct = () => {
  const client = useQueryClient();
  const addProduct = createAddProductAdapter();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: (products) => client.setQueryData(["products"], products),
  });
};

export const useNewProductPage = () => {
  const addProduct = useAddProduct();

  const model = getNewProductPageModel(
    addProduct.data,
    addProduct.error,
    addProduct.isPending
  );

  return {
    actions: {
      addProduct: addProduct.mutate,
    },
    model,
  };
};
