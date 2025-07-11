import { StaticImageData } from "next/image";

export type PrivateQualification = {
  name: string;
  rate: string;
};
export type Achievements = {
  title: string;
  year: string;
};
export type Address = {
  type: string;
  detail: string;
};

export type Education = {
  degree: string;
  institution: string;
  fieldOfStudy: string;
  year: string;
  grade?: string;
};

export type Teacher = {
  id: string;
  avatar?: any;
  name: string;
  role: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  experience: number;
  experties: string[];
  address: Address[];
  email: string;
  phone: string;
  privateQualifications: PrivateQualification[];
  achivements?: Achievements[];
  status: "Active" | "Inactive";
  languagesSpoken: string[];
  qualifications: string[];
  education: Education[];
};

// types.ts

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  duration: string;
  price: number;
  originalPrice: number;
  rating: number; // 0–5 scale
  totalStudents: number;
  lessonsCount: number;
  certificateProvided: boolean;
  thumbnail: string;
  topics: string[];
  teacherId: string;
  features: string[];
  startDate: string; // ISO format date
  language: string;
  prerequisites: string[];
  tags: string[];
}
