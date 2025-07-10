type User = {
  name: string;
  id: string;
  role: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
};

type Student = {
  studentId: string;
  role: "Student" | "Monitor" | "Prefect"; 
  name: string;
  dob: string; 
  class: string; 
  section: string;
  subjectTeacherId: string;
};

type PrivateQualification = {
  name: string;
  rate: string;
};

type Teacher = {
  teacherId: string;
  name: string;
  role: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  experience: number;
  experties: string[];
  address: string;
  email: string;
  phone: string;
  privateQualifications: PrivateQualification[];
};

const users: User[] = [
  {
    name: "Alice Johnson",
    id: "U001",
    role: "Teacher",
    dob: "1990-04-15",
    gender: "Female",
  },
  {
    name: "Raj Mehra",
    id: "U002",
    role: "Admin",
    dob: "1985-08-22",
    gender: "Male",
  },
  {
    name: "Emily Wang",
    id: "U003",
    role: "Teacher",
    dob: "1992-11-30",
    gender: "Female",
  },
  {
    name: "Mohammed Ali",
    id: "U004",
    role: "Support",
    dob: "1994-01-10",
    gender: "Male",
  },
  {
    name: "Sita Reddy",
    id: "U005",
    role: "Teacher",
    dob: "1989-06-05",
    gender: "Female",
  }
];


const students: Student[] = [
  {
    studentId: "S001",
    role: "Student",
    name: "Ravi Kumar",
    dob: "2008-09-15",
    class: "10",
    section: "A",
    subjectTeacherId: "T101"
  },
  {
    studentId: "S002",
    role: "Monitor",
    name: "Sneha Reddy",
    dob: "2009-01-20",
    class: "9",
    section: "B",
    subjectTeacherId: "T102"
  }
];

const teachers:Teacher[] =[
  {
    teacherId: "T001",
    name: "Anjali Sharma",
    role: "Subject Teacher",
    dob: "1985-03-22",
    gender: "Female",
    experience: 10,
    experties: ["Mathematics", "Algebra"],
    address: "New Delhi, India",
    email: "anjali.sharma@example.com",
    phone: "+91-9876543210",
    privateQualifications: [
      { name: "Algebra Coaching", rate: "$5/hr" },
      { name: "Math Tutoring", rate: "$7/hr" }
    ]
  },
  {
    teacherId: "T002",
    name: "Rohit Mehta",
    role: "Senior Teacher",
    dob: "1980-06-15",
    gender: "Male",
    experience: 15,
    experties: ["Physics", "Thermodynamics"],
    address: "Mumbai, India",
    email: "rohit.mehta@example.com",
    phone: "+91-9876543222",
    privateQualifications: [
      { name: "Physics Coaching", rate: "$6/hr" }
    ]
  },
  {
    teacherId: "T003",
    name: "Sara Iqbal",
    role: "Subject Teacher",
    dob: "1990-12-10",
    gender: "Female",
    experience: 8,
    experties: ["English", "Grammar"],
    address: "Hyderabad, India",
    email: "sara.iqbal@example.com",
    phone: "+91-9876543233",
    privateQualifications: [
      { name: "Spoken English", rate: "$4/hr" },
      { name: "Essay Writing", rate: "$5/hr" }
    ]
  },
  {
    teacherId: "T004",
    name: "Amit Sinha",
    role: "Assistant Teacher",
    dob: "1992-03-05",
    gender: "Male",
    experience: 5,
    experties: ["Chemistry", "Organic Chemistry"],
    address: "Pune, India",
    email: "amit.sinha@example.com",
    phone: "+91-9876543244",
    privateQualifications: [
      { name: "Organic Chemistry", rate: "$6/hr" }
    ]
  },
  {
    teacherId: "T005",
    name: "Nivedita Roy",
    role: "Subject Teacher",
    dob: "1988-09-18",
    gender: "Female",
    experience: 9,
    experties: ["Biology", "Genetics"],
    address: "Kolkata, India",
    email: "nivedita.roy@example.com",
    phone: "+91-9876543255",
    privateQualifications: [
      { name: "Biology for NEET", rate: "$8/hr" }
    ]
  },
  {
    teacherId: "T006",
    name: "Farhan Ali",
    role: "Subject Teacher",
    dob: "1987-11-25",
    gender: "Male",
    experience: 12,
    experties: ["Computer Science", "Data Structures"],
    address: "Bangalore, India",
    email: "farhan.ali@example.com",
    phone: "+91-9876543266",
    privateQualifications: [
      { name: "Data Structures", rate: "$9/hr" },
      { name: "Python Basics", rate: "$6/hr" }
    ]
  }
];
