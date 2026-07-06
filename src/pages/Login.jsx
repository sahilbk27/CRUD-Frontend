import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login as loginRequest } from "../api/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await loginRequest(username, password);
      login(res.data.token, res.data.username);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data || "Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {error && <div className="banner banner-error">{String(error)}</div>}

        <form onSubmit={handleSubmit}
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
        }}>
        <h1
        style={{
        marginBottom: "30px",
        color: "#fff",
        textAlign: "center",
        }}>
        Login
        </h1>
        <div
          className="form-field full"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
        }}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
              style={{ width: "350px" }}

            />
          </div>

          <div
            className="form-field full"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginBottom: "20px",
            }}
            >
            <label htmlFor="password">Password</label>

            <div
                style={{
                position: "relative",
                width: "350px",
                }}
            >
                <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                    width: "100%",
                    paddingRight: "70px",
                    boxSizing: "border-box",
                }}
                />

                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#2dd4bf",
                    fontWeight: "600",
                    fontSize: "14px",
                }}
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            </div>

          <button
            type="submit"
            className="btn btn-hero-primary"
            style={{ width: "10%", margin: "24px auto 0",display:"block" }}
            disabled={submitting}
          >
            {submitting ? "Signing in..." :"Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
