export const normalizeSlug = (value: string) => value.trim().toLowerCase();

export const isSlugMatch = (slug: string, candidate: string) =>
  normalizeSlug(slug) === normalizeSlug(candidate);
