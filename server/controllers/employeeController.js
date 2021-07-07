const Employee = require("../models/Employee");
const mongoose = require("mongoose");
const { deleteS3Image } = require("../services/aws-services");

const thirtyDays = 2.628e9;

const calculateWhenToPay = (startDate) => {
  const inMilliseconds = new Date(startDate).getTime();
  const dueDate = inMilliseconds + thirtyDays;
  return dueDate;
};

const getEmployees = async (req, res) => {
  try {
    const { userId } = req;
    const { page } = req.query;

    if (!userId)
      return res.json({ response: "You need to sign in to your workshop" });

    const totalEmployees = await Employee.countDocuments({});

    const LIMIT = 8;
    const totalPages = Math.ceil(totalEmployees / LIMIT);

    const startIndex = (Number(page) - 1) * LIMIT;

    const employees = await Employee.find({ active: true, creator: userId })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    if (!employees.length) return res.json({ response: [] });

    res.json({
      response: employees,
      currentPage: +page,
      totalPages,
    });
  } catch (e) {
    console.log(e);
  }
};

const queryEmployees = async (req, res) => {
  try {
    let { searchByName, salaryTags } = req.query;

    const regex = /^[0-9]+$/;

    const isAlphabet = salaryTags.match(regex);

    console.log(isAlphabet);

    if (searchByName || salaryTags.length) {
      let name;

      !searchByName ? (name = "") : (name = new RegExp(searchByName, "i"));

      if (!isAlphabet) {
        const employees = await Employee.find({ name });
        return res.json({ data: employees });
      }

      const employees = await Employee.find({
        $or: [
          {
            "salary.amount": {
              $in: salaryTags.split(",").map((amount) => +amount),
            },
          },
          { name },
        ],
      });

      res.json({ data: employees });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "There was an error in quering employees" });
  }
};

const showEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .json({ response: "No post with that id sorry 🤦‍♂️" });

    const employees = await Employee.find({ active: true, _id: id });
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

    const employee = await new Employee({
      ...postData,
      creator: userId,
    });

    employee.paidDate = calculateWhenToPay(employee.startDate);

    await employee.save();
    const {
      active,
      name,
      phoneNumber,
      startDate,
      salary,
      _id,
      creator,
      imageUrl,
      paidDate,
    } = employee;
    res.json({
      response: {
        active,
        name,
        phoneNumber,
        startDate,
        salary,
        _id,
        creator,
        imageUrl,
        paidDate,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { userId } = req;

    const foundEmployee = await Employee.findById(id);

    if (userId != foundEmployee.creator) {
      return res.json({
        response: "You aren't allow to edit if you are not logged in",
      });
    }

    const employee = req.body.postData;
    const oldProfilePic = foundEmployee.imageUrl;

    if (!employee.imageUrl) {
      employee.imageUrl = foundEmployee.imageUrl;
    } else {
      await deleteS3Image(oldProfilePic);
    }

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
  deleteS3Image(employee.imageUrl);
  await Employee.findByIdAndDelete(id);
  res.send("Successfully deleted the post");
  res.send();
};
module.exports = {
  getEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
  showEmployee,
  queryEmployees,
};
