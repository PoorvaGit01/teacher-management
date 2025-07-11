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
    <Card className="p-6 text-center hover:shadow-md cursor-pointer" onClick={() => onClick(teacher.id)}>
      <Image src={teacher.avatar} alt={teacher.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
      <h3 className="font-semibold text-lg text-gray-900 mb-1">{teacher.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{teacher.role}</p>
      <div className="text-sm text-gray-500 mb-2">{teacher.experience} years • {teacher.experties.join(", ")}</div>
      <div className="flex flex-wrap gap-1 justify-center mb-2">
        {teacher.qualifications.slice(0, 2).map((q, i) => (
          <Badge key={i} variant="secondary" className="text-xs">{q}</Badge>
        ))}
      </div>
      <div className="flex justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1"><Languages size={14} /><span>{teacher.languagesSpoken.length} languages</span></div>
        <div className="flex items-center space-x-1"><Award size={14} /><span>{teacher.achivements?.length || 0} awards</span></div>
      </div>
    </Card>
  );
};