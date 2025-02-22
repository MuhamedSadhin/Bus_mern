const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  departments: [
    {
      name: { type: String, required: true }, // Department name (e.g., "BCA", "BSc", "BTTM")
    },
  ],
});

module.exports = mongoose.model("Department", DepartmentSchema);
