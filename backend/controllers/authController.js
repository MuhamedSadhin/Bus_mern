const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register
exports.register = async (req, res) => {
  const { name, email, password, role, department, semester } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
      role,
      department,
      semester,
    });
    await user.save();
    const token = generateToken(user);

    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({
        message: "User registered successfully",
        user: { id: user._id, name, email, role },
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true }).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user from cookie
exports.getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.logout = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("token", {
      httpOnly: true, // Secure the cookie from client-side scripts
      sameSite: "lax", // Adjust based on frontend/backend origin configuration
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });

    // Respond with a success message
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
