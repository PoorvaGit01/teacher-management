import { Mail, Phone, Calendar, Users, MapPin, Languages } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Teacher } from "@/constants/types"
import { InfoItem, SectionHeader } from "./TeacherInfoItem"
import { format } from 'date-fns';

interface TeacherProfileCardProps {
  teacher: Teacher
}

export const TeacherProfileCard = ({ teacher }: TeacherProfileCardProps) => {
  const getStatusColor = (status: string) => 
    status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'

  const getExperienceLevel = (years: number) => {
    if (years < 5) return { level: 'Junior', color: 'bg-blue-100 text-blue-800' }
    if (years < 10) return { level: 'Senior', color: 'bg-purple-100 text-purple-800' }
    return { level: 'Expert', color: 'bg-orange-100 text-orange-800' }
  }

  const experienceLevel = getExperienceLevel(teacher.experience)

  return (
    <Card>
      <CardHeader className="text-center pb-4">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={teacher.avatar?.toString() || "/placeholder.svg"} alt={teacher.name} />
          <AvatarFallback className="text-lg">
            {teacher.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{teacher.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{teacher.role}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge className={getStatusColor(teacher.status)}>{teacher.status}</Badge>
          <Badge className={experienceLevel.color}>{experienceLevel.level}</Badge>
          <Badge variant="outline">{teacher.experience} Years</Badge>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <InfoItem icon={Mail}>{teacher.email}</InfoItem>
          <InfoItem icon={Phone}>{teacher.phone}</InfoItem>
          <InfoItem icon={Calendar}>Born: {format(new Date(teacher.dob), 'dd/MM/yyyy')}</InfoItem>
          <InfoItem icon={Users}>{teacher.gender}</InfoItem>
        </div>

        <Separator />

        <div className="space-y-2">
          <SectionHeader icon={MapPin} title="Addresses" />
          <div className="space-y-1">
            {teacher.address.map((addr, index) => (
              <p key={index} className="text-xs text-muted-foreground pl-6">
                <span className="font-medium capitalize">{addr.type}:</span> {addr.detail}
              </p>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <SectionHeader icon={Languages} title="Languages" />
          <div className="flex flex-wrap gap-1">
            {teacher.languagesSpoken.map((lang, index) => (
              <Badge key={index} variant="outline" className="text-xs">{lang}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}