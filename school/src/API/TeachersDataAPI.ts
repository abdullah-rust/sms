import { api } from "../utils/api";
import type { Teacher } from "../utils/types";

export default async function GetTeachersData(): Promise<Teacher[] | string> {
  try {
    const data = await api.get("/teachers");
    console.log(data.data.data);
    return data.data.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message || e.response.data.error;
  }
}
