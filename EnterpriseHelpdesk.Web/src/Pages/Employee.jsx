
import { useEffect, useState } from "react";
import api from "../Services/api";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadEmployees();
        loadDepartments();
    }, []);

    // =========================
    // Load Employees
    // =========================

    const loadEmployees = async () => {
        try {
            const response = await api.get("/Employees");

            setEmployees(response.data);
            setError("");
        }
        catch (error) {
            console.error(error);
            setError("Unable to load employees.");
        }
    };

    // =========================
    // Load Departments
    // =========================

    const loadDepartments = async () => {
        try {
            const response = await api.get("/Departments");

            setDepartments(response.data);
            setError("");
        }
        catch (error) {
            console.error(error);
            setError("Unable to load departments.");
        }
    };

    // =========================
    // Start Edit
    // =========================

    const startEdit = (employee) => {
        setEditingId(employee.id);

        setName(employee.name);
        setEmail(employee.email);
        setPosition(employee.position);
        setDepartmentId(employee.departmentId);

        setMessage("");
        setError("");
    };

    // =========================
    // Add Employee
    // =========================

    const addEmployee = async (e) => {
        e.preventDefault();

        try {
            await api.post("/Employees", {
                name: name,
                email: email,
                position: position,
                departmentId: Number(departmentId)
            });

            setMessage("Employee added successfully!");
            setError("");

            clearForm();

            await loadEmployees();
        }
        catch (error) {
            console.error(error);
            setMessage("");
            setError("Unable to add employee.");
        }
    };

    // =========================
    // Update Employee
    // =========================

    const editEmployee = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/Employees/${editingId} `, {
                name: name,
                email: email,
                position: position,
                departmentId: Number(departmentId)
            });

            setMessage("Employee updated successfully!");
            setError("");

            clearForm();

            await loadEmployees();
        }
        catch (error) {
            console.error(error);
            setMessage("");
            setError("Unable to update employee.");
        }
    };

    // =========================
    // Delete Employee
    // =========================

    const deleteEmployee = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/Employees/${id} `);

            setMessage("Employee deleted successfully!");
            setError("");

            await loadEmployees();
        }
        catch (error) {
            console.error(error);
            setMessage("");
            setError("Unable to delete employee.");
        }
    };

    // =========================
    // Clear Form
    // =========================

    const clearForm = () => {
        setEditingId(null);

        setName("");
        setEmail("");
        setPosition("");
        setDepartmentId("");
    };

    return (
        <div>

            {/* ========================= */}
            {/* Page Heading */}
            {/* ========================= */}

            <h1>Employees</h1>

            <p style={{ color: "#666" }}>
                Manage employees and their departments.
            </p>

            {/* ========================= */}
            {/* Add / Edit Form */}
            {/* ========================= */}

            <div style={formContainerStyle}>

                <h2>
                    {editingId
                        ? "Edit Employee"
                        : "Add Employee"}
                </h2>

                <form
                    onSubmit={
                        editingId
                            ? editEmployee
                            : addEmployee
                    }
                >

                    {/* Name */}

                    <div style={formGroupStyle}>

                        <label>
                            Employee Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                            style={inputStyle}
                        />

                    </div>

                    {/* Email */}

                    <div style={formGroupStyle}>

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            style={inputStyle}
                        />

                    </div>

                    {/* Position */}

                    <div style={formGroupStyle}>

                        <label>
                            Position
                        </label>

                        <input
                            type="text"
                            value={position}
                            onChange={(e) =>
                                setPosition(e.target.value)
                            }
                            required
                            style={inputStyle}
                        />

                    </div>

                    {/* Department */}

                    <div style={formGroupStyle}>

                        <label>
                            Department
                        </label>

                        <select
                            value={departmentId}
                            onChange={(e) =>
                                setDepartmentId(
                                    e.target.value
                                )
                            }
                            required
                            style={inputStyle}
                        >

                            <option value="">
                                Select Department
                            </option>

                            {departments.map(
                                (department) => (

                                    <option
                                        key={
                                            department.id
                                        }
                                        value={
                                            department.id
                                        }
                                    >
                                        {department.name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                    {/* Submit Button */}

                    <button
                        type="submit"
                        style={primaryButtonStyle}
                    >
                        {editingId
                            ? "Update Employee"
                            : "Add Employee"}
                    </button>

                    {/* Cancel Button */}

                    {editingId && (
                        <button
                            type="button"
                            onClick={clearForm}
                            style={cancelButtonStyle}
                        >
                            Cancel
                        </button>
                    )}

                </form>

            </div>

            {/* ========================= */}
            {/* Messages */}
            {/* ========================= */}

            {message && (
                <p style={successMessageStyle}>
                    {message}
                </p>
            )}

            {error && (
                <p style={errorMessageStyle}>
                    {error}
                </p>
            )}

            {/* ========================= */}
            {/* Employee Table */}
            {/* ========================= */}

            <div style={tableContainerStyle}>

                <h2>Employee List</h2>

                {employees.length === 0 ? (

                    <p>
                        No employees found.
                    </p>

                ) : (

                    <div style={{ overflowX: "auto" }}>

                        <table style={tableStyle}>

                            <thead>

                                <tr>

                                    <th style={thStyle}>
                                        ID
                                    </th>

                                    <th style={thStyle}>
                                        Name
                                    </th>

                                    <th style={thStyle}>
                                        Email
                                    </th>

                                    <th style={thStyle}>
                                        Position
                                    </th>

                                    <th style={thStyle}>
                                        Department
                                    </th>

                                    <th style={thStyle}>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {employees.map(
                                    (employee) => (

                                        <tr
                                            key={
                                                employee.id
                                            }
                                        >

                                            <td style={tdStyle}>
                                                {
                                                    employee.id
                                                }
                                            </td>

                                            <td style={tdStyle}>
                                                <strong>
                                                    {
                                                        employee.name
                                                    }
                                                </strong>
                                            </td>

                                            <td style={tdStyle}>
                                                {
                                                    employee.email
                                                }
                                            </td>

                                            <td style={tdStyle}>
                                                {
                                                    employee.position
                                                }
                                            </td>

                                            <td style={tdStyle}>
                                                {
                                                    employee.departmentName ||
                                                    "No department"
                                                }
                                            </td>

                                            <td style={tdStyle}>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startEdit(
                                                            employee
                                                        )
                                                    }
                                                    style={
                                                        editButtonStyle
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteEmployee(
                                                            employee.id
                                                        )
                                                    }
                                                    style={
                                                        deleteButtonStyle
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}


/* ================================= */
/* Styles */
/* ================================= */

const formContainerStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const formGroupStyle = {
    marginBottom: "15px"
};

const inputStyle = {
    display: "block",
    width: "400px",
    maxWidth: "100%",
    padding: "10px",
    marginTop: "6px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box"
};

const primaryButtonStyle = {
    padding: "9px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px"
};

const cancelButtonStyle = {
    padding: "9px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
};

const successMessageStyle = {
    padding: "10px",
    borderRadius: "6px"
};

const errorMessageStyle = {
    padding: "10px",
    borderRadius: "6px"
};

const tableContainerStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse"
};

const thStyle = {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #ddd",
    backgroundColor: "#f8f9fa"
};

const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #eee"
};

const editButtonStyle = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "8px"
};

const deleteButtonStyle = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

export default Employee;

