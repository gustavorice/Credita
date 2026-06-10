import type { MetadataRoute } from "next";
import { SITE, CATEGORIES } from "@/lib/constants";
import { getOpportunities, getPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ops, posts] = await Promise.all([getOpportunities(), getPosts()]);

  return [
    { url: SITE.url, changeFrequency: "daily", priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE.url}/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...ops.map((o) => ({
      url: `${SITE.url}/${o.category}/${o.slug}`,
      lastModified: new Date(o.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
