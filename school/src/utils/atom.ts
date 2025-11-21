import { atom } from "jotai";
import type { errorPopuo, ClassItem, Teacher, Student } from "./types";

// models
export const addstudentAtom = atom(false);
export const addteacherAtom = atom(false);
export const addclassAtom = atom(false);
export const loginAtom = atom(false);
export const teacherEditAtom = atom(false);
export const studentEditAtom = atom(false);

// error popoup
export const errorPopupAtom = atom<errorPopuo>();
export const errorPopupVisible = atom<boolean>(false);

// data classes
export const ClaasesDataAtom = atom<ClassItem[]>();
export const trigerAtom = atom<number>(0);

// teachers data
export const TeachersDataAtom = atom<Teacher[]>();
export const TeacherEditData = atom<Teacher>();

// students data
export const StudentsDataAtom = atom<Student[]>();
export const StudentEditData = atom<Student>();
