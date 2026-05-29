const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    res.json({ users });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      type,
      username,
      password,
      address,
      isActive,
    } = req.body;

    // Check all required fields
    if (
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !contactNumber ||
      !email ||
      !username ||
      !password ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      type,
      username,
      password: hashedPassword,
      address,
      isActive: isActive ?? true,
    });

    const safeUser = await User.findById(user._id).select("-password");
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.type !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const allowedFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "contactNumber",
      "email",
      "type",
      "username",
      "address",
      "isActive",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Only admin can delete
    if (req.user.type !== "admin") {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    // Generic login error
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Inactive account
    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is inactive",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Block viewer accounts
    if (user.type === "viewer") {
      return res.status(403).json({
        message: "Viewer accounts cannot access the dashboard.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        type: user.type,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    // Fetch user without password
    const safeUser = await User.findById(user._id).select("-password");

    res.json({
      message: "Login successful",
      token,
      expiresIn: 3600,
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
