'use client'

import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Eye, 
  EyeOff,
  Download,
  RefreshCw
} from 'lucide-react'

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

interface AdminAuth {
  isAuthenticated: boolean
  password: string
}

const ADMIN_PASSWORD = 'helpnow2025!' // In production, this would be environment variable

export default function AdminReportsPage() {
  const [auth, setAuth] = useState<AdminAuth>({ isAuthenticated: false, password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [stats, setStats] = useState<SubmissionStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock data for demonstration - in production this would come from API
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
      'Other': 2
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
        submittedAt: '2025-08-28T10:30:00Z',
        status: 'pending_review',
        contactEmail: 'contact@example.org'
      },
      {
        id: 'sub_002', 
        resourceName: 'New Hope Food Pantry',
        category: 'Food Assistance',
        submittedAt: '2025-08-28T09:15:00Z',
        status: 'verified',
        contactEmail: 'info@newhope.org'
      },
      {
        id: 'sub_003',
        resourceName: 'Recovery Gateway Center',
        category: 'Addiction Recovery',
        submittedAt: '2025-08-27T16:45:00Z',
        status: 'pending_review',
        contactEmail: 'admin@recoverygateway.com'
      }
    ]
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (auth.password === ADMIN_PASSWORD) {
      setAuth({ ...auth, isAuthenticated: true })
      loadStats()
      setError('')
    } else {
      setError('Invalid password')
      setAuth({ ...auth, password: '' })
    }
  }

  const loadStats = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        }
      })
      
      if (response.ok) {
        const result = await response.json()
        setStats(result.data)
      } else {
        console.error('API error:', response.statusText)
        setStats(mockStats) // Fallback to mock data
      }
    } catch (error) {
      console.error('Failed to load stats:', error)
      setStats(mockStats) // Fallback to mock data
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-aurora-emerald500 bg-aurora-emerald500/10'
      case 'pending_review': return 'text-aurora-azure400 bg-aurora-azure400/10'
      case 'needs_info': return 'text-warning-amber-500 bg-warning-amber-500/10'
      case 'rejected': return 'text-aurora-crimson600 bg-aurora-crimson600/10'
      default: return 'text-warm-slate-500 bg-warm-slate-500/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />
      case 'pending_review': return <Clock className="w-4 h-4" />
      case 'needs_info': return <AlertCircle className="w-4 h-4" />
      case 'rejected': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  // Login form
  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-canvas-tint to-white flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <div className="card">
            <div className="text-center mb-6">
              <BarChart3 className="w-12 h-12 text-aurora-indigo500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-aurora-indigo700 mb-2">
                Admin Reports
              </h1>
              <p className="text-warm-slate-600">
                Enter password to access submission analytics
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-warm-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={auth.password}
                    onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                    className="w-full px-4 py-3 border border-warm-slate-300 rounded-lg focus:ring-2 focus:ring-aurora-azure400 focus:border-transparent pr-12"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-slate-400 hover:text-warm-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 bg-aurora-crimson600/10 border border-aurora-crimson600/20 rounded-lg p-3">
                  <p className="text-aurora-crimson600 text-sm font-medium">{error}</p>
                </div>
              )}

              <button type="submit" className="btn-primary w-full">
                Access Reports
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-warm-slate-500">
                This page is not linked from navigation and requires authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-canvas-tint to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-aurora-indigo700 mb-2">
              Submission Analytics
            </h1>
            <p className="text-warm-slate-600">
              Resource submission insights and trends
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadStats}
              disabled={isLoading}
              className="btn-ghost"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="btn-primary">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-aurora-indigo500 animate-spin mx-auto mb-4" />
            <p className="text-warm-slate-600">Loading analytics...</p>
          </div>
        ) : stats ? (
          <>
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-warm-slate-600 mb-1">Total Submissions</p>
                    <p className="text-2xl font-bold text-aurora-indigo700">{stats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-aurora-indigo500" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-warm-slate-600 mb-1">This Week</p>
                    <p className="text-2xl font-bold text-aurora-emerald500">{stats.thisWeek}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-aurora-emerald500" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-warm-slate-600 mb-1">This Month</p>
                    <p className="text-2xl font-bold text-aurora-azure400">{stats.thisMonth}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-aurora-azure400" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-warm-slate-600 mb-1">Verification Rate</p>
                    <p className="text-2xl font-bold text-aurora-fuchsia500">
                      {Math.round((stats.byStatus.verified / stats.total) * 100)}%
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-aurora-fuchsia500" />
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Category Distribution */}
              <div className="card">
                <h3 className="text-lg font-semibold text-aurora-indigo700 mb-4">
                  Submissions by Category
                </h3>
                <div className="space-y-3">
                  {Object.entries(stats.byCategory)
                    .sort(([,a], [,b]) => b - a)
                    .map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-warm-slate-700">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-warm-slate-200 rounded-full h-2">
                            <div 
                              className="bg-aurora-emerald500 rounded-full h-2"
                              style={{ width: `${(count / Math.max(...Object.values(stats.byCategory))) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-aurora-indigo700 min-w-[20px]">
                            {count}
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Status Distribution */}
              <div className="card">
                <h3 className="text-lg font-semibold text-aurora-indigo700 mb-4">
                  Status Distribution
                </h3>
                <div className="space-y-4">
                  {Object.entries(stats.byStatus).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`p-2 rounded-full ${getStatusColor(status)}`}>
                          {getStatusIcon(status)}
                        </span>
                        <span className="text-sm text-warm-slate-700 capitalize">
                          {status.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-lg font-semibold text-aurora-indigo700">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-aurora-indigo700 mb-6">
                Recent Submissions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-warm-slate-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-warm-slate-600">Resource</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-warm-slate-600">Category</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-warm-slate-600">Status</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-warm-slate-600">Submitted</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-warm-slate-600">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentSubmissions.map((submission) => (
                      <tr key={submission.id} className="border-b border-warm-slate-100 hover:bg-warm-slate-50">
                        <td className="py-3 px-2">
                          <p className="font-medium text-aurora-indigo700">{submission.resourceName}</p>
                        </td>
                        <td className="py-3 px-2">
                          <span className="chip text-xs">
                            {submission.category}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                            {getStatusIcon(submission.status)}
                            {submission.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-warm-slate-600">
                          {formatDate(submission.submittedAt)}
                        </td>
                        <td className="py-3 px-2 text-sm text-warm-slate-600">
                          {submission.contactEmail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-warm-slate-400 mx-auto mb-4" />
            <p className="text-warm-slate-600">Failed to load analytics data</p>
            <button onClick={loadStats} className="btn-primary mt-4">
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}