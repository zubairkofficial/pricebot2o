import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Helpers from "../../Config/Helpers";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/"); // Redirect to home page or desired route
    }

    // Display the success message if it exists
    if (successMessage) {
      Helpers.toast("success", successMessage);
      // Clear the success message to prevent it from displaying again
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [navigate, successMessage, location.pathname]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post(`${Helpers.apiUrl}auth/login2`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { accessToken, user } = response.data;

        // localStorage.setItem('accessToken', accessToken);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("services", user.services);
        localStorage.setItem("id", user.id);

        navigate("/", { state: { successMessage: "Login successful" } });
      } else {
        setErrorMessage(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-5 shadow-sm"
        style={{
          width: "400px",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
      >
        <h3
          className="text-center mb-4 text-light"
          style={{ color: "#343a40", fontWeight: "bold", letterSpacing: "1px" }}
        >
          User Login
        </h3>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label m-2 "
              style={{ color: "white", fontWeight: "bold" }}
            >
              E-Mail-Adresse
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-Mail Adresse"
              autoFocus
              style={{ borderRadius: "10px", border: "1px solid #ced4da" }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label m-1"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Passwort
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Passwort"
              style={{ borderRadius: "10px", border: "1px solid #ced4da" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-one w-100 text-center"
            disabled={loading}
            style={{
              borderRadius: "10px",
             
              border: "none",
              fontWeight: "bold",
            }}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
