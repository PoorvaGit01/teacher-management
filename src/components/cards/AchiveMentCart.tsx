'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReactNode } from "react"

type AchievementCardProps = {
  title: string
  description?: string
  date: string
  badgeLabel?: string
  icon?: ReactNode
}

export function AchievementCard({
  title,
  description,
  date,
  badgeLabel,
  icon
}: AchievementCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        {icon && (
          <div className="text-primary text-2xl">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-sm mt-1 text-muted-foreground">{description}</CardDescription>}
        </div>
        {badgeLabel && (
          <Badge className="ml-auto p-2">{badgeLabel}</Badge>
        )}
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground pt-2">
        Achieved on: <span className="font-medium text-foreground">{date}</span>
      </CardContent>
    </Card>
  )
}