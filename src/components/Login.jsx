import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    // This allows us to store the name when logging in and check that 
    // there is both a username and password.
    const handleLogin = () => {
        const errors = [];
        
        if (username.trim().length < 3) {
            errors.push("Username must be at least 3 characters long.");
        }

        if (password == "") {
            errors.push("Please enter password.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n\n"));
            return;
        }

        localStorage.setItem("username", username);

        navigate("/dashboard");
    };

    return (
        <main className="main__login__container">
            <header className="heading__container">
                <h1>Hackathon</h1>
            </header>
            <section className="login__container">
                <form className="login__details" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        className="input__field"
                        placeholder="Username"
                        id="login__username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input__field"
                        placeholder="Password"
                        id="login__password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="login__button__container">
                    <button className="login__button" onClick={handleLogin}>
                        Login
                    </button>
                </div>
                <div className="register__button__container">
                    <p className="register">
                        New to Hackathon? 
                        <a href="/register" className="register__link"> Sign Up</a>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Login;