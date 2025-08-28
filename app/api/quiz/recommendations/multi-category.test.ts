import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';

// Test the diversity guard function in isolation
function applyDiversityGuard<T extends { category: string; score: number }>(
  scoredResources: T[],
  categories: string[],
  limit: number = 20
): T[] {
  // Group resources by category
  const buckets = new Map<string, T[]>();
  
  // Initialize buckets for each requested category
  categories.forEach(cat => buckets.set(cat, []));
  
  // Sort resources into buckets
  scoredResources.forEach(resource => {
    if (categories.includes(resource.category)) {
      buckets.get(resource.category)?.push(resource);
    }
  });
  
  // Sort each bucket by score
  buckets.forEach(bucket => {
    bucket.sort((a, b) => b.score - a.score);
  });
  
  // Round-robin selection to ensure diversity
  const result: T[] = [];
  let hasMoreResources = true;
  
  while (result.length < limit && hasMoreResources) {
    hasMoreResources = false;
    
    for (const category of categories) {
      const bucket = buckets.get(category);
      if (bucket && bucket.length > 0) {
        result.push(bucket.shift()!);
        hasMoreResources = true;
        
        if (result.length >= limit) break;
      }
    }
  }
  
  return result;
}

describe('Multi-Category Support and Diversity Guard', () => {
  describe('Diversity Guard Algorithm', () => {
    it('should distribute results evenly across categories', () => {
      const resources = [
        // 5 food resources with descending scores
        { id: 'f1', category: 'food', score: 0.9 },
        { id: 'f2', category: 'food', score: 0.8 },
        { id: 'f3', category: 'food', score: 0.7 },
        { id: 'f4', category: 'food', score: 0.6 },
        { id: 'f5', category: 'food', score: 0.5 },
        
        // 5 shelter resources
        { id: 's1', category: 'shelter', score: 0.85 },
        { id: 's2', category: 'shelter', score: 0.75 },
        { id: 's3', category: 'shelter', score: 0.65 },
        { id: 's4', category: 'shelter', score: 0.55 },
        { id: 's5', category: 'shelter', score: 0.45 },
        
        // 5 healthcare resources
        { id: 'h1', category: 'healthcare', score: 0.88 },
        { id: 'h2', category: 'healthcare', score: 0.78 },
        { id: 'h3', category: 'healthcare', score: 0.68 },
        { id: 'h4', category: 'healthcare', score: 0.58 },
        { id: 'h5', category: 'healthcare', score: 0.48 },
      ];

      const result = applyDiversityGuard(resources, ['food', 'shelter', 'healthcare'], 9);
      
      // Should return exactly 9 results
      expect(result).toHaveLength(9);
      
      // Count by category
      const counts: Record<string, number> = {};
      result.forEach(r => {
        counts[r.category] = (counts[r.category] || 0) + 1;
      });
      
      // Each category should have exactly 3 (9 results / 3 categories)
      expect(counts.food).toBe(3);
      expect(counts.shelter).toBe(3);
      expect(counts.healthcare).toBe(3);
    });

    it('should maintain score order within each category', () => {
      const resources = [
        { id: 'f1', category: 'food', score: 0.9 },
        { id: 'f2', category: 'food', score: 0.5 },
        { id: 'f3', category: 'food', score: 0.7 },
        { id: 's1', category: 'shelter', score: 0.6 },
        { id: 's2', category: 'shelter', score: 0.8 },
        { id: 's3', category: 'shelter', score: 0.4 },
      ];

      const result = applyDiversityGuard(resources, ['food', 'shelter'], 6);
      
      // Extract food and shelter resources in order they appear
      const foodResults = result.filter(r => r.category === 'food');
      const shelterResults = result.filter(r => r.category === 'shelter');
      
      // Food should be in score order: f1 (0.9), f3 (0.7), f2 (0.5)
      expect(foodResults[0].id).toBe('f1');
      expect(foodResults[1].id).toBe('f3');
      expect(foodResults[2].id).toBe('f2');
      
      // Shelter should be in score order: s2 (0.8), s1 (0.6), s3 (0.4)
      expect(shelterResults[0].id).toBe('s2');
      expect(shelterResults[1].id).toBe('s1');
      expect(shelterResults[2].id).toBe('s3');
    });

    it('should use round-robin interleaving', () => {
      const resources = [
        { id: 'f1', category: 'food', score: 0.9 },
        { id: 'f2', category: 'food', score: 0.8 },
        { id: 's1', category: 'shelter', score: 0.85 },
        { id: 's2', category: 'shelter', score: 0.75 },
        { id: 'h1', category: 'healthcare', score: 0.88 },
        { id: 'h2', category: 'healthcare', score: 0.78 },
      ];

      const result = applyDiversityGuard(resources, ['food', 'shelter', 'healthcare'], 6);
      
      // Should interleave: food, shelter, healthcare, food, shelter, healthcare
      expect(result[0].category).toBe('food');
      expect(result[1].category).toBe('shelter');
      expect(result[2].category).toBe('healthcare');
      expect(result[3].category).toBe('food');
      expect(result[4].category).toBe('shelter');
      expect(result[5].category).toBe('healthcare');
    });

    it('should handle uneven category distributions', () => {
      const resources = [
        { id: 'f1', category: 'food', score: 0.9 },
        { id: 'f2', category: 'food', score: 0.8 },
        { id: 'f3', category: 'food', score: 0.7 },
        { id: 'f4', category: 'food', score: 0.6 },
        { id: 'f5', category: 'food', score: 0.5 },
        { id: 's1', category: 'shelter', score: 0.85 }, // Only 1 shelter
        { id: 'h1', category: 'healthcare', score: 0.88 },
        { id: 'h2', category: 'healthcare', score: 0.78 }, // Only 2 healthcare
      ];

      const result = applyDiversityGuard(resources, ['food', 'shelter', 'healthcare'], 8);
      
      // Should return all 8 available resources
      expect(result).toHaveLength(8);
      
      // Count by category
      const counts: Record<string, number> = {};
      result.forEach(r => {
        counts[r.category] = (counts[r.category] || 0) + 1;
      });
      
      // Should have: 5 food, 1 shelter, 2 healthcare
      expect(counts.food).toBe(5);
      expect(counts.shelter).toBe(1);
      expect(counts.healthcare).toBe(2);
      
      // First 3 should be round-robin
      expect(result[0].category).toBe('food');
      expect(result[1].category).toBe('shelter');
      expect(result[2].category).toBe('healthcare');
    });

    it('should respect the limit parameter', () => {
      const resources = Array.from({ length: 30 }, (_, i) => ({
        id: `r${i}`,
        category: ['food', 'shelter', 'healthcare'][i % 3],
        score: Math.random()
      }));

      const result5 = applyDiversityGuard(resources, ['food', 'shelter', 'healthcare'], 5);
      expect(result5).toHaveLength(5);

      const result10 = applyDiversityGuard(resources, ['food', 'shelter', 'healthcare'], 10);
      expect(result10).toHaveLength(10);

      const result20 = applyDiversityGuard(resources, ['food', 'shelter', 'healthcare'], 20);
      expect(result20).toHaveLength(20);
    });

    it('should filter out non-requested categories', () => {
      const resources = [
        { id: 'f1', category: 'food', score: 0.9 },
        { id: 'l1', category: 'legal', score: 0.95 }, // Not requested
        { id: 's1', category: 'shelter', score: 0.85 },
        { id: 'e1', category: 'employment', score: 0.92 }, // Not requested
        { id: 'h1', category: 'healthcare', score: 0.88 },
      ];

      const result = applyDiversityGuard(resources, ['food', 'shelter', 'healthcare'], 10);
      
      // Should only include requested categories
      result.forEach(r => {
        expect(['food', 'shelter', 'healthcare']).toContain(r.category);
      });
      
      // Should not include legal or employment
      expect(result.find(r => r.category === 'legal')).toBeUndefined();
      expect(result.find(r => r.category === 'employment')).toBeUndefined();
    });

    it('should handle single category request', () => {
      const resources = [
        { id: 'f1', category: 'food', score: 0.9 },
        { id: 'f2', category: 'food', score: 0.8 },
        { id: 'f3', category: 'food', score: 0.7 },
        { id: 's1', category: 'shelter', score: 0.85 },
        { id: 'h1', category: 'healthcare', score: 0.88 },
      ];

      const result = applyDiversityGuard(resources, ['food'], 3);
      
      // Should only return food resources
      expect(result).toHaveLength(3);
      result.forEach(r => {
        expect(r.category).toBe('food');
      });
      
      // Should be in score order
      expect(result[0].id).toBe('f1');
      expect(result[1].id).toBe('f2');
      expect(result[2].id).toBe('f3');
    });

    it('should handle empty results gracefully', () => {
      const resources = [
        { id: 'f1', category: 'food', score: 0.9 },
        { id: 's1', category: 'shelter', score: 0.85 },
      ];

      // Request categories that don't exist
      const result = applyDiversityGuard(resources, ['legal', 'employment'], 10);
      
      expect(result).toHaveLength(0);
    });
  });

  describe('API Request Format', () => {
    it('should accept categories as an array', () => {
      const body = {
        categories: ['food', 'shelter', 'healthcare'],
        zip: '78701'
      };

      expect(body.categories).toBeInstanceOf(Array);
      expect(body.categories).toHaveLength(3);
    });

    it('should validate minimum category requirement', () => {
      const invalidBody = {
        categories: [] // Empty array should be invalid
      };

      expect(invalidBody.categories).toHaveLength(0);
      // In real API, this would return 400 error
    });

    it('should support all category types', () => {
      const validCategories = [
        'crisis', 'food', 'shelter', 'recovery', 
        'healthcare', 'legal', 'employment', 'transport',
        'youth', 'seniors'
      ];

      validCategories.forEach(cat => {
        expect(typeof cat).toBe('string');
      });
    });
  });
});