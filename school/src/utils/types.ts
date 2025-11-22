// Error type
export interface errorPopuo {
  type: "success" | "warning" | "info" | "error";
  message: string;
}

// classes
export interface ClassItem {
  class_id: number;
  class_name: string;
  section: string;
  teacher_id: number;
  student_count?: number;
  teachers?: string[];
}

// teachers

export interface ClassInfo {
  class_id: number;
  class_name: string;
  section: string;
}

export interface Teacher {
  employee_id: number;
  teacher_name: string;
  subject: string;
  contact: string;
  classes: ClassInfo[]; // multiple classes
}

// students

export interface Student {
  roll_number: number;
  name: string;
  class_id: number;
  contact: string;
  dob: string;
  classname?: string;
}
