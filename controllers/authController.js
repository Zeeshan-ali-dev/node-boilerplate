const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { formatResponse } = require("../utils/helperFunctions");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json(formatResponse(false, "User already exists", null));
    }

    const user = await User.create({ name, email, password });

    if (user) {
      return res.status(201).json(
        formatResponse(true, "User created successfully", {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        })
      );
    } else {
      return res
        .status(400)
        .json(formatResponse(false, "Invalid user data", null));
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(formatResponse(false, "Server error", error.message));
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json(
        formatResponse(true, "Login successful", {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        })
      );
    } else {
      return res
        .status(401)
        .json(formatResponse(false, "Invalid email or password", null));
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(formatResponse(false, "Server error", error.message));
  }
};

module.exports = { registerUser, authUser };
