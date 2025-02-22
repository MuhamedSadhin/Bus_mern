const Department = require("../models/Department");

// Add new departments to the existing array
exports.addDepartment = async (req, res) => {
  try {
    const { departments } = req.body;

    if (!departments || !Array.isArray(departments)) {
      return res.status(400).json({ message: "Invalid departments data" });
    }

    // Check if a department document already exists
    let existingDepartment = await Department.findOne();

    if (!existingDepartment) {
      // If no document exists, create a new one
      existingDepartment = await Department.create({ departments });
    } else {
      // Append new departments to the existing array
      await Department.updateOne(
        {},
        { $push: { departments: { $each: departments } } }
      );
    }

    res.status(201).json({
      message: "Departments added successfully!",
      departments: existingDepartment.departments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add departments",
      error: error.message,
    });
  }
};

// Get All Departments
exports.viewDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch departments", error: error.message });
  }
};

// Delete a specific department from the array
exports.deleteDepartment = async (req, res) => {
  try {
    const { name } = req.params; // Get the department name from the URL

    // Check if a department document exists
    const existingDepartment = await Department.findOne();

    if (!existingDepartment) {
      return res.status(404).json({ message: "No departments found" });
    }

    // Remove the specific department by name
    const updatedDepartment = await Department.findOneAndUpdate(
      {},
      { $pull: { departments: { name } } }, // Remove the matching department
      { new: true }
    );

    // If department wasn't found inside the array
    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({
      message: "Department deleted successfully!",
      departments: updatedDepartment.departments, // Return the updated list
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete department",
      error: error.message,
    });
  }
};
