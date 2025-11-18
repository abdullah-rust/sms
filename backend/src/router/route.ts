import { Router } from "express";
import adminLogin from "../admin/login";
import AddClass from "../controllers/Classes/AddClass";
import GetClasses from "../controllers/Classes/GetClasses";
import { CheckJwt } from "../middleware/checkjwt";
import AddTeacher from "../controllers/Teachers/AddTeacher";

const router = Router();

router.post("/login", adminLogin);
router.post("/add-class", CheckJwt, AddClass);
router.post("/add-teacher", CheckJwt, AddTeacher);
router.get("/classes", CheckJwt, GetClasses);

export default router;
