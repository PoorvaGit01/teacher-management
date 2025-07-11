import { LucideIcon } from "lucide-react"

interface InfoItemProps {
  icon: LucideIcon
  children: React.ReactNode
  className?: string
}

export const InfoItem = ({ icon: Icon, children, className = "" }: InfoItemProps) => (
  <div className={`flex items-center space-x-3 ${className}`}>
    <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
    <span className="text-sm">{children}</span>
  </div>
)

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  className?: string
}

export const SectionHeader = ({ icon: Icon, title, className = "" }: SectionHeaderProps) => (
  <h4 className={`font-medium mb-3 flex items-center gap-2 ${className}`}>
    <Icon className="h-4 w-4" />
    {title}
  </h4>
)