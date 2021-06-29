const express = require("express");
const {
  addEmployee,
  getEmployees,
  editEmployee,
  showEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const ensureAuth = require("../middleware/auth");
const { getSignedRequest, EMPLOYEE_BUCKET } = require("../services/aws-services");
const router = express.Router();

router.get("/getEmployees", ensureAuth, getEmployees);

//Upload employee images
router.post("/uploadEmployeeImages", ensureAuth, async (req, res) => {
  console.log("I run for image uplaod")
  getSignedRequest(req, res, EMPLOYEE_BUCKET);
});

router.get("/showEmployee/:id", ensureAuth, showEmployee);
router.post("/addEmployee", ensureAuth, addEmployee);
router.patch("/editEmployee/:id", ensureAuth, editEmployee);
router.delete("/deleteEmployee/:id", ensureAuth, deleteEmployee);

module.exports = router;
