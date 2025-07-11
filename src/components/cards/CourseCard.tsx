import React, { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Share2, User } from "lucide-react";
import { Course, Teacher } from "@/constants/types";

type Props = {
  course: Course;
  teacher: Teacher;
  enroll: (id: string) => void;
  teacherClick: (id: string) => void;
  wishlist: string[];
  share: (id: string) => void;
};

export const CourseCard: React.FC<Props> = ({ course, teacher, enroll, teacherClick, wishlist, share }) => {
  const isWished = wishlist.includes(course.id);

  return (
    <div>
    <Card className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
        <Button variant="ghost" size="icon" onClick={() => share(course.id)}>
          <Share2 size={16} />
        </Button>
      </div>
      <p className="text-sm text-gray-600">{course.description}</p>
      <div className="flex flex-wrap gap-2">
        {course.topics.slice(0, 3).map((topic, idx) => (
          <Badge key={idx} variant="secondary" className="text-xs">{topic}</Badge>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>${course.price}</span>
        <span>{course.totalStudents} students</span>
      </div>
      <div className="flex justify-between items-center">
        <Button onClick={() => enroll(course.id)} size="sm">Enroll</Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => teacherClick(teacher.id)}>
            <User size={16} />
          </Button>
          <Button variant={isWished ? "default" : "ghost"} size="icon" onClick={() => enroll(course.id)}>
            <Heart size={16} fill={isWished ? "#f00" : "none"} />
          </Button>
        </div>
      </div>
    </Card>
    </div>
  );
};
