import { BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Teacher } from "@/constants/types"

interface TeacherQualificationsCardProps {
  teacher: Teacher
}

export const TeacherQualificationsCard = ({ teacher }: TeacherQualificationsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Private Qualifications</CardTitle>
        <CardDescription>Tutoring services offered</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {teacher.privateQualifications.length > 0 ? (
            teacher.privateQualifications.map((qual, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">{qual.name}</span>
                </div>
                <Badge variant="outline">{qual.rate}</Badge>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-muted-foreground text-sm">
              No private qualifications listed
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}