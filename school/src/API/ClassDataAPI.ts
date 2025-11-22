import { api } from "../utils/api";
import type { ClassItem } from "../utils/types";

export default async function GetClassesData(): Promise<ClassItem[] | string> {
  try {
    const data = await api.get("/classes");
    console.log(data.data.data);
    return data.data.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message || e.response.data.error;
  }
}
