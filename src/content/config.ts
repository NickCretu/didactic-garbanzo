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

// FAQ item schema
const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

// Blog post translation schema
const blogTranslationSchema = z.object({
  title: z.string(),
  slug: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  excerpt: z.string(),
  content: z.string(),
  h2s: z.array(z.string()).optional(),
  faq: z.array(faqItemSchema).optional(),
});

const blogCollection = defineCollection({
  type: 'data',
  schema: z.object({
    postId: z.string(), // Translation group ID (e.g., "P001")
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    image: z.string().optional(),
    hub: z.enum(['switching', 'strength', 'selection', 'safety']),
    targetKeyword: z.string(),
    disclaimerType: z.enum(['general', 'safety']).default('general'),
    relatedPosts: z.array(z.string()).optional(), // Array of postIds
    ctaTargets: z.array(z.string()).optional(), // Collection URLs
    translations: z.object({
      en: blogTranslationSchema,
      ru: blogTranslationSchema,
      ro: blogTranslationSchema,
    }),
  }),
});

// Hub page schema
const hubCollection = defineCollection({
  type: 'data',
  schema: z.object({
    hubId: z.string(),
    translations: z.object({
      en: z.object({
        title: z.string(),
        slug: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        intro: z.string(),
      }),
      ru: z.object({
        title: z.string(),
        slug: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        intro: z.string(),
      }),
      ro: z.object({
        title: z.string(),
        slug: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        intro: z.string(),
      }),
    }),
    featuredPosts: z.array(z.string()), // postIds
    featuredCollections: z.array(z.string()), // collection slugs
  }),
});

export const collections = {
  products: productsCollection,
  blog: blogCollection,
  hubs: hubCollection,
};
