import { useState } from "react";
import API from "../api";

function Register() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      setMessage("User registered successfully! You can now login.");
      setError("");
      setForm({ username: "", password: "", role: "user" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setMessage("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Register</h1>

        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister} className="auth-btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
