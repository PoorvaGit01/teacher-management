import { FC } from "react";

type Props = {
  courseCount: number;
  teacherCount: number;
  studentCount: number;
  avgRating: number;
};

export const StatsBlock: FC<Props> = ({ courseCount, teacherCount, studentCount, avgRating }) => {
  return (
    <section className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div><div className="text-3xl font-bold mb-2">{courseCount}+</div><div className="text-blue-100">Expert Courses</div></div>
        <div><div className="text-3xl font-bold mb-2">{teacherCount}+</div><div className="text-blue-100">Certified Teachers</div></div>
        <div><div className="text-3xl font-bold mb-2">{studentCount.toLocaleString()}+</div><div className="text-blue-100">Happy Students</div></div>
        <div><div className="text-3xl font-bold mb-2">{avgRating}⭐</div><div className="text-blue-100">Average Rating</div></div>
      </div>
    </section>
  );
};