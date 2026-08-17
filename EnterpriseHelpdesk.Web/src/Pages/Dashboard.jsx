import { useEffect, useState } from "react";
import api from "../Services/api";

function Dashboard() {
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const departmentsResponse =
                await api.get("/Departments");

            const employeesResponse =
                await api.get("/Employees");

            const ticketsResponse =
                await api.get("/Tickets");

            console.log(
                "Departments:",
                departmentsResponse.data
            );

            console.log(
                "Employees:",
                employeesResponse.data
            );

            console.log(
                "Tickets:",
                ticketsResponse.data
            );

            setDepartments(departmentsResponse.data);
            setEmployees(employeesResponse.data);
            setTickets(ticketsResponse.data);

        } catch (error) {
            console.error(
                "Dashboard error:",
                error.response?.status,
                error.response?.data
            );

            setError(
                "Unable to load dashboard data."
            );
        }
    };

    // Ticket counts

    const openTickets = tickets.filter(
        ticket => ticket.status === 1
    ).length;

    const inProgressTickets = tickets.filter(
        ticket => ticket.status === 2
    ).length;

    const resolvedTickets = tickets.filter(
        ticket => ticket.status === 3
    ).length;

    const closedTickets = tickets.filter(
        ticket => ticket.status === 4
    ).length;

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

    return (
        <div>

            {/* Page Header */}

            <h1>Dashboard</h1>

            <p style={{ color: "#666" }}>
                Welcome to Enterprise Helpdesk
            </p>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {/* Summary Cards */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(4, 1fr)",
                    gap: "20px",
                    marginTop: "25px"
                }}
            >

                {/* Departments */}

                <div style={cardStyle}>
                    <h3>Departments</h3>

                    <p style={numberStyle}>
                        {departments.length}
                    </p>
                </div>

                {/* Employees */}

                <div style={cardStyle}>
                    <h3>Employees</h3>

                    <p style={numberStyle}>
                        {employees.length}
                    </p>
                </div>

                {/* Total Tickets */}

                <div style={cardStyle}>
                    <h3>Total Tickets</h3>

                    <p style={numberStyle}>
                        {tickets.length}
                    </p>
                </div>

                {/* Open Tickets */}

                <div style={cardStyle}>
                    <h3>Open Tickets</h3>

                    <p style={numberStyle}>
                        {openTickets}
                    </p>
                </div>

            </div>

            {/* Ticket Status */}

            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    marginTop: "30px",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,0.08)"
                }}
            >

                <h2>Ticket Status</h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(4, 1fr)",
                        gap: "15px"
                    }}
                >

                    {/* Open */}

                    <div style={statusCardStyle}>
                        <h3>Open</h3>

                        <p style={statusNumberStyle}>
                            {openTickets}
                        </p>
                    </div>

                    {/* In Progress */}

                    <div style={statusCardStyle}>
                        <h3>In Progress</h3>

                        <p style={statusNumberStyle}>
                            {inProgressTickets}
                        </p>
                    </div>

                    {/* Resolved */}

                    <div style={statusCardStyle}>
                        <h3>Resolved</h3>

                        <p style={statusNumberStyle}>
                            {resolvedTickets}
                        </p>
                    </div>

                    {/* Closed */}

                    <div style={statusCardStyle}>
                        <h3>Closed</h3>

                        <p style={statusNumberStyle}>
                            {closedTickets}
                        </p>
                    </div>

                </div>

            </div>

            {/* Recent Tickets */}

            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    marginTop: "30px",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,0.08)"
                }}
            >

                <h2>Recent Tickets</h2>

                {tickets.length === 0 ? (

                    <p>No tickets available.</p>

                ) : (

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr>

                                <th style={thStyle}>
                                    ID
                                </th>

                                <th style={thStyle}>
                                    Title
                                </th>

                                <th style={thStyle}>
                                    Department
                                </th>

                                <th style={thStyle}>
                                    Priority
                                </th>

                                <th style={thStyle}>
                                    Status
                                </th>

                                <th style={thStyle}>
                                    Assigned To
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {tickets
                                .slice(0, 5)
                                .map(ticket => (

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
                                            {getStatusName(
                                                ticket.status
                                            )}
                                        </td>

                                        <td style={tdStyle}>
                                            {ticket.assignedTo ||
                                                "Unassigned"}
                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
}


/* Summary Card */

const cardStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
        "0 2px 8px rgba(0,0,0,0.08)"
};


/* Large number */

const numberStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "10px 0 0 0"
};


/* Status card */

const statusCardStyle = {
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "8px"
};


/* Status number */

const statusNumberStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    margin: "10px 0 0 0"
};


/* Table header */

const thStyle = {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f8f9fa"
};


/* Table cell */

const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #eee"
};


export default Dashboard;