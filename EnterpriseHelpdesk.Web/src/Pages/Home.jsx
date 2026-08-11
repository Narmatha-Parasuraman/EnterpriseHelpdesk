import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
    const [departmentCount, setDepartmentCount] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const departmentsResponse = await api.get("/Departments");
            const employeesResponse = await api.get("/Employees");

            setDepartmentCount(departmentsResponse.data.length);
            setEmployeeCount(employeesResponse.data.length);
        }
        catch (error) {
            console.error("Unable to load dashboard data.", error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>

            <p style={{ color: "#666" }}>
                Welcome to Enterprise Helpdesk
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >
                {/* Departments */}
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "25px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}
                >
                    <h3>Departments</h3>

                    <p
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            margin: "10px 0"
                        }}
                    >
                        {departmentCount}
                    </p>

                    <p style={{ color: "#666" }}>
                        Total departments
                    </p>
                </div>

                {/* Employees */}
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "25px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}
                >
                    <h3>Employees</h3>

                    <p
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            margin: "10px 0"
                        }}
                    >
                        {employeeCount}
                    </p>

                    <p style={{ color: "#666" }}>
                        Total employees
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;