import teacherMale from '../../public/assets/teacher-male.jpg'
import teacherFemale from '../../public/assets/teacher-female.jpg'
import { Teacher } from './types';

export const teachers: Teacher[] = [
  {
    id: "T001",
    avatar: teacherFemale,
    name: "Anjali Sharma",
    role: "Subject Teacher",
    dob: "1985-03-22",
    gender: "Female",
    experience: 10,
    experties: ["Mathematics", "Algebra"],
    address: [
      { type: "home", detail: "123 Street, New Delhi, India" },
      { type: "school", detail: "Central School, New Delhi" }
    ],
    email: "anjali.sharma@example.com",
    phone: "+91-9876543210",
    privateQualifications: [
      { name: "Algebra Coaching", rate: "$5/hr" },
      { name: "Math Tutoring", rate: "$7/hr" }
    ],
    achivements: [
      { title: "Best Math Teacher", year: "2020" }
    ],
    status: "Active",
    languagesSpoken: ["Hindi", "English"],
    qualifications: ["B.Ed", "M.Sc Mathematics"],
    education: [
      {
        degree: "B.Ed",
        institution: "Delhi University",
        fieldOfStudy: "Education",
        year: "2005",
        grade: "A"
      },
      {
        degree: "M.Sc",
        institution: "IIT Delhi",
        fieldOfStudy: "Mathematics",
        year: "2007",
        grade: "A+"
      }
    ]
  },
  {
    id: "T002",
    avatar: teacherMale,
    name: "Rohit Mehta",
    role: "Senior Teacher",
    dob: "1980-06-15",
    gender: "Male",
    experience: 15,
    experties: ["Physics", "Thermodynamics"],
    address: [
      { type: "home", detail: "45 Marine Drive, Mumbai, India" },
      { type: "school", detail: "St. Xavier’s School, Mumbai" }
    ],
    email: "rohit.mehta@example.com",
    phone: "+91-9876543222",
    privateQualifications: [
      { name: "Physics Coaching", rate: "$6/hr" }
    ],
    achivements: [
      { title: "State Physics Olympiad Mentor", year: "2018" }
    ],
    status: "Active",
    languagesSpoken: ["Marathi", "Hindi", "English"],
    qualifications: ["Ph.D Physics", "M.Sc Physics"],
    education: [
      {
        degree: "M.Sc",
        institution: "Mumbai University",
        fieldOfStudy: "Physics",
        year: "2002"
      },
      {
        degree: "Ph.D",
        institution: "TIFR",
        fieldOfStudy: "Quantum Mechanics",
        year: "2007"
      }
    ]
  },
  {
    id: "T003",
    avatar: teacherFemale,
    name: "Sara Iqbal",
    role: "Subject Teacher",
    dob: "1990-12-10",
    gender: "Female",
    experience: 8,
    experties: ["English", "Grammar"],
    address: [
      { type: "home", detail: "15 Banjara Hills, Hyderabad, India" },
      { type: "school", detail: "Greenwood High, Hyderabad" }
    ],
    email: "sara.iqbal@example.com",
    phone: "+91-9876543233",
    privateQualifications: [
      { name: "Spoken English", rate: "$4/hr" },
      { name: "Essay Writing", rate: "$5/hr" }
    ],
    status: "Active",
    languagesSpoken: ["English", "Hindi", "Urdu"],
    qualifications: ["B.Ed", "M.A English"],
    education: [
      {
        degree: "B.A",
        institution: "Osmania University",
        fieldOfStudy: "English Literature",
        year: "2010"
      },
      {
        degree: "M.A",
        institution: "University of Hyderabad",
        fieldOfStudy: "English",
        year: "2012"
      },
      {
        degree: "B.Ed",
        institution: "IGNOU",
        fieldOfStudy: "Education",
        year: "2014"
      }
    ]
  },
  {
    id: "T004",
    avatar: teacherMale,
    name: "Amit Sinha",
    role: "Assistant Teacher",
    dob: "1992-03-05",
    gender: "Male",
    experience: 5,
    experties: ["Chemistry", "Organic Chemistry"],
    address: [
      { type: "home", detail: "24 Shivaji Nagar, Pune, India" },
      { type: "school", detail: "Kendriya Vidyalaya, Pune" }
    ],
    email: "amit.sinha@example.com",
    phone: "+91-9876543244",
    privateQualifications: [
      { name: "Organic Chemistry", rate: "$6/hr" }
    ],
    status: "Active",
    languagesSpoken: ["Marathi", "English", "Hindi"],
    qualifications: ["B.Sc Chemistry", "B.Ed"],
    education: [
      {
        degree: "B.Sc",
        institution: "Fergusson College",
        fieldOfStudy: "Chemistry",
        year: "2013"
      },
      {
        degree: "B.Ed",
        institution: "Savitribai Phule Pune University",
        fieldOfStudy: "Education",
        year: "2015"
      }
    ]
  },
  {
    id: "T005",
    avatar: teacherFemale,
    name: "Nivedita Roy",
    role: "Subject Teacher",
    dob: "1988-09-18",
    gender: "Female",
    experience: 9,
    experties: ["Biology", "Genetics"],
    address: [
      { type: "home", detail: "Lake Town, Kolkata, India" },
      { type: "school", detail: "Salt Lake School, Kolkata" }
    ],
    email: "nivedita.roy@example.com",
    phone: "+91-9876543255",
    privateQualifications: [
      { name: "Biology for NEET", rate: "$8/hr" }
    ],
    status: "Inactive",
    languagesSpoken: ["Bengali", "English", "Hindi"],
    qualifications: ["B.Sc Biology", "M.Sc Genetics", "B.Ed"],
    education: [
      {
        degree: "B.Sc",
        institution: "Presidency University",
        fieldOfStudy: "Biology",
        year: "2008"
      },
      {
        degree: "M.Sc",
        institution: "Calcutta University",
        fieldOfStudy: "Genetics",
        year: "2010"
      },
      {
        degree: "B.Ed",
        institution: "Jadavpur University",
        fieldOfStudy: "Education",
        year: "2012"
      }
    ]
  },
  {
    id: "T006",
    avatar: teacherMale,
    name: "Farhan Ali",
    role: "Subject Teacher",
    dob: "1987-11-25",
    gender: "Male",
    experience: 12,
    experties: ["Computer Science", "Data Structures"],
    address: [
      { type: "home", detail: "Indiranagar, Bangalore, India" },
      { type: "school", detail: "National Public School, Bangalore" }
    ],
    email: "farhan.ali@example.com",
    phone: "+91-9876543266",
    privateQualifications: [
      { name: "Data Structures", rate: "$9/hr" },
      { name: "Python Basics", rate: "$6/hr" }
    ],
    status: "Active",
    languagesSpoken: ["English", "Kannada", "Hindi"],
    qualifications: ["B.Tech CSE", "M.Tech AI"],
    education: [
      {
        degree: "B.Tech",
        institution: "NIT Surathkal",
        fieldOfStudy: "Computer Science",
        year: "2009"
      },
      {
        degree: "M.Tech",
        institution: "IISc Bangalore",
        fieldOfStudy: "Artificial Intelligence",
        year: "2012"
      }
    ]
  }
];
