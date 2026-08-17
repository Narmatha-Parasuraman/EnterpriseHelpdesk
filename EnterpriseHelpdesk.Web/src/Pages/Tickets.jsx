import { useEffect, useState } from "react";
import api from "../Services/api";

function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState(1);
    const [assignedTo, setAssignedTo] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadTickets();
        loadDepartments();
        loadEmployees();
    }, []);

    const loadTickets = async () => {
        try {
            const response = await api.get("/Tickets");
            setTickets(response.data);
        } catch (error) {
            console.error(error);
            setError("Unable to load tickets.");
        }
    };

    const loadDepartments = async () => {
        try {
            const response = await api.get("/Departments");
            setDepartments(response.data);
        } catch (error) {
            console.error(error);
            setError("Unable to load departments.");
        }
    };

    const loadEmployees = async () => {
        try {
            const response = await api.get("/Employees");
            setEmployees(response.data);
        } catch (error) {
            console.error(error);
            setError("Unable to load employees.");
        }
    };

    const clearForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setDepartmentId("");
        setPriority("Medium");
        setStatus(1);
        setAssignedTo("");
    };

    const addTicket = async (e) => {
        e.preventDefault();

        try {
            await api.post("/Tickets", {
                title,
                description,
                departmentId: Number(departmentId),
                priority
            });

            setMessage("Ticket created successfully!");
            clearForm();

            await loadTickets();
        } catch (error) {
            console.error(error);
            setMessage("Unable to create ticket.");
        }
    };

    const startEdit = (ticket) => {
        setEditingId(ticket.id);
        setTitle(ticket.title);
        setDescription(ticket.description);
        setDepartmentId(ticket.departmentId);
        setPriority(ticket.priority);
        setStatus(ticket.status);
        setAssignedTo(ticket.assignedTo || "");
    };

    const updateTicket = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/Tickets/${editingId}`, {
                title,
                description,
                status: Number(status),
                priority,
                assignedTo: assignedTo || null
            });

            setMessage("Ticket updated successfully!");
            clearForm();

            await loadTickets();
        } catch (error) {
            console.error(error);
            setMessage("Unable to update ticket.");
        }
    };

    const deleteTicket = async (id) => {
        if (!window.confirm("Are you sure you want to delete this ticket?")) {
            return;
        }

        try {
            await api.delete(`/Tickets/${id}`);

            setMessage("Ticket deleted successfully!");
            await loadTickets();
        } catch (error) {
            console.error(error);
            setMessage("Unable to delete ticket.");
        }
    };

    const getStatusName = (status) => {
        switch (status) {
            case 1:
                return "Open";
            case 2:
                return "In Progress";
            case 3:
                return "Resolved";
            case 4:
                return "Closed";
            default:
                return "Unknown";
        }
    };

    const filteredTickets = tickets.filter((ticket) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            ticket.title.toLowerCase().includes(searchText) ||
            ticket.description.toLowerCase().includes(searchText) ||
            (ticket.departmentName || "")
                .toLowerCase()
                .includes(searchText) ||
            (ticket.assignedTo || "")
                .toLowerCase()
                .includes(searchText);

        const matchesStatus =
            statusFilter === "All" ||
            ticket.status === Number(statusFilter);

        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <h1>Tickets</h1>

            <p style={{ color: "#666" }}>
                Create, assign and manage helpdesk tickets.
            </p>

            {/* Ticket Form */}
            <div
                style={{
                    backgroundColor: "white",
                    padding: "25px",
                    borderRadius: "10px",
                    marginBottom: "30px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                }}
            >
                <h2>
                    {editingId ? "Edit Ticket" : "Create Ticket"}
                </h2>

                <form
                    onSubmit={
                        editingId ? updateTicket : addTicket
                    }
                >
                    <div style={{ marginBottom: "12px" }}>
                        <label>Title</label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                            style={{
                                display: "block",
                                width: "400px",
                                padding: "8px",
                                marginTop: "5px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <label>Description</label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                            rows="4"
                            style={{
                                display: "block",
                                width: "400px",
                                padding: "8px",
                                marginTop: "5px"
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <label>Department</label>

                        <select
                            value={departmentId}
                            onChange={(e) =>
                                setDepartmentId(e.target.value)
                            }
                            required
                            disabled={!!editingId}
                            style={{
                                display: "block",
                                width: "420px",
                                padding: "8px",
                                marginTop: "5px"
                            }}
                        >
                            <option value="">
                                Select Department
                            </option>

                            {departments.map((department) => (
                                <option
                                    key={department.id}
                                    value={department.id}
                                >
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        <label>Priority</label>

                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)
                            }
                            style={{
                                display: "block",
                                width: "420px",
                                padding: "8px",
                                marginTop: "5px"
                            }}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">
                                Critical
                            </option>
                        </select>
                    </div>

                    {editingId && (
                        <>
                            <div style={{ marginBottom: "12px" }}>
                                <label>Status</label>

                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(
                                            Number(e.target.value)
                                        )
                                    }
                                    style={{
                                        display: "block",
                                        width: "420px",
                                        padding: "8px",
                                        marginTop: "5px"
                                    }}
                                >
                                    <option value={1}>Open</option>
                                    <option value={2}>
                                        In Progress
                                    </option>
                                    <option value={3}>
                                        Resolved
                                    </option>
                                    <option value={4}>Closed</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label>Assign To</label>

                                <select
                                    value={assignedTo}
                                    onChange={(e) =>
                                        setAssignedTo(e.target.value)
                                    }
                                    style={{
                                        display: "block",
                                        width: "420px",
                                        padding: "8px",
                                        marginTop: "5px"
                                    }}
                                >
                                    <option value="">
                                        Unassigned
                                    </option>

                                    {employees.map((employee) => (
                                        <option
                                            key={employee.id}
                                            value={employee.email}
                                        >
                                            {employee.name} -{" "}
                                            {employee.email}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <button type="submit">
                        {editingId
                            ? "Update Ticket"
                            : "Create Ticket"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={clearForm}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancel
                        </button>
                    )}
                </form>

                {message && <p>{message}</p>}
            </div>

            {/* Search and Filter */}
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "20px"
                }}
            >
                <input
                    type="text"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        width: "300px"
                    }}
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        width: "180px"
                    }}
                >
                    <option value="All">All Status</option>
                    <option value="1">Open</option>
                    <option value="2">In Progress</option>
                    <option value="3">Resolved</option>
                    <option value="4">Closed</option>
                </select>
            </div>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {/* Ticket Table */}
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Title</th>
                            <th style={thStyle}>Department</th>
                            <th style={thStyle}>Priority</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Assigned To</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTickets.map((ticket) => (
                            <tr key={ticket.id}>
                                <td style={tdStyle}>
                                    {ticket.id}
                                </td>

                                <td style={tdStyle}>
                                    {ticket.title}
                                </td>

                                <td style={tdStyle}>
                                    {ticket.departmentName ||
                                        "No department"}
                                </td>

                                <td style={tdStyle}>
                                    {ticket.priority}
                                </td>

                                <td style={tdStyle}>
                                    {getStatusName(ticket.status)}
                                </td>

                                <td style={tdStyle}>
                                    {ticket.assignedTo ||
                                        "Unassigned"}
                                </td>

                                <td style={tdStyle}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            startEdit(ticket)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteTicket(ticket.id)
                                        }
                                        style={{
                                            marginLeft: "8px"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredTickets.length === 0 && (
                    <p
                        style={{
                            padding: "20px",
                            textAlign: "center"
                        }}
                    >
                        No tickets found.
                    </p>
                )}
            </div>
        </div>
    );
}

const thStyle = {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f8f9fa"
};

const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #eee"
};

export default Tickets;