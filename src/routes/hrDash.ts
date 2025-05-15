import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { getUserDetails, getUserDetailsById, postUserDetails, updateUserDetails } from "../controllers/userDetails";
import { deleteHoliday, getHoliday, postHolidays, updateHoliday } from "../controllers/holiday";
import { deleteUser } from "../controllers/user";
import { get } from "mongoose";
import { getPrevEmploymentById, postPrevEmployment, updatePrevEmployment } from "../controllers/prevEmployment";
import { getSocialById, postSocialById, updateSocialById } from "../controllers/socialLinks";
import { getDocumentById, postDocumentId, updateDocumentId } from "../controllers/document";
import { getContactById, postContactId, updateContactId } from "../controllers/contact";
import { getAttendance, loginAttendance, logoutAttendance, updateAttendance } from "../controllers/attendance";
import { SignIn, SignUp } from "../controllers/auth";

const router = Router();

router.post('/signin', SignIn);

router.post('/signup', SignUp)


router.get("/employees", authMiddleware, getUserDetails);

router.get("/employee/:id", authMiddleware, getUserDetailsById);

router.post("/employee", authMiddleware, postUserDetails);

router.put("/employee/:id", authMiddleware, updateUserDetails);

router.delete("/employee/:id", authMiddleware, deleteUser);


router.get("/prevEmployment/:id", authMiddleware, getPrevEmploymentById);

router.post("/prevEmployment/:id", authMiddleware, postPrevEmployment);

router.put("/prevEmployment/:id", authMiddleware, updatePrevEmployment);


router.get("/socialLinks/:id", authMiddleware, getSocialById)
router.post("/socialLinks/:id", authMiddleware, postSocialById)
router.put("/socialLinks/:id", authMiddleware, updateSocialById)

router.get("/document/:id", authMiddleware, getDocumentById)
router.post("/document/:id", authMiddleware, postDocumentId)
router.put("/document/:id", authMiddleware, updateDocumentId)

router.get("/contact/:id", authMiddleware, getContactById)
router.post("/contact/:id", authMiddleware, postContactId)
router.put("/contact/:id", authMiddleware, updateContactId)

router.get("/attendance/:id", authMiddleware, getAttendance);
router.post("/attendance/login/:id", authMiddleware, loginAttendance);
router.post("/attendance/logout/:id", authMiddleware, logoutAttendance);
router.put("/attendance/:id", authMiddleware, updateAttendance);


router.get("/leads", authMiddleware,);

router.post("/lead", authMiddleware, (req: Request, res: Response) => {
    res.send("Hello World!");
});

router.put("/lead", authMiddleware, (req: Request, res: Response) => {
    res.send("Hello World!");
});


router.get("/holidays", authMiddleware,);

router.get("/holidays", authMiddleware, getHoliday);

router.post("/holidays", authMiddleware, postHolidays);

router.put("/holidays", authMiddleware, updateHoliday);

router.delete("/holidays", authMiddleware, deleteHoliday);

export default router;