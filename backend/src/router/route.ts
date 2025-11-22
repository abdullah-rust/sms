import { Router } from "express";
import adminLogin from "../admin/login";
import AddClass from "../controllers/Classes/AddClass";
import GetClasses from "../controllers/Classes/GetClasses";
import { CheckJwt } from "../middleware/checkjwt";
import AddTeacher from "../controllers/Teachers/AddTeacher";
import GetTeachers from "../controllers/Teachers/GetTeachers";
import AddStudent from "../controllers/Students/AddStudent";
import GetStudents from "../controllers/Students/GetStudents";
import editStudent from "../controllers/Students/EditStudent";
import editTeacher from "../controllers/Teachers/EditTeacher";
import deleteStudent from "../controllers/Students/DeleteStudent";
import deleteTeacher from "../controllers/Teachers/DeleteTeacher";
import deleteClass from "../controllers/Classes/DeleteClass";

const router = Router();

// admin
router.post("/login", adminLogin);

// class
router.post("/delete-class", CheckJwt, deleteClass);
router.post("/add-class", CheckJwt, AddClass);
router.get("/classes", CheckJwt, GetClasses);

// teachers
router.post("/delete-teacher", CheckJwt, deleteTeacher);
router.post("/add-teacher", CheckJwt, AddTeacher);
router.post("/edit-teacher", CheckJwt, editTeacher);
router.get("/teachers", CheckJwt, GetTeachers);

// student
router.post("/add-student", CheckJwt, AddStudent);
router.post("/delete-student", CheckJwt, deleteStudent);
router.post("/edit-student", CheckJwt, editStudent);
router.get("/students", CheckJwt, GetStudents);

export default router;
