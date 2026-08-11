
import { useEffect, useState } from "react";
import api from "../services/api";

function Departments() {
    const [departments, setDepartments] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadDepartments();
    }, []);

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

    const startEdit = (department) => {
        setEditingId(department.id);
        setName(department.name);
        setDescription(department.description || "");

        setMessage("");
        setError("");
    };

    // =========================
    // Add Department
    // =========================

    const addDepartment = async (e) => {
        e.preventDefault();

        try {
            await api.post("/Departments", {
                name: name,
                description: description
            });

            setMessage("Department added successfully!");
            setError("");

            clearForm();

            await loadDepartments();
        }
        catch (error) {
            console.error(error);
            setMessage("");
            setError("Unable to add department.");
        }
    };

    // =========================
    // Update Department
    // =========================

    const editDepartment = async (e) => {
        e.preventDefault();

        console.log("Editing ID:", editingId);
        console.log("PUT URL:", `/Departments/${editingId}`);
        try {
            await api.put(`/Departments/${editingId} `, {
                id: editingId,
                name: name,
                description: description
            });

            setMessage("Department updated successfully!");
            setError("");

            clearForm();

            await loadDepartments();
        }
        catch (error) {
            console.error(error);
            setMessage("");
            setError("Unable to update department.");
        }
    };

    // =========================
    // Delete Department
    // =========================

    const deleteDepartment = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/Departments/${id} `);

            setMessage("Department deleted successfully!");
            setError("");

            await loadDepartments();
        }
        catch (error) {
            console.error(error);
            setMessage("");
            setError("Unable to delete department.");
        }
    };

    // =========================
    // Clear Form
    // =========================

    const clearForm = () => {
        setEditingId(null);
        setName("");
        setDescription("");
    };

    return (
        <div>

            {/* ========================= */}
            {/* Page Heading */}
            {/* ========================= */}

            <h1>Departments</h1>

            <p style={{ color: "#666" }}>
                Manage departments in the Enterprise Helpdesk system.
            </p>

            {/* ========================= */}
            {/* Add / Edit Form */}
            {/* ========================= */}

            <div style={formContainerStyle}>

                <h2>
                    {editingId
                        ? "Edit Department"
                        : "Add Department"}
                </h2>

                <form
                    onSubmit={
                        editingId
                            ? editDepartment
                            : addDepartment
                    }
                >

                    {/* Department Name */}

                    <div style={formGroupStyle}>

                        <label>
                            Department Name
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

                    {/* Description */}

                    <div style={formGroupStyle}>

                        <label>
                            Description
                        </label>

                        <input
                            type="text"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            style={inputStyle}
                        />

                    </div>

                    {/* Submit Button */}

                    <button
                        type="submit"
                        style={primaryButtonStyle}
                    >
                        {editingId
                            ? "Update Department"
                            : "Add Department"}
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
            {/* Department Table */}
            {/* ========================= */}

            <div style={tableContainerStyle}>

                <h2>Department List</h2>

                {departments.length === 0 ? (

                    <p>
                        No departments found.
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
                                        Department Name
                                    </th>

                                    <th style={thStyle}>
                                        Description
                                    </th>

                                    <th style={thStyle}>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {departments.map(
                                    (department) => (

                                        <tr
                                            key={department.id}
                                        >

                                            <td style={tdStyle}>
                                                {department.id}
                                            </td>

                                            <td style={tdStyle}>
                                                <strong>
                                                    {department.name}
                                                </strong>
                                            </td>

                                            <td style={tdStyle}>
                                                {department.description ||
                                                    "No description"}
                                            </td>

                                            <td style={tdStyle}>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startEdit(
                                                            department
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
                                                        deleteDepartment(
                                                            department.id
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

export default Departments;

