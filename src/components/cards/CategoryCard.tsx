import { FC } from "react";
import { Card } from "@/components/ui/card";

type Props = {
  name: string;
  count: number;
  onClick: () => void;
};

const icons: Record<string, string> = {
  Mathematics: "📐",
  Physics: "⚛️",
  Chemistry: "🧪",
  Biology: "🧬",
  English: "📚",
  "Computer Science": "💻",
};

export const CategoryCard: FC<Props> = ({ name, count, onClick }) => {
  return (
    <Card className="p-4 text-center hover:shadow-md cursor-pointer" onClick={onClick}>
      <div className="text-2xl mb-2">{icons[name]}</div>
      <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-gray-500">{count} courses</p>
    </Card>
  );
};