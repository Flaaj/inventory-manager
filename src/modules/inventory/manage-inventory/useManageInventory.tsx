import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getManageInventoryPageModel } from "./manage-inventory.service";
import { useEffect, useState } from "react";
import type {
  InventoryItem,
  InventoryItems,
} from "../../../models/inventory-items";
import { InventoryItemsSchema } from "../../../models/inventory-items";
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

const createGetInventoryItemsAdapter = () => async () => {
  const response = await fetch(`/inventory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = ApiErrorSchema.parse(await response.json()).error;
    throw new Error(message);
  }

  return InventoryItemsSchema.parse(await response.json());
};

const useInventoryItems = () => {
  const getInventoryItems = createGetInventoryItemsAdapter();
  return useQuery({ queryKey: ["inventory"], queryFn: getInventoryItems });
};

const createSaveInventoryAdapter =
  () => async (inventoryItems: InventoryItems) => {
    const response = await fetch(`/inventory`, {
      method: "POST",
      body: JSON.stringify(inventoryItems),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = ApiErrorSchema.parse(await response.json()).error;
      throw new Error(message);
    }

    return InventoryItemsSchema.parse(await response.json());
  };

const useSaveInventory = () => {
  const client = useQueryClient();
  const saveInventory = createSaveInventoryAdapter();
  return useMutation({
    mutationFn: saveInventory,
    onSuccess: (inventory) => client.setQueryData(["inventory"], inventory),
  });
};

const createResetInventoryAdapter = () => async () => {
  const response = await fetch(`/inventory/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = ApiErrorSchema.parse(await response.json()).error;
    throw new Error(message);
  }
};

const useResetInventory = () => {
  const client = useQueryClient();
  const resetInventory = createResetInventoryAdapter();
  return useMutation({
    mutationFn: resetInventory,
    onSuccess: () => client.setQueryData(["inventory"], []),
  });
};

export const useManageInventoryPage = () => {
  const products = useProducts();
  const inventoryItems = useInventoryItems();
  const saveInventory = useSaveInventory();
  const resetIventory = useResetInventory();

  const [localInventoryItems, setLocalInventoryItems] =
    useState<InventoryItems>([]);

  useEffect(() => {
    if (inventoryItems.data) {
      setLocalInventoryItems(inventoryItems.data || []);
    }
  }, [inventoryItems.data]);

  const handleAddInventoryItem = (inventoryItem: InventoryItem) => {
    setLocalInventoryItems((prev) => [...prev, inventoryItem]);
  };

  const handleDeleteInventoryItem = (inventoryItem: InventoryItem) => {
    setLocalInventoryItems((prev) =>
      prev.filter((item) => item.name !== inventoryItem.name)
    );
  };

  const model = getManageInventoryPageModel({
    products: products.data,
    inventoryItems: localInventoryItems,
    saveInventoryError: saveInventory.error,
    isSaveInventoryPending: saveInventory.isPending,
    isResetInventoryPending: resetIventory.isPending,
  });

  return {
    actions: {
      saveInventory: saveInventory.mutate,
      resetInventory: resetIventory.mutate,
      addInventoryItem: handleAddInventoryItem,
      deleteInventoryItem: handleDeleteInventoryItem,
    },
    model,
  };
};
