"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, AlertCircle, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EditTeachersDetailsModal } from "@/components/forms/EditTeachersDetails"
import { Teacher } from "@/constants/types"
import Image from "next/image"
import { useTeacher } from "@/hooks/useTeachers"
import { toast } from "sonner"

export default function EditTeacherPage() {
  const params = useParams()
  const router = useRouter()
  const { teacher, loading, error, updateTeacher } = useTeacher(params.id as string)
  const [isUpdating, setIsUpdating] = useState(false)

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading teacher details...</p>
        </div>
      </div>
    )
  }

  if (error || !teacher) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle className="text-2xl">Teacher Not Found</CardTitle>
            <CardDescription>
              {error || "The teacher you're looking for doesn't exist or has been removed."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/teachers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Teachers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (data: Partial<Teacher>) => {
    setIsUpdating(true)
    const success = await updateTeacher(data)
    
    if (success) {
      toast.success("Teacher information updated successfully.")
      
      setTimeout(() => {
        router.push(`/teachers/${params.id}`)
      }, 1000)
    } else {
      toast.error("Failed to update teacher information. Please try again.")
    }
    
    setIsUpdating(false)
    return success
  }

  const handleCancel = () => {
    router.push(`/teachers/${params.id}`)
  }

  const handleQuickAction = (action: string) => {
    toast.message(`${action} feature will be available soon.`,)
  }

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getExperienceLevel = (years: number) => {
    if (years < 5) return { level: 'Junior', color: 'bg-blue-100 text-blue-800' }
    if (years < 10) return { level: 'Senior', color: 'bg-purple-100 text-purple-800' }
    return { level: 'Expert', color: 'bg-orange-100 text-orange-800' }
  }

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link href={`/teachers/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Edit Teacher</h1>
          <p className="text-muted-foreground">Update {teacher.name}'s information</p>
        </div>
        {isUpdating && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Updating...
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Information</CardTitle>
              <CardDescription>
                Update personal and professional details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditTeachersDetailsModal 
                teacher={teacher} 
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                triggerText="Edit All Details"
                triggerVariant="default"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="relative">
                  {teacher.avatar ? (
                    <Image 
                      src={teacher.avatar} 
                      alt={teacher.name}
                      className="h-12 w-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-lg font-semibold">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{teacher.name}</p>
                  <p className="text-sm text-muted-foreground">{teacher.role}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor(teacher.status)}>
                  {teacher.status}
                </Badge>
                <Badge className={getExperienceLevel(teacher.experience).color}>
                  {getExperienceLevel(teacher.experience).level}
                </Badge>
                <Badge variant="outline">
                  {teacher.experience} Years
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Contact</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{teacher.email}</p>
                  <p>{teacher.phone}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Expertise</p>
                <div className="flex flex-wrap gap-1">
                  {teacher.experties.map((exp, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Languages</p>
                <div className="flex flex-wrap gap-1">
                  {teacher.languagesSpoken.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction("View Profile")}
              >
                View Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction("Assign Courses")}
              >
                Assign Courses
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction("View Schedule")}
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>
          All changes are saved in real-time. Your updates will be reflected immediately across the application.
        </AlertDescription>
      </Alert>
    </div>
  )
}