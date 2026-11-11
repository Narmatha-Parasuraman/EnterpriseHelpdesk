import { useEffect, useState } from "react";
import api from "../Services/api";

const DEMO_EMAIL = "demo.employee@helpdesk.com";
const DEMO_PASSWORD = "Helpdesk@12345";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry only when the server is down or waking up (5xx or no response).
async function postWithRetry(url, data, tries = 3) {
    for (let i = 0; i < tries; i++) {
        try {
            return await api.post(url, data, { timeout: 60000 });
        } catch (error) {
            const status = error.response?.status;
            if (status && status < 500) throw error;   // wrong password etc.
            if (i === tries - 1) throw error;
            await sleep(10000);                        // wait while the database wakes
        }
    }
}

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const fillDemo = () => {
        setEmail(DEMO_EMAIL);
        setPassword(DEMO_PASSWORD);
        setMessage("");
    };

    // Wake the API and database while the visitor reads the page.
    useEffect(() => {
        api.get("/health").catch(() => { });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("Signing in... the server may take up to a minute to wake up.");

        try {
            const response = await postWithRetry("/Auth/login", { email, password });

            localStorage.setItem("token", response.data);
            onLogin();
            setMessage("Login successful!");
        } catch (error) {
            console.error(error);
            const status = error.response?.status;
            setMessage(
                status && status < 500
                    ? "Invalid email or password."
                    : "The server is still waking up. Please try again in a minute."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: "400px",
            margin: "100px auto",
            padding: "30px",
            border: "1px solid #ddd",
            borderRadius: "10px"
        }}>
            <h2>Enterprise Helpdesk</h2>

            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", padding: "10px" }}
                >
                    {loading ? "Please wait..." : "Login"}
                </button>
            </form>

            <div style={{
                marginTop: "20px",
                padding: "12px",
                background: "#f5f7fa",
                borderRadius: "8px",
                fontSize: "14px"
            }}>
                <strong>Demo account (Employee)</strong>
                <div>Email: {DEMO_EMAIL}</div>
                <div>Password: {DEMO_PASSWORD}</div>
                <button
                    type="button"
                    onClick={fillDemo}
                    style={{ marginTop: "8px", width: "100%", padding: "8px" }}
                >
                    AutoFill demo login
                </button>
                <div style={{ marginTop: "8px", color: "#666" }}>
                    The first sign-in can take up to a minute while the server wakes up.
                </div>
            </div>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;