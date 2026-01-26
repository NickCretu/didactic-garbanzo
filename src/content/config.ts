import { defineCollection, z } from 'astro:content';

const productsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    brand: z.string(),
    strength: z.number(),
    strengthCategory: z.enum(['low', 'medium', 'strong', 'extra']),
    flavorCategory: z.enum(['mint', 'citrus', 'berry', 'coffee', 'tropical']),
    pouchesPerCan: z.number().default(20),
    price: z.number(),
    currency: z.string().default('MDL'),
    image: z.string(),
    featured: z.boolean().default(false),
    translations: z.object({
      en: z.object({
        name: z.string(),
        description: z.string(),
      }),
      ru: z.object({
        name: z.string(),
        description: z.string(),
      }),
      ro: z.object({
        name: z.string(),
        description: z.string(),
      }),
    }),
  }),
});

const blogCollection = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    date: z.string(),
    image: z.string().optional(),
    translations: z.object({
      en: z.object({
        title: z.string(),
        excerpt: z.string(),
        content: z.string(),
      }),
      ru: z.object({
        title: z.string(),
        excerpt: z.string(),
        content: z.string(),
      }),
      ro: z.object({
        title: z.string(),
        excerpt: z.string(),
        content: z.string(),
      }),
    }),
  }),
});

export const collections = {
  products: productsCollection,
  blog: blogCollection,
};
