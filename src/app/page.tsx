"use client"

import Link from 'next/link'
import { Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Clock className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Coming Soon
        </h1>
        <p className="text-xl mb-8">
          We're working hard to bring you something amazing
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <Users className="w-4 h-4 mr-2" />
            Go to Teachers
          </Link>
        </Button>
      </div>
    </div>
  )
}