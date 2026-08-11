import { useState } from "react";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import Employees from "../pages/Employee";
import Tickets from "../pages/Tickets";

function Layout({ onLogout }) {
    const [page, setPage] = useState("dashboard");

    const renderPage = () => {
        switch (page) {
            case "dashboard":
                return <Dashboard />;

            case "departments":
                return <Departments />;

            case "employees":
                return <Employees />;

            case "tickets":
                return <Tickets />;
        }
    };

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                fontFamily: "Arial, sans-serif"
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: "230px",
                    backgroundColor: "#1f2937",
                    color: "white",
                    padding: "25px 15px",
                    boxSizing: "border-box"
                }}
            >
                <h2
                    style={{
                        marginBottom: "30px",
                        textAlign: "center"
                    }}
                >
                    Helpdesk
                </h2>

                {/* Dashboard */}
                <button
                    type="button"
                    onClick={() => setPage("dashboard")}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "10px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Dashboard
                </button>

                {/* Departments */}
                <button
                    type="button"
                    onClick={() => setPage("departments")}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "10px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Departments
                </button>

                {/* Employees */}
                <button
                    type="button"
                    onClick={() => setPage("employees")}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "10px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Employees
                </button>

                {/* Tickets */}
                <button
                    type="button"
                    onClick={() => setPage("tickets")}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "10px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Tickets
                </button>

                {/* Logout */}
                <button
                    type="button"
                    onClick={onLogout}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "30px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: "30px",
                    backgroundColor: "#f5f6fa",
                    boxSizing: "border-box"
                }}
            >
                {renderPage()}
            </main>
        </div>
    );
}


export default Layout;