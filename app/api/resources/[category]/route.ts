import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { TResource } from '@/types/resource';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params;
    const searchParams = request.nextUrl.searchParams;
    
    // Get filter parameters
    const subcategory = searchParams.get('subcategory');
    const region = searchParams.get('region');
    const openNow = searchParams.get('openNow') === 'true';
    
    // Load all resources
    const dataPath = path.join(process.cwd(), 'data/resources.normalized.json');
    const data = fs.readFileSync(dataPath, 'utf-8');
    const allResources: TResource[] = JSON.parse(data);
    
    // Filter by category
    let filtered = allResources.filter(r => r.category === category);
    
    // Apply additional filters
    if (subcategory) {
      filtered = filtered.filter(r => 
        r.subcategories?.includes(subcategory)
      );
    }
    
    if (region) {
      filtered = filtered.filter(r => r.region === region);
    }
    
    if (openNow) {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const currentHour = now.getHours();
      
      filtered = filtered.filter(r => {
        if (!r.hours) return true; // Assume open if no hours
        
        const hours = r.hours.toLowerCase();
        
        // Check for 24-hour service
        if (hours.includes('24 hour') || hours.includes('24/7')) {
          return true;
        }
        
        // Simple check for current day
        if (!hours.includes(currentDay.substring(0, 3)) && 
            !hours.includes('daily') && 
            !hours.includes('every day')) {
          return false;
        }
        
        // For more complex hour parsing, we'll assume open
        // In production, you'd want more robust parsing
        return true;
      });
    }
    
    // Sort by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    return NextResponse.json({
      category,
      totalCount: filtered.length,
      resources: filtered,
      filters: {
        subcategory,
        region,
        openNow
      }
    });
    
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

// Get available subcategories for a category
export async function OPTIONS(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params;
    
    // Load category configuration
    const categoriesPath = path.join(process.cwd(), 'data/categories.yaml');
    const yaml = await import('yaml');
    const categoriesYaml = fs.readFileSync(categoriesPath, 'utf-8');
    const categories = yaml.parse(categoriesYaml);
    
    if (!categories[category]) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      category,
      subcategories: categories[category].subcategories,
      keywords: categories[category].keywords
    });
    
  } catch (error) {
    console.error('Error fetching category info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category information' },
      { status: 500 }
    );
  }
}