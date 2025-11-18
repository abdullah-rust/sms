export interface Teacher {
  employee_id: number;
  name: string;
  subject: string;
  contact: string;
  class_id: number;
  className?: string;
}

export const mockTeachers: Teacher[] = [
  {
    employee_id: 2001,
    name: "Mr. Ahmed Raza",
    subject: "Mathematics",
    contact: "+92 300 1112233",
    class_id: 10,
    className: "Grade 10 - A",
  },
  {
    employee_id: 2002,
    name: "Ms. Sana Khan",
    subject: "Physics",
    contact: "+92 301 2223344",
    class_id: 11,
    className: "Grade 11 - B",
  },
  {
    employee_id: 2003,
    name: "Mr. Usman Ali",
    subject: "Chemistry",
    contact: "+92 302 3334455",
    class_id: 12,
    className: "Grade 12 - A",
  },
  {
    employee_id: 2004,
    name: "Mrs. Fatima Sheikh",
    subject: "Biology",
    contact: "+92 303 4445566",
    class_id: 9,
    className: "Grade 9 - C",
  },
];
