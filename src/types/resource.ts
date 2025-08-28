import { z } from "zod";

export const ResourceCategory = z.enum([
  "crisis",
  "food",
  "shelter",
  "recovery",
  "healthcare",
  "legal",
  "employment",
  "transport",
  "clothing",
  "hygiene",
  "id_docs",
  "benefits",
  "family",
  "youth",
  "veterans",
  "lgbtq",
  "seniors",
  "pets"
]);

export const Region = z.enum(["north", "south", "east", "west", "central"]);

export const Resource = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  category: ResourceCategory,
  subcategories: z.array(z.string()).default([]),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().default("TX"),
  zip: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  hours: z.string().optional(),
  eligibility: z.array(z.string()).default([]),
  services: z.array(z.string()).default([]),
  county: z.string().optional(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  region: Region.optional(),
  lastVerified: z.string().optional()
});

export type TResource = z.infer<typeof Resource>;
export type TResourceCategory = z.infer<typeof ResourceCategory>;
export type TRegion = z.infer<typeof Region>;