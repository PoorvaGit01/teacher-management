import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TeacherQuickActionsProps {
  onAction: (action: string) => void
}

const actions = ['View Profile', 'Assign Courses', 'View Schedule']

export const TeacherQuickActions = ({ onAction }: TeacherQuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button 
            key={action}
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onAction(action)}
          >
            {action}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}