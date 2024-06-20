import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getManageInventoryPageModel } from "./manage-inventory.service";
import { InventoryItem } from "../../../api/types";
import { useEffect, useState } from "react";

const getProductsResponseSchema = z.array(z.object({ name: z.string() }));
const getInventoryItemsResponseSchema = z.array(
  z.object({ name: z.string(), quantity: z.number() })
);
const errorSchema = z.object({ error: z.string() });

const createGetProductsAdapter = () => async () => {
  const response = await fetch(`${process.env.API_URL}/product/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = errorSchema.parse(await response.json()).error;
    throw new Error(message);
  }

  return getProductsResponseSchema.parse(await response.json());
};

const useProducts = () => {
  const getProducts = createGetProductsAdapter();
  return useQuery({ queryKey: ["products"], queryFn: getProducts });
};

const createGetInventoryItemsAdapter = () => async () => {
  const response = await fetch(`${process.env.API_URL}/inventory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = errorSchema.parse(await response.json()).error;
    throw new Error(message);
  }

  return getInventoryItemsResponseSchema.parse(await response.json());
};

const useInventoryItems = () => {
  const getInventoryItems = createGetInventoryItemsAdapter();
  return useQuery({ queryKey: ["inventory"], queryFn: getInventoryItems });
};

const createSaveInventoryAdapter =
  () => async (inventoryItems: Array<InventoryItem>) => {
    const response = await fetch(`${process.env.API_URL}/inventory`, {
      method: "POST",
      body: JSON.stringify(inventoryItems),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = errorSchema.parse(await response.json()).error;
      throw new Error(message);
    }

    return getInventoryItemsResponseSchema.parse(await response.json());
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
  const response = await fetch(`${process.env.API_URL}/inventory/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const message = errorSchema.parse(await response.json()).error;
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

  const [localInventoryItems, setLocalInventoryItems] = //
    useState<Array<InventoryItem>>([]);

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

  const model = getManageInventoryPageModel(
    products.data,
    localInventoryItems,
    saveInventory.error,
    saveInventory.isPending,
    resetIventory.isPending
  );

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
