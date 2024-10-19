const router = require("express").Router();
const coursesCtrl = require("../controllers/coursesCtrl");
const auth = require("../middleware/auth");
const admin = require("../middleware/authAdmin");
const isTeacher = require("../middleware/isTeacher");

router.get("/topic", coursesCtrl.getallcoursesbycategory);

router.get("/pobular", coursesCtrl.getcoursesbypob);
router.get("/searched", coursesCtrl.getcoursesSearched);
router.get("/Mycourses", auth, isTeacher, coursesCtrl.getMycourses);

router.get("/Allcourses", auth, admin, coursesCtrl.getAllcourses);
router.get("/checkmembership", auth, coursesCtrl.studentMembership);

router.get("/Coursespurshased", auth, coursesCtrl.getcoursespurshased);

router.get("/subcategory/:Topic", coursesCtrl.getsubcategorys);
router.post("/rate/:Topic", coursesCtrl.getcoursesbyrate);
router.post("/price/:Topic", coursesCtrl.getcoursesbyprice);

router.get("/subcg/:subcg", coursesCtrl.getcoursesbysubcg);

router.post("/createreview/:id", auth, coursesCtrl.createcoursereview);

router.get("/details/:id", coursesCtrl.getcoursedetails);
router.put("/updatecourse/:id", coursesCtrl.updateCourse);
router.delete("/deletecourse/:id", coursesCtrl.deleteCourse);
router.post("/addcourse", auth, isTeacher, coursesCtrl.addCourse);

module.exports = router;
