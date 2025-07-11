import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EditTeachersDetailsModal } from "@/components/forms/EditTeachersDetails"
import { Teacher } from "@/constants/types"

interface TeacherPageHeaderProps {
  teacher: Teacher
  isUpdating: boolean
  onSubmit: (data: Partial<Teacher>) => Promise<boolean>
}

export const TeacherPageHeader = ({ teacher, isUpdating, onSubmit }: TeacherPageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start space-x-4">
        <Button variant="ghost" size="icon" asChild className="bg-muted">
          <Link href="/teachers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Teacher Profile</h1>
          <p className="text-sm text-muted-foreground">Detailed information about {teacher.name}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isUpdating && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Updating...
          </div>
        )}
        <EditTeachersDetailsModal 
          teacher={teacher} 
          onSubmit={onSubmit}
          triggerText="Edit Profile"
          triggerVariant="default"
        />
      </div>
    </div>
  )
}