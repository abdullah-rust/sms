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

// model
import AddStudentModal from "./components/AddStudentModal/AddStudentModal";
import AddTeacherModal from "./components/AddTeacherModal/AddTeacherModal";
import AddClassModal from "./components/AddClassModal/AddClassModal";
import ErrorPopup from "./components/ErrorPopup/ErrorPopup";

// other
import {
  addstudentAtom,
  addteacherAtom,
  addclassAtom,
  loginAtom,
  errorPopupVisible,
  ClaasesDataAtom,
} from "./utils/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

// api calls
import GetClassesData from "./API/ClassDataAPI";

function App() {
  const addstudent = useAtomValue(addstudentAtom);
  const addteacher = useAtomValue(addteacherAtom);
  const addclass = useAtomValue(addclassAtom);
  const isLogin = useAtomValue(loginAtom);
  const errorPopup = useAtomValue(errorPopupVisible);
  const setClassData = useSetAtom(ClaasesDataAtom);

  async function GetClasses() {
    const res = await GetClassesData();
    if (typeof res !== "string") {
      setClassData(res);
    }
  }

  useEffect(() => {
    if (isLogin) {
      GetClasses();
    }
  }, [isLogin]);

  return (
    <>
      {!isLogin ? (
        <Login />
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
        </main>
      )}
    </>
  );
}

export default App;
