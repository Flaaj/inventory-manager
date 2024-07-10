import { z } from "zod";

export const InventoryItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
});
export type InventoryItem = z.infer<typeof InventoryItemSchema>;

export const InventoryItemsSchema = z.array(InventoryItemSchema);
export type InventoryItems = z.infer<typeof InventoryItemsSchema>;
