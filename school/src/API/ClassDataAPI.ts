import { api } from "../utils/api";
import { errorPopupAtom, errorPopupVisible } from "../utils/atom";
import type { ClassItem } from "../utils/types";

export default async function GetClassesData(): Promise<ClassItem[] | string> {
  try {
    const data = await api.get("/classes");
    console.log(data.data.data);
    return data.data.data;
  } catch (e) {
    console.log(e);
    return "Error";
  }
}
