export interface Student {
  roll_number: number;
  name: string;
  class_id: number;
  contact: string;
  dob: string;
  className?: string;
}

export const mockStudents: Student[] = [
  {
    roll_number: 1001,
    name: "Ali Ahmed",
    class_id: 10,
    contact: "+92 300 1234567",
    dob: "2008-03-15",
    className: "Grade 10 - A",
  },
  {
    roll_number: 1002,
    name: "Sara Khan",
    class_id: 11,
    contact: "+92 301 2345678",
    dob: "2007-07-22",
    className: "Grade 11 - B",
  },
  {
    roll_number: 1003,
    name: "Usman Raza",
    class_id: 9,
    contact: "+92 302 3456789",
    dob: "2009-11-08",
    className: "Grade 9 - C",
  },
  {
    roll_number: 1004,
    name: "Fatima Noor",
    class_id: 12,
    contact: "+92 303 4567890",
    dob: "2006-05-30",
    className: "Grade 12 - A",
  },
  {
    roll_number: 1005,
    name: "Bilal Siddiqui",
    class_id: 10,
    contact: "+92 304 5678901",
    dob: "2008-09-14",
    className: "Grade 10 - B",
  },
  {
    roll_number: 1006,
    name: "Ayesha Malik",
    class_id: 11,
    contact: "+92 305 6789012",
    dob: "2007-12-03",
    className: "Grade 11 - A",
  },
  {
    roll_number: 1007,
    name: "Omar Farooq",
    class_id: 9,
    contact: "+92 306 7890123",
    dob: "2009-02-18",
    className: "Grade 9 - A",
  },
  {
    roll_number: 1008,
    name: "Zainab Hassan",
    class_id: 12,
    contact: "+92 307 8901234",
    dob: "2006-08-25",
    className: "Grade 12 - B",
  },
];
