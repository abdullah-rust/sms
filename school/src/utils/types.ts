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
