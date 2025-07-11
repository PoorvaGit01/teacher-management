"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { useTeacher } from "@/hooks/useTeachers"
import { Teacher } from "@/constants/types"
import { toast } from "sonner"
import { TeacherError, TeacherLoading } from "@/components/common/LoadingError"
import { TeacherPageHeader } from "@/components/common/PageHeader"
import { TeacherProfileCard } from "@/components/cards/ProfileCard"
import { TeacherQualificationsCard } from "@/components/cards/QualificationCard"
import { TeacherQuickActions } from "@/components/cards/QuickActionCard"
import {TeacherProfileCard as TeachersProfessionalInfo} from "@/components/cards/ProfessionalInfoCard"


export default function TeacherDetailPage() {
  const params = useParams()
  const { teacher, loading, error, updateTeacher } = useTeacher(params.id as string)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSubmit = async (data: Partial<Teacher>) => {
    setIsUpdating(true)
    const success = await updateTeacher(data)
    
    if (success) {
      toast.success("Teacher information updated successfully.")
    } else {
      toast.error("Failed to update teacher information. Please try again.")
    }
    
    setIsUpdating(false)
    return success
  }

  const handleQuickAction = (action: string) => {
    toast.message(`${action} feature will be available soon.`)
  }

  if (loading) return <TeacherLoading />
  if (error || !teacher) return <TeacherError error={error || ''} />

  return (
    <div className="w-full flex-1 space-y-6 p-4 sm:p-6">
      <TeacherPageHeader 
        teacher={teacher} 
        isUpdating={isUpdating}
        onSubmit={handleSubmit}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TeacherProfileCard teacher={teacher} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <TeachersProfessionalInfo teacher={teacher} />
          
          <div className="grid gap-6 sm:grid-cols-2">
            <TeacherQualificationsCard teacher={teacher} />
            <TeacherQuickActions onAction={handleQuickAction} />
          </div>
        </div>
      </div>
    </div>
  )
}