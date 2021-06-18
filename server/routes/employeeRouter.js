const express = require("express");
const {
  addEmployee,
  getEmployees,
  editEmployee,
  showEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const router = express.Router();

router.get("/getEmployees", getEmployees);
router.get('/showEmployee/:id', showEmployee);
router.post("/addEmployee", addEmployee);
router.patch("/editEmployee/:id", editEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);

module.exports = router;
