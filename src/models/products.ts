import { z } from "zod";

export const ProductSchema = z.object({ name: z.string() });
export type Product = z.infer<typeof ProductSchema>;

export const ProductsSchema = z.array(ProductSchema);
export type Products = z.infer<typeof ProductsSchema>;
