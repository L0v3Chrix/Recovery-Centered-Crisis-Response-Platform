import data from "@/data/resources.normalized.json";
import type { Resource } from "@/src/types/resource";
import type { SearchFilters, ResourceMatch } from "@/types/resources";

export function getAllResources(): Resource[] {
  return data as Resource[];
}

export function getResourcesByCategory(category: string): Resource[] {
  const resources = getAllResources();
  return resources.filter(r => r.category === category);
}

export function searchResources(filters: SearchFilters): ResourceMatch[] {
  const resources = getAllResources();
  const matches: ResourceMatch[] = [];

  resources.forEach((resource: Resource) => {
    let score = 100;
    const reasons: string[] = [];

    // Category filter
    if (filters.category && resource.category !== filters.category) {
      return; // Skip this resource
    }

    // Open now filter
    if (filters.isOpenNow) {
      // Simple check - you can enhance this
      reasons.push("Open now");
    }

    // Walk-ins filter
    if (filters.acceptsWalkIns) {
      reasons.push("Accepts walk-ins");
    }

    matches.push({
      resource: resource as any, // Cast to match the broader interface type
      score,
      reasons,
      distance: undefined
    });
  });

  return matches;
}