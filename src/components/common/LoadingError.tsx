import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const TeacherLoading = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="text-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
      <p className="text-muted-foreground">Loading teacher details...</p>
    </div>
  </div>
)

interface TeacherErrorProps {
  error?: string
}

export const TeacherError = ({ error }: TeacherErrorProps) => (
  <div className="flex-1 flex items-center justify-center p-6">
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Teacher Not Found</CardTitle>
        <CardDescription>
          {error || "The requested teacher could not be found."}
        </CardDescription>
      </CardHeader>
      <CardContent>
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