import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Languages } from "lucide-react";
import { Teacher } from "@/constants/types";
import Image from "next/image";

type Props = {
  teacher: Teacher;
  onClick: (id: string) => void;
};

export const TeacherCard: FC<Props> = ({ teacher, onClick }) => {
  return (
    <Card className="bg-gray-50 dark:bg-gray-900 border-0 p-6 shadow-md hover:shadow-lg cursor-pointer " onClick={() => onClick(teacher.id)}>
      <div className="border-2 border-gray-400 inline-block w-fit mx-auto p-1 rounded-full">
        <Image src={teacher.avatar} alt={teacher.name} className="w-20 h-20 rounded-full mx-auto object-cover" />
      </div>
      <div className="flex flex-col max-sm:items-center items-start gap-2 text-sm">
        <h3 className="font-bold text-lg capitalize">{teacher.name}</h3>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{teacher.role}</p>
          <p className="text-xs text-gray-600 dark:text-gray-200">{teacher.experience} years </p>
        </div>
        <p>{teacher.experties.join(", ")}</p>
        <div className="flex flex-wrap gap-2 justify-start">
          {teacher.qualifications.slice(0, 2).map((q, i) => (
            <Badge key={i} variant="secondary" className="text-xs bg-gray-200 text-gray-600">{q}</Badge>
          ))}
        </div>
        <div className="flex justify-start space-x-4 text-xs ">
          <div className="flex items-center space-x-1"><Languages size={14} /><span>{teacher.languagesSpoken.length} languages</span></div>
          <div className="flex items-center space-x-1"><Award size={14} /><span>{teacher.achivements?.length || 0} awards</span></div>
        </div>
      </div>
    </Card>
  );
};