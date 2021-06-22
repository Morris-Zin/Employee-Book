const Employee = require("../models/Employee");
const mongoose = require("mongoose");

const getEmployees = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId)
      return res.json({ response: "You need to sign in to your workshop" });
    const employees = await Employee.find(
      { active: true, creator: userId },
      {
        name: 1,
        phoneNumber: 1,
        addedDate: 1,
        startDate: 1,
        salary: 1,
        address: 1,
        creator: 1,
      }
    );
    if (!employees.length) return res.json({ response: [] });
    res.json({ response: employees });
  } catch (e) {
    console.log(e);
  }
};

const showEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ response: "No post with that id sorry 🤦‍♂️" });

    const employees = await Employee.find(
      { active: true, _id: id },
      {
        name: 1,
        phoneNumber: 1,
        addedDate: 1,
        startDate: 1,
        salary: 1,
        address: 1,
      }
    );
    if (!employees.length) return res.redirect("back");

    res.json({ response: employees });
  } catch (e) {
    console.log(e);
  }
};

const addEmployee = async (req, res) => {
  try {
    const { postData } = req.body;
    const { userId } = req;
    if (!postData)
      return res.json({ error: "You are not allowed to create an empty post" });
    const employee = await new Employee({ ...postData, creator: userId });
    await employee.save();
    const {
      active,
      name,
      phoneNumber,
      addedDate,
      startDate,
      salary,
      _id,
      creator,
    } = employee;
    res.json({
      response: {
        active,
        name,
        phoneNumber,
        addedDate,
        startDate,
        salary,
        _id,
        creator,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const { userId } = req;

    const foundEmployee = await Employee.findById(id);
    if (userId != foundEmployee.creator) {
      return res.json({
        response: "You aren't allow to edit if you are not logged in",
      });
    }
    const employee = req.body.postData;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {
      new: true,
    });
    console.log(updatedEmployee);
    res.json({ updatedEmployee });
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const employee = await Employee.findById(id);
  if (userId !== employee.creator)
    return res.json({
      response: "You aren't allow to edit if you are not logged in",
    });

  await Employee.findByIdAndDelete(id);
  res.send("Successfully deleted the post");
};
module.exports = {
  getEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
  showEmployee,
};
