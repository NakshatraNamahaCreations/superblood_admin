import React, { useState } from "react";

import axios from "axios";
import superbloodlogo from "../assets/superbloodlogo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://api.nakshatranamahacreations.com/api/signin",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        console.log("Login successful:", response.data);
        setSuccess("Login successful!");
        localStorage.setItem("user", JSON.stringify(response.data.data));
        window.location.assign("/user");
      } else {
        setError(response.data.error || "Login failed!");
      }
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response.data);
        setError(err.response.data.error || "An error occurred");
      } else {
        console.error("Request error:", err.message);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-body">
      <div className="customer-login-container">
        <div className="login-card">
          <div className="icon-container">
            <img
              src={superbloodlogo}
              alt="Logo..."
              style={{ width: "100px", height: "100px" }}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">
                <i className="material-icons">email</i>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">
                <i className="material-icons">Password</i>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div
                className="error-message poppins-regular"
                style={{ color: "red" }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="success-message poppins-regular"
                style={{ color: "red" }}
              >
                {success}
              </div>
            )}

            <button type="submit" className="btn-login">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
