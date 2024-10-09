const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/User");
require("dotenv").config();

/**
 * Handler function for register endpoint
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    throw new Error("Failed registering user");
  }
};

/**
 * Handler function for login endpoint
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.json({ token });
  } catch (err) {
    throw new Error("Failed login");
  }
};

module.exports = { registerUser, loginUser };
