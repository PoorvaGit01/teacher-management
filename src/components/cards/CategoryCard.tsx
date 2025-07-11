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
    <Card className="p-4 text-center rounded-none hover:shadow-md cursor-pointer" onClick={onClick}>
      <div className="text-2xl">{icons[name]}</div>
      <h3 className="font-medium">{name}</h3>
      <p className="text-sm mb-0">{count} courses</p>
    </Card>
  );
};