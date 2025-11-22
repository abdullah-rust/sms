import { api } from "../utils/api";
import type { Student } from "../utils/types";

export default async function GetStudentsData(): Promise<Student[] | string> {
  try {
    const data = await api.get("/students");
    console.log(data.data.data);
    return data.data.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message || e.response.data.error;
  }
}
