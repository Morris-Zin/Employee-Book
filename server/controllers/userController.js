const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password } = req.body.userData;
  try {
    if (!name || !email || !password )
      return res.json({ message: "Not valid to register" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_KEY,
      { expiresIn: "7h" }
    );
    res.json({ response: newUser, token });
  } catch (e) {
    console.log(e);
  }
};

const login = async (req, res) => {

  const { email, password } = req.body.userData;

  if (!email || !password )
  return res.json({ message: "Not valid to register" });

  const user = await User.login(email, password);


  try {
    if (user && !user.response) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "7h" }
      );
      res.json({ response: user, token });
    } else {
      res.json({ response: user.response });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  signup,
  login,
};
