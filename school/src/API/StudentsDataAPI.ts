import { api } from "../utils/api";
import { errorPopupAtom, errorPopupVisible } from "../utils/atom";
import type { Student } from "../utils/types";

export default async function GetStudentsData(): Promise<Student[] | string> {
  try {
    const data = await api.get("/students");
    console.log(data.data.data);
    return data.data.data;
  } catch (e) {
    console.log(e);
    return "Error";
  }
}
