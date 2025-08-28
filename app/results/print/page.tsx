import { Suspense } from 'react'
import PrintResultsPage from '@/components/PrintResultsPage'

export default function PrintResults() {
  return (
    <Suspense fallback={<div>Preparing print version...</div>}>
      <PrintResultsPage />
    </Suspense>
  )
}