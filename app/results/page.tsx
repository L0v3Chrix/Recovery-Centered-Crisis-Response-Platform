import { Suspense } from 'react'
import ResultsPage from '@/components/ResultsPage'

export default function Results() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <ResultsPage />
    </Suspense>
  )
}