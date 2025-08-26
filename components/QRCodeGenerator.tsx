'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

interface QRCodeGeneratorProps {
  url: string
  size?: number
  className?: string
  includeMargin?: boolean
  errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high'
}

export default function QRCodeGenerator({
  url,
  size = 200,
  className = '',
  includeMargin = true,
  errorCorrectionLevel = 'medium'
}: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current || !url) return

      setIsLoading(true)
      setError(null)

      try {
        const options = {
          errorCorrectionLevel: errorCorrectionLevel === 'low' ? 'L' : 
                               errorCorrectionLevel === 'medium' ? 'M' :
                               errorCorrectionLevel === 'quartile' ? 'Q' : 'H',
          type: 'image/png' as const,
          quality: 0.92,
          margin: includeMargin ? 2 : 0,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          width: size,
          scale: 4
        }

        await QRCode.toCanvas(canvasRef.current, url, options)
        setIsLoading(false)
      } catch (err) {
        console.error('Error generating QR code:', err)
        setError('Failed to generate QR code')
        setIsLoading(false)
      }
    }

    generateQR()
  }, [url, size, includeMargin, errorCorrectionLevel])

  const downloadQR = async () => {
    if (!canvasRef.current) return

    try {
      const canvas = canvasRef.current
      const link = document.createElement('a')
      link.download = 'resource-qr-code.png'
      link.href = canvas.toDataURL()
      link.click()
    } catch (err) {
      console.error('Error downloading QR code:', err)
    }
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <div className="text-center">
          <div className="text-red-400 mb-2">⚠️</div>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-xs text-gray-500">Generating...</p>
          </div>
        </div>
      )}
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          className={`rounded-lg border-2 border-gray-200 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        
        {!isLoading && (
          <div className="mt-3 flex justify-center">
            <button
              onClick={downloadQR}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-md transition-colors"
            >
              💾 Download
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Utility function to generate QR code as data URL
export async function generateQRDataURL(url: string, size: number = 200): Promise<string> {
  try {
    const options = {
      errorCorrectionLevel: 'M' as const,
      type: 'image/png' as const,
      quality: 0.92,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: size,
      scale: 4
    }

    return await QRCode.toDataURL(url, options)
  } catch (error) {
    console.error('Error generating QR data URL:', error)
    throw error
  }
}