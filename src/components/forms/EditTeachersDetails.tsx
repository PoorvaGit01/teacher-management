import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Save, Loader2, Edit, X, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Teacher } from "@/constants/types"

const addressSchema = z.object({
  type: z.string().min(1, "Address type is required"),
  detail: z.string().min(1, "Address detail is required"),
})

const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  year: z.string().min(1, "Year is required"),
  grade: z.string().optional(),
})

const privateQualificationSchema = z.object({
  name: z.string().min(1, "Qualification name is required"),
  rate: z.string().min(1, "Rate is required"),
})

const achievementSchema = z.object({
  title: z.string().min(1, "Achievement title is required"),
  year: z.string().min(1, "Year is required"),
})

const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  role: z.string().min(1, "Role is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  experience: z.number().min(0, "Experience cannot be negative"),
  experties: z.array(z.string()).min(1, "At least one expertise is required"),
  address: z.array(addressSchema).min(1, "At least one address is required"),
  privateQualifications: z.array(privateQualificationSchema),
  achivements: z.array(achievementSchema).optional(),
  status: z.enum(["Active", "Inactive"]),
  languagesSpoken: z.array(z.string()).min(1, "At least one language is required"),
  qualifications: z.array(z.string()).min(1, "At least one qualification is required"),
  education: z.array(educationSchema).min(1, "At least one education entry is required"),
})

type TeacherFormData = z.infer<typeof teacherSchema>

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science", "History", "Geography"]
const languages = ["English", "Hindi", "Marathi", "Bengali", "Tamil", "Telugu", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Urdu"]
const roles = ["Subject Teacher", "Senior Teacher", "Assistant Teacher", "Head Teacher", "Principal"]

interface EditTeacherFormProps {
  teacher?: Teacher
  onSubmit: (data: Partial<Teacher>) => Promise<boolean>
  onCancel?: () => void
  triggerText?: string
  triggerVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export const EditTeachersDetailsModal = ({ 
  teacher, 
  onSubmit, 
  onCancel,
  triggerText = "Edit Details",
  triggerVariant = "outline"
}: EditTeacherFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [expertiseInput, setExpertiseInput] = useState("")
  const [languageInput, setLanguageInput] = useState("")
  const [qualificationInput, setQualificationInput] = useState("")
  
  const form = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: teacher ? {
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      role: teacher.role,
      dob: teacher.dob,
      gender: teacher.gender,
      experience: teacher.experience,
      experties: teacher.experties,
      address: teacher.address,
      privateQualifications: teacher.privateQualifications,
      achivements: teacher.achivements || [],
      status: teacher.status,
      languagesSpoken: teacher.languagesSpoken,
      qualifications: teacher.qualifications,
      education: teacher.education,
    } : {
      name: "",
      email: "",
      phone: "",
      role: "",
      dob: "",
      gender: "Male",
      experience: 0,
      experties: [],
      address: [{ type: "home", detail: "" }],
      privateQualifications: [],
      achivements: [],
      status: "Active",
      languagesSpoken: [],
      qualifications: [],
      education: [{ degree: "", institution: "", fieldOfStudy: "", year: "" }],
    },
  })

  const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
    control: form.control,
    name: "address"
  })

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education"
  })

  const { fields: privateQualFields, append: appendPrivateQual, remove: removePrivateQual } = useFieldArray({
    control: form.control,
    name: "privateQualifications"
  })

  const { fields: achievementFields, append: appendAchievement, remove: removeAchievement } = useFieldArray({
    control: form.control,
    name: "achivements"
  })

  const handleSubmit = async (data: TeacherFormData) => {
    const success = await onSubmit(data)
    if (success) {
      form.reset()
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    form.reset()
    setIsOpen(false)
    onCancel?.()
  }

  const addExpertise = () => {
    if (expertiseInput.trim()) {
      const current = form.getValues("experties")
      form.setValue("experties", [...current, expertiseInput.trim()])
      setExpertiseInput("")
    }
  }

  const removeExpertise = (index: number) => {
    const current = form.getValues("experties")
    form.setValue("experties", current.filter((_, i) => i !== index))
  }

  const addLanguage = () => {
    if (languageInput.trim()) {
      const current = form.getValues("languagesSpoken")
      form.setValue("languagesSpoken", [...current, languageInput])
      setLanguageInput("")
    }
  }

  const removeLanguage = (index: number) => {
    const current = form.getValues("languagesSpoken")
    form.setValue("languagesSpoken", current.filter((_, i) => i !== index))
  }

  const addQualification = () => {
    if (qualificationInput.trim()) {
      const current = form.getValues("qualifications")
      form.setValue("qualifications", [...current, qualificationInput.trim()])
      setQualificationInput("")
    }
  }

  const removeQualification = (index: number) => {
    const current = form.getValues("qualifications")
    form.setValue("qualifications", current.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className="w-full sm:w-auto">
          <Edit className="mr-2 h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Teacher Information</DialogTitle>
          <DialogDescription>Update teacher details and qualifications</DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel>Role *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dob" render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth *</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="gender" render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="experience" render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience (Years) *</FormLabel>
                  <FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="space-y-4">
              <div>
                <FormLabel>Expertise *</FormLabel>
                <div className="flex gap-2 mb-2">
                  <Select value={expertiseInput} onValueChange={setExpertiseInput}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addExpertise} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.watch("experties").map((expertise, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeExpertise(index)}>
                      {expertise} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <FormLabel>Languages Spoken *</FormLabel>
                <div className="flex gap-2 mb-2">
                  <Select value={languageInput} onValueChange={setLanguageInput}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addLanguage} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.watch("languagesSpoken").map((language, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => removeLanguage(index)}>
                      {language} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <FormLabel>Qualifications *</FormLabel>
                <div className="flex gap-2 mb-2">
                  <Input 
                    placeholder="Add qualification" 
                    value={qualificationInput}
                    onChange={(e) => setQualificationInput(e.target.value)}
                    // onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQualification())}
                  />
                  <Button type="button" onClick={addQualification} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.watch("qualifications").map((qualification, index) => (
                    <Badge key={index} variant="default" className="cursor-pointer" onClick={() => removeQualification(index)}>
                      {qualification} <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" disabled={form.formState.isSubmitting} className="flex-1 sm:flex-none">
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 sm:flex-none">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}