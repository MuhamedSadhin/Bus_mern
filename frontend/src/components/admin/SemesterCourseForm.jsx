import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AdminDepartmentForm = () => {
  const [departments, setDepartments] = useState([{ name: "" }]);
  const [departmentList, setDepartmentList] = useState([]);

  // Fetch existing departments
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/view-departments"
      );
      setDepartmentList(response.data[0].departments);
      console.log(response.data[0].departments);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  // Handle department input change
  const handleDepartmentChange = (index, value) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index].name = value;
    setDepartments(updatedDepartments);
  };

  // Add a new department field
  const addDepartment = () => {
    setDepartments([...departments, { name: "" }]);
  };

  // Remove a department field before submitting
  const removeDepartment = (index) => {
    const updatedDepartments = departments.filter((_, i) => i !== index);
    setDepartments(updatedDepartments);
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/add-departments", {
        departments,
      });
      alert("Departments added successfully!");
      setDepartments([{ name: "" }]);
      fetchDepartments(); // Refresh department list
    } catch (error) {
      alert("Failed to add departments.");
      console.error(error);
    }
  };

  // Delete department
  const deleteDepartment = async (name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/delete-department/${name}`
      );
      fetchDepartments(); // Refresh department list
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("Failed to delete department.");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Manage Departments</h2>

        {/* Form to Add Departments */}
        <form onSubmit={handleSubmit}>
          {departments.map((department, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Department Name (e.g. BCA, BSc)"
                value={department.name}
                onChange={(e) => handleDepartmentChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              {departments.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDepartment(index)}
                  className="text-red-500 text-sm"
                >
                  ✖
                </button>
              )}
            </div>
          ))}

          {/* Add More Departments */}
          <button
            type="button"
            onClick={addDepartment}
            className="block w-full text-blue-500 text-sm mb-4"
          >
            + Add More Department
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Save Departments
          </button>
        </form>

        {/* List of Existing Departments */}
        <h3 className="text-lg font-bold mt-6">Existing Departments</h3>
        <ul className="mt-2">
          {departmentList.map((dept) => (
            <li
              key={dept._id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>{dept.name}</span>
              <button
                onClick={() => deleteDepartment(dept.name)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDepartmentForm;
