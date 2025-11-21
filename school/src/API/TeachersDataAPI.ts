import { api } from "../utils/api";
import { errorPopupAtom, errorPopupVisible } from "../utils/atom";
import type { Teacher } from "../utils/types";

export default async function GetTeachersData(): Promise<Teacher[] | string> {
  try {
    const data = await api.get("/teachers");
    console.log(data.data.data);
    return data.data.data;
  } catch (e) {
    console.log(e);
    return "Error";
  }
}
