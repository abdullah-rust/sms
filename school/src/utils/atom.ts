import { atom } from "jotai";
import type { errorPopuo, ClassItem } from "./types";

export const addstudentAtom = atom(false);
export const addteacherAtom = atom(false);
export const addclassAtom = atom(false);
export const loginAtom = atom(false);

// error popoup
export const errorPopupAtom = atom<errorPopuo>();
export const errorPopupVisible = atom<boolean>(false);

// data classes

export const ClaasesDataAtom = atom<ClassItem[]>();
