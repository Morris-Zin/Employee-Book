const express = require("express");
const {
  addEmployee,
  getEmployees,
  editEmployee,
  showEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const ensureAuth = require("../middleware/auth");
const router = express.Router();

router.get("/getEmployees",ensureAuth, getEmployees);
router.get('/showEmployee/:id',ensureAuth, showEmployee);
router.post("/addEmployee",ensureAuth, addEmployee);
router.patch("/editEmployee/:id",ensureAuth, editEmployee);
router.delete("/deleteEmployee/:id",ensureAuth, deleteEmployee);

module.exports = router;
