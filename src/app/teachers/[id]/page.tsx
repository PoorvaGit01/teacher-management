"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Mail, Phone, Calendar, BookOpen, Award } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { teachers } from "@/constants/teachersData"

// Mock data - in real app, this would come from API
const getTeacher = (id: string) => {
   const teacherDetails = teachers.filter((teacher) => teacher.id === id);
   return teacherDetails[0];
}

export default function TeacherDetailPage() {
  const params = useParams()

  const teacher = getTeacher(params.id as string)

  console.log(teacher, 'teacher')
  if (!teacher) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Teacher Not Found</h2>
          <p className="text-muted-foreground mt-2">The requested teacher could not be found.</p>
          <Button asChild className="mt-4">
            <Link href="/teachers">Back to Teachers</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/teachers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teacher Profile</h1>
            <p className="text-muted-foreground">Detailed information about {teacher.name}</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/teachers/${teacher.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={teacher.avatar?.toString() || "/placeholder.svg"} alt={teacher.name} />
                <AvatarFallback className="text-lg">
                  {teacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{teacher.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{teacher.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{teacher.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{teacher.experience} experience</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Education</h4>
                {teacher.education.map((tech) => (
                    <p className="text-sm text-muted-foreground"key={tech.year}>
                        {`${tech.degree} from ${tech.institution} in ${tech.year}`}
                    </p>
                ))
                }
                <h4 className="font-medium mt-2">Achievements</h4>
                <ul className="space-y-2">
                {teacher.achivements?.map((achievement, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{achievement.title} -</span>
                    <span className="text-sm">{achievement.year}</span>
                  </li>
                ))}
              </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Courses</CardTitle>
              <CardDescription>Classes currently being taught</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacher.privateQualifications.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="w-full flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div className="w-full flex justify-between items-center">
                        <h4 className="font-medium">{course.name}</h4>
                        <p className="text-sm text-muted-foreground">{course.rate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
