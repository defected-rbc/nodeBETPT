const { json } = require("body-parser");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "email id already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const data = new User({
      firstName,
      lastName,
      email,
      password: hashpassword,
    });

    await data.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ message: "Data not Found" });
    }
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password invalid" });
    }
    const token = jwt.sign(
      {
        userId: userData._id,
        email: userData.email,
      },
      "Helloworld",
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "login success", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "usernot found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
};
