import { useState } from "react";
import Dashboard from "../Pages/Dashboard";
import Departments from "../Pages/Departments";
import Employees from "../Pages/Employee";
import Tickets from "../Pages/Tickets";

const NAV_ITEMS = [
    { key: "dashboard", label: "Dashboard" },
    { key: "departments", label: "Departments" },
    { key: "employees", label: "Employees" },
    { key: "tickets", label: "Tickets" }
];

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

            default:
                return null;
        }
    };

    return (
        <div className="app">
            <aside className="sidebar">
                <div className="brand">Helpdesk</div>

                <nav className="nav" aria-label="Main">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.key}
                            type="button"
                            className={
                                page === item.key
                                    ? "nav-btn active"
                                    : "nav-btn"
                            }
                            aria-current={
                                page === item.key ? "page" : undefined
                            }
                            onClick={() => setPage(item.key)}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button
                    type="button"
                    className="nav-btn logout"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </aside>

            <main className="content">
                <div className="content-inner">{renderPage()}</div>
            </main>
        </div>
    );
}

export default Layout;
