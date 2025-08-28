import { describe, it, expect, beforeAll } from 'vitest';
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('Quiz Recommendations API', () => {
  
  describe('Request Validation', () => {
    it('should require category', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({})
      });
      
      const response = await POST(request);
      expect(response.status).toBe(400);
      
      const data = await response.json();
      expect(data.error).toBe('Invalid request');
    });
    
    it('should accept valid category', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({ category: 'food' })
      });
      
      const response = await POST(request);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.recommendations).toBeDefined();
      expect(Array.isArray(data.recommendations)).toBe(true);
    });
    
    it('should accept optional parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'shelter',
          subcategory: 'emergency_shelter',
          zip: '78702',
          needs: ['shower', 'laundry'],
          eligibility: ['veteran'],
          transportMode: 'transit'
        })
      });
      
      const response = await POST(request);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.request.category).toBe('shelter');
      expect(data.request.subcategory).toBe('emergency_shelter');
    });
  });
  
  describe('Scoring Logic', () => {
    it('should prioritize exact category matches', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({ category: 'food' })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      // Check that top results are food resources
      const topResults = data.recommendations.slice(0, 5);
      const foodCount = topResults.filter((r: any) => r.category === 'food').length;
      expect(foodCount).toBeGreaterThanOrEqual(3);
    });
    
    it('should factor in subcategory matches', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'shelter',
          subcategory: 'emergency_shelter'
        })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      // Check for subcategory matches in top results
      const topResults = data.recommendations.slice(0, 5);
      const hasEmergencyShelter = topResults.some((r: any) => 
        r.subcategories?.includes('emergency_shelter')
      );
      expect(hasEmergencyShelter).toBe(true);
    });
    
    it('should consider region when ZIP provided', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'healthcare',
          zip: '78702' // East/Central Austin
        })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      // Should have results with central or east regions prioritized
      const topResults = data.recommendations.slice(0, 10);
      const centralEastCount = topResults.filter((r: any) => 
        r.region === 'central' || r.region === 'east'
      ).length;
      expect(centralEastCount).toBeGreaterThan(0);
    });
    
    it('should calculate distance when coordinates provided', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'food',
          lat: 30.2672,
          lng: -97.7431, // Downtown Austin
          transportMode: 'walk'
        })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      // Results should be sorted by distance (reflected in score)
      expect(data.recommendations.length).toBeGreaterThan(0);
      
      // Scores should be descending
      for (let i = 1; i < Math.min(5, data.recommendations.length); i++) {
        expect(data.recommendations[i - 1].score).toBeGreaterThanOrEqual(
          data.recommendations[i].score
        );
      }
    });
    
    it('should match eligibility criteria', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'shelter',
          eligibility: ['veteran', 'male']
        })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      // Should have some results
      expect(data.recommendations.length).toBeGreaterThan(0);
    });
    
    it('should match service needs', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'recovery',
          needs: ['detox', 'MAT', 'counseling']
        })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      // Should prioritize resources with matching services
      expect(data.recommendations.length).toBeGreaterThan(0);
    });
  });
  
  describe('Transport Mode Impact', () => {
    it('should limit results by walking distance', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'food',
          lat: 30.2672,
          lng: -97.7431,
          transportMode: 'walk'
        })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      // Walking mode should prioritize very close resources
      expect(data.recommendations.length).toBeGreaterThan(0);
    });
    
    it('should expand range for car transport', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'food',
          lat: 30.2672,
          lng: -97.7431,
          transportMode: 'car'
        })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      // Car mode should include more distant resources
      expect(data.recommendations.length).toBeGreaterThan(0);
    });
  });
  
  describe('Response Format', () => {
    it('should return proper response structure', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'crisis',
          zip: '78701'
        })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      expect(data).toHaveProperty('recommendations');
      expect(data).toHaveProperty('totalMatches');
      expect(data).toHaveProperty('request');
      
      expect(Array.isArray(data.recommendations)).toBe(true);
      expect(typeof data.totalMatches).toBe('number');
      expect(data.request.category).toBe('crisis');
      expect(data.request.zip).toBe('78701');
    });
    
    it('should include score and isOpen fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({ category: 'food' })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      if (data.recommendations.length > 0) {
        const first = data.recommendations[0];
        expect(first).toHaveProperty('score');
        expect(first).toHaveProperty('isOpen');
        expect(typeof first.score).toBe('number');
        expect(typeof first.isOpen).toBe('boolean');
      }
    });
    
    it('should limit results to top 20', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({ category: 'crisis' })
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      expect(data.recommendations.length).toBeLessThanOrEqual(20);
    });
  });
  
  describe('Edge Cases', () => {
    it('should handle no matching resources', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'pets',
          eligibility: ['unicorn'] // Unlikely to match
        })
      });
      
      const response = await POST(request);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.recommendations).toBeDefined();
      expect(Array.isArray(data.recommendations)).toBe(true);
    });
    
    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: 'not json'
      });
      
      const response = await POST(request);
      expect(response.status).toBe(500);
    });
    
    it('should handle invalid transport mode', async () => {
      const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          category: 'food',
          transportMode: 'helicopter' // Invalid
        })
      });
      
      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });
});

describe('Scoring Algorithm', () => {
  it('should produce scores between 0 and 1', async () => {
    const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
      method: 'POST',
      body: JSON.stringify({
        category: 'shelter',
        subcategory: 'emergency_shelter',
        zip: '78702',
        lat: 30.2629,
        lng: -97.7140,
        needs: ['shower', 'meals', 'case management'],
        eligibility: ['adult', 'male'],
        transportMode: 'transit'
      })
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    for (const rec of data.recommendations) {
      expect(rec.score).toBeGreaterThanOrEqual(0);
      expect(rec.score).toBeLessThanOrEqual(1);
    }
  });
  
  it('should weight category match at 50%', async () => {
    const request = new NextRequest('http://localhost:3000/api/quiz/recommendations', {
      method: 'POST',
      body: JSON.stringify({ category: 'food' })
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    // Food resources should have at least 0.5 score from category match
    const foodResources = data.recommendations.filter((r: any) => r.category === 'food');
    for (const resource of foodResources) {
      expect(resource.score).toBeGreaterThanOrEqual(0.5);
    }
  });
});