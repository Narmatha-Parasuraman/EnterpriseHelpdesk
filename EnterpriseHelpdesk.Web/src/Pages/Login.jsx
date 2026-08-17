import { useState } from "react";
//import axios from "axios";
import api from "../services/api";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // try {
        //     const response = await axios.post(
        //         "https://localhost:7096/api/Auth/login",
        //         {
        //             email: email,
        //             password: password
        //         }
        //     );
        try {
            const response = await api.post(
                "/Auth/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log("API Response:", response.data);

            localStorage.setItem("token", response.data);

            onLogin();

            setMessage("Login successful!");
        }
        catch (error) {
            console.error(error);
            setMessage("Invalid email or password.");
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
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px"
                    }}
                >
                    Login
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}
        </div>
    );
}

export default Login;