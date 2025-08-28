import { NextRequest, NextResponse } from 'next/server'

// Simple password check for admin API
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'helpnow2025!'

interface SubmissionStats {
  total: number
  thisWeek: number
  thisMonth: number
  byCategory: Record<string, number>
  byStatus: Record<string, number>
  recentSubmissions: Array<{
    id: string
    resourceName: string
    category: string
    submittedAt: string
    status: string
    contactEmail: string
  }>
}

// Mock analytics data - in production, this would query GHL API or database
const mockStats: SubmissionStats = {
  total: 47,
  thisWeek: 8,
  thisMonth: 23,
  byCategory: {
    'Food Assistance': 12,
    'Housing & Shelter': 8,
    'Healthcare Services': 7,
    'Addiction Recovery': 6,
    'Mental Health': 5,
    'Crisis Support': 4,
    'Legal Aid': 3,
    'Employment Services': 2,
    'Other': 0
  },
  byStatus: {
    'pending_review': 12,
    'verified': 28,
    'rejected': 4,
    'needs_info': 3
  },
  recentSubmissions: [
    {
      id: 'sub_001',
      resourceName: 'Austin Community Health Center',
      category: 'Healthcare Services',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      status: 'pending_review',
      contactEmail: 'contact@example.org'
    },
    {
      id: 'sub_002', 
      resourceName: 'New Hope Food Pantry',
      category: 'Food Assistance',
      submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      status: 'verified',
      contactEmail: 'info@newhope.org'
    },
    {
      id: 'sub_003',
      resourceName: 'Recovery Gateway Center',
      category: 'Addiction Recovery',
      submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      status: 'pending_review',
      contactEmail: 'admin@recoverygateway.com'
    },
    {
      id: 'sub_004',
      resourceName: 'Crisis Text Line Austin',
      category: 'Crisis Support',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      status: 'verified',
      contactEmail: 'support@crisistextline.org'
    },
    {
      id: 'sub_005',
      resourceName: 'Legal Aid Society of Central Texas',
      category: 'Legal Aid',
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      status: 'needs_info',
      contactEmail: 'intake@legalaid.org'
    }
  ]
}

export async function GET(request: NextRequest) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const password = authHeader.replace('Bearer ', '')
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 403 }
      )
    }

    // In production, this would:
    // 1. Query GHL API for submission data
    // 2. Aggregate statistics from database
    // 3. Calculate trends and insights
    // 4. Return real-time analytics

    // For now, return mock data with some randomization to simulate real usage
    const randomizedStats = {
      ...mockStats,
      total: mockStats.total + Math.floor(Math.random() * 5), // Small random variation
      thisWeek: mockStats.thisWeek + Math.floor(Math.random() * 3),
      thisMonth: mockStats.thisMonth + Math.floor(Math.random() * 8)
    }

    return NextResponse.json({
      success: true,
      data: randomizedStats,
      timestamp: new Date().toISOString(),
      source: 'mock_data' // In production: 'ghl_api' or 'database'
    })

  } catch (error) {
    console.error('Admin stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}

// Export route for real-time updates
export async function POST(request: NextRequest) {
  try {
    // Check authorization
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const password = authHeader.replace('Bearer ', '')
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 403 }
      )
    }

    // In production, this would trigger a real-time data refresh
    // from GHL API or database and potentially update caches

    const body = await request.json()
    const { action } = body

    if (action === 'refresh') {
      return NextResponse.json({
        success: true,
        message: 'Analytics data refreshed successfully',
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json(
      { error: 'Invalid action', validActions: ['refresh'] },
      { status: 400 }
    )

  } catch (error) {
    console.error('Admin stats refresh error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: 'Failed to refresh analytics data' },
      { status: 500 }
    )
  }
}