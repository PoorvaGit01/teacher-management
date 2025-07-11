import { teachers } from "@/constants/teachersData";
import { Teacher } from "@/constants/types";
import { useState, useEffect, useMemo } from "react";

interface UseTeachersOptions {
  searchTerm?: string;
  filterBy?: string;
}

export const useTeachers = (options: UseTeachersOptions = {}) => {
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTeacher(teachers);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch teachers"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        !options.searchTerm ||
        teacher.name.toLowerCase().includes(options.searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(options.searchTerm.toLowerCase());
      const matchesFilter =
        !options.filterBy ||
        teacher.role === options.filterBy ||
        teacher.experties.includes(options.filterBy);

      return matchesSearch && matchesFilter;
    });
  }, [teachers, options.searchTerm, options.filterBy]);

  const deleteTeacher = (id: string) => {
    setTeacher((prev) => prev.filter((teacher) => teacher.id !== id));
  };

  return {
    teachers: filteredTeachers,
    isLoading,
    error,
    deleteTeacher,
  };
};
