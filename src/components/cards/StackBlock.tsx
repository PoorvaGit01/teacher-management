import { Star } from "lucide-react";
import { FC } from "react";

type Props = {
  courseCount: number;
  teacherCount: number;
  studentCount: number;
  avgRating: number;
};

export const StatsBlock: FC<Props> = ({ courseCount, teacherCount, studentCount, avgRating }) => {
  return (
    <section className=" bg-gray-200 dark:bg-gray-900 text-foreground">
      <div className="container mx-auto px-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div><div className="text-2xl font-bold mb-2">{courseCount}+</div><div>Expert Courses</div></div>
        <div><div className="text-2xl font-bold mb-2">{teacherCount}+</div><div>Certified Teachers</div></div>
        <div><div className="text-2xl font-bold mb-2">{studentCount.toLocaleString()}+</div><div>Happy Students</div></div>
        <div><div className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">{avgRating}<Star className="fill-amber-300 text-amber-200"/> </div><div>Average Rating</div></div>
      </div>
    </section>
  );
};