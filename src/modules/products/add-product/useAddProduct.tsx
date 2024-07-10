import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNewProductPageModel } from "./add-product.service";
import { ProductsSchema } from "../../../models/products";
import { ApiErrorSchema } from "../../../models/api-error";

const createGetProductsAdapter = () => async () => {
  const response = await fetch(`/product/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = ApiErrorSchema.parse(await response.json()).error;
    throw new Error(message);
  }

  return ProductsSchema.parse(await response.json());
};

const useProducts = () => {
  const getProducts = createGetProductsAdapter();
  return useQuery({ queryKey: ["products"], queryFn: getProducts });
};

const createAddProductAdapter = () => async (productName: string) => {
  const response = await fetch(`/product`, {
    method: "PUT",
    body: JSON.stringify({ name: productName }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = ApiErrorSchema.parse(await response.json()).error;
    throw new Error(message);
  }

  return ProductsSchema.parse(await response.json());
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
  const products = useProducts();
  const addProduct = useAddProduct();

  const model = getNewProductPageModel({
    response: products.data,
    error: addProduct.error,
    isPending: addProduct.isPending,
    isSuccess: addProduct.isSuccess,
  });

  return {
    actions: {
      addProduct: addProduct.mutate,
    },
    model,
  };
};
