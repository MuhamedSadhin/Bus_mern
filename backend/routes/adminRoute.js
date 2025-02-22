// const express = require("express");
// const { addcourse, deleteCourse, viewCourse } = require("../controllers/adminController");
// const router = express.Router();


// router.post("/add-courses",addcourse);
// router.post("/delete-course/:id",deleteCourse);
// router.get("/courses", viewCourse);


// module.exports = router;


const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/adminController");

// Add new departments
router.post("/add-departments", departmentController.addDepartment);

// Get all departments
router.get("/view-departments", departmentController.viewDepartments);

// Delete a department by ID
router.delete(
  "/delete-department/:name",
  departmentController.deleteDepartment
);

module.exports = router;
