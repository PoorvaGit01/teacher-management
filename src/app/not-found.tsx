"use client"

import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-900 mb-4">
          404
        </div>
        <p className="text-xl text-gray-600 mb-8">
          Page not found
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  )
}