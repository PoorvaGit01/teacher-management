import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Teacher } from "@/constants/types";
import { TableActions } from "./table-action";

export const createTeacherColumns = (
  onDelete: (id: string) => void,
  onView?: (id: string) => void,
): ColumnDef<Teacher>[] => [
  {
    accessorKey: "name",
    header: "Teacher",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={teacher.avatar || ""} alt={teacher.name} />
            <AvatarFallback>
              {teacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{teacher.name}</div>
            <div className="text-sm text-muted-foreground">{teacher.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "experties",
    header: "Subjects",
    cell: ({ row }) => {
      const subjects = row.getValue("experties") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {subjects.map((subject, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-200 text-gray-600">
              {subject}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("experience")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="text-right">
        <TableActions
          teacherId={row.original.id}
          onDelete={onDelete}
          onView={onView}
        />
      </div>
    ),
  },
];
