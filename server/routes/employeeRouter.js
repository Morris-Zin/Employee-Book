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
router.get("/showEmployee/:id", ensureAuth, showEmployee);
router.post("/addEmployee", ensureAuth, addEmployee);
router.patch("/editEmployee/:id", ensureAuth, editEmployee);
router.delete("/deleteEmployee/:id", ensureAuth, deleteEmployee);

//Upload employee images
router.post("/uploadEmployeeImages", ensureAuth, async (req, res) => {
  getSignedRequest(req, res, EMPLOYEE_BUCKET);
});

module.exports = router;
