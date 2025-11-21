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

const router = Router();

// admin
router.post("/login", adminLogin);

// class
router.post("/add-class", CheckJwt, AddClass);
router.get("/classes", CheckJwt, GetClasses);

// teachers
router.post("/add-teacher", CheckJwt, AddTeacher);
router.get("/teachers", CheckJwt, GetTeachers);

// student
router.post("/add-student", CheckJwt, AddStudent);
router.post("/edit-student", CheckJwt, editStudent);
router.get("/students", CheckJwt, GetStudents);

export default router;
