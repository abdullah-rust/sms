import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

// import pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import Teachers from "./pages/Teachers/Teachers";
import Classes from "./pages/Classes/Classes";
import Attedndance from "./pages/Attendance/Attendance";
import Login from "./pages/Login/Login";
import LoadingPage from "./pages/LoadingPage/LoadingPage";

// model
import AddStudentModal from "./components/AddStudentModal/AddStudentModal";
import AddTeacherModal from "./components/AddTeacherModal/AddTeacherModal";
import AddClassModal from "./components/AddClassModal/AddClassModal";
import ErrorPopup from "./components/ErrorPopup/ErrorPopup";
import EditTeacherModal from "./components/EditTeacherModal/EditTeacherModal";
import EditStudentModal from "./components/EditStudentModal/EditStudentModal";

// other
import {
  addstudentAtom,
  addteacherAtom,
  addclassAtom,
  loginAtom,
  errorPopupVisible,
  ClaasesDataAtom,
  TeachersDataAtom,
  StudentsDataAtom,
  trigerAtom,
  teacherEditAtom,
  studentEditAtom,
} from "./utils/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

// api calls
import GetClassesData from "./API/ClassDataAPI";
import GetTeachersData from "./API/TeachersDataAPI";
import GetStudentsData from "./API/StudentsDataAPI";

function App() {
  const [trigerCount, setTrigerCoun] = useState(0);
  const addstudent = useAtomValue(addstudentAtom);
  const addteacher = useAtomValue(addteacherAtom);
  const addclass = useAtomValue(addclassAtom);
  const isLogin = useAtomValue(loginAtom);
  const errorPopup = useAtomValue(errorPopupVisible);
  const setClassData = useSetAtom(ClaasesDataAtom);
  const setTeachersData = useSetAtom(TeachersDataAtom);
  const setStudentsData = useSetAtom(StudentsDataAtom);
  const trigerAtomValue = useAtomValue(trigerAtom);
  const [loading, setLoading] = useState(true);
  const teacherEdit = useAtomValue(teacherEditAtom);
  const studentEdit = useAtomValue(studentEditAtom);

  async function GetData() {
    const res2 = await GetTeachersData();
    if (typeof res2 !== "string") {
      setTeachersData(res2);
    }
    const res3 = await GetStudentsData();
    if (typeof res3 !== "string") {
      setStudentsData(res3);
    }
  }

  async function getClasses() {
    const res = await GetClassesData();
    if (typeof res !== "string") {
      setClassData(res);
    }
  }

  useEffect(() => {
    if (isLogin) {
      if (trigerCount === 0) {
        setLoading(true);

        Promise.all([GetData(), getClasses()])
          .then(() => {
            // Small artificial delay (e.g., 300ms)
            return new Promise((resolve) => setTimeout(resolve, 1000));
          })
          .finally(() => {
            setLoading(false);
          });

        setTrigerCoun(trigerCount + 1);
      } else {
        setLoading(true);

        Promise.all([getClasses()])
          .then(() => {
            // Small artificial delay (e.g., 300ms)
            return new Promise((resolve) => setTimeout(resolve, 1000));
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [trigerAtomValue, isLogin]);

  return (
    <>
      {!isLogin ? (
        <Login />
      ) : (
        <>
          {loading ? (
            <LoadingPage />
          ) : (
            <main className="app">
              <Header />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/attend" element={<Attedndance />} />
              </Routes>
              {addstudent && <AddStudentModal />}
              {addteacher && <AddTeacherModal />}
              {addclass && <AddClassModal />}
              {errorPopup && <ErrorPopup />}
              {teacherEdit && <EditTeacherModal />}
              {studentEdit && <EditStudentModal />}
            </main>
          )}
        </>
      )}
    </>
  );
}

export default App;
