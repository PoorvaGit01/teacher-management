"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import PageTitle from "@/components/common/PageTitle";
import { DataTable } from "@/components/table/data-table";
import { useTeachers } from "@/hooks/use-teacher-data";
import { createTeacherColumns } from "@/components/table/table-column";

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [roleFilter, setRoleFilter] = useState("All");
  const { teachers, deleteTeacher } = useTeachers({
    searchTerm,
  });

  const columns = createTeacherColumns(deleteTeacher);

  const filteredTeachers = teachers.filter((teacher) => {
    const lowerSearch = searchTerm.toLowerCase();

    const matchesSearch =
      teacher.name.toLowerCase().includes(lowerSearch) ||
      teacher.email.toLowerCase().includes(lowerSearch) ||
      teacher.experties.some((sub) => sub.toLowerCase().includes(lowerSearch));

    const matchedRole = roleFilter === "all" || teacher.role === roleFilter;
    return matchesSearch;
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <PageTitle
          title="Teacher"
          description="Manage your teaching staff and their information."
        />
        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Directory</CardTitle>
          <CardDescription>
            A comprehensive list of all teaching staff members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Subject Teacher</SelectItem>
                  <SelectItem value="active">Assistant Teacher</SelectItem>
                  <SelectItem value="inactive">Senior Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <DataTable
                  columns={columns}
                  data={teachers}
                  isLoading={isLoading}
                />
              </div>
            </div>
            {filteredTeachers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No teachers found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
