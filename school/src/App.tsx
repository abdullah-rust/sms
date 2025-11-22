import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

// import pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import Teachers from "./pages/Teachers/Teachers";
import Classes from "./pages/Classes/Classes";
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
  errorPopupAtom,
} from "./utils/atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
  const [errorPopup, seterrorPopup] = useAtom(errorPopupVisible);
  const setClassData = useSetAtom(ClaasesDataAtom);
  const setTeachersData = useSetAtom(TeachersDataAtom);
  const setStudentsData = useSetAtom(StudentsDataAtom);
  const trigerAtomValue = useAtomValue(trigerAtom);
  const [loading, setLoading] = useState(true);
  const teacherEdit = useAtomValue(teacherEditAtom);
  const studentEdit = useAtomValue(studentEditAtom);
  const SetError = useSetAtom(errorPopupAtom);

  async function GetData() {
    const res2 = await GetTeachersData();
    if (typeof res2 !== "string") {
      setTeachersData(res2);
    } else {
      SetError({ type: "error", message: res2 });
      seterrorPopup(true);
    }
    const res3 = await GetStudentsData();
    if (typeof res3 !== "string") {
      setStudentsData(res3);
    } else {
      SetError({ type: "error", message: res3 });
      seterrorPopup(true);
    }
  }

  async function getClasses() {
    const res = await GetClassesData();
    if (typeof res !== "string") {
      setClassData(res);
    } else {
      // console.log(res);
      seterrorPopup(true);
      SetError({ type: "error", message: res || "kuch galat hai " });
    }
  }

  function goFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }

  useEffect(() => {
    if (isLogin) {
      if (trigerCount === 0) {
        goFullscreen();
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
      {errorPopup && <ErrorPopup />}
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
              </Routes>
              {addstudent && <AddStudentModal />}
              {addteacher && <AddTeacherModal />}
              {addclass && <AddClassModal />}
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
