import { useState } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const defaultUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(defaultUser);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${Helpers.apiUrl}auth/login`, user)
      .then((response) => {
        Helpers.toast("success", response.data.message);
        Helpers.setItem("user", response.data.user, true);
        Helpers.setItem("token", response.data.token);
        const loginTimestamp = new Date().getTime();
        Helpers.setItem("loginTimestamp", loginTimestamp);
        if (response.data.user.user_type == 1) {
          window.location.href = "/admin/home";
        } else {
          window.location.href = "/";
        }
        setIsLoading(false);
      })
      .catch((error) => {
        Helpers.toast("error", error.response.data.message);
        setErrors(error.response.data.errors || {});
        setIsLoading(false);
      });
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
        className="text-center mb-4 text-dark"
        style={{ color: "#343a40", fontWeight: "bold", letterSpacing: "1px" }}
      >Login
      </h3>
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
            value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
            required
            placeholder="E-Mail Adresse"
            autoFocus
            style={{ borderRadius: "10px", border: "1px solid #ced4da" }}
          />
                  <small className="text-danger">
                    {errors.email ? errors.email[0] : ""}
                  </small>
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
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            required
            placeholder="Passwort"
            style={{ borderRadius: "10px", border: "1px solid #ced4da" }}
          />
                  <small className="text-danger">
                    {errors.password ? errors.password[0] : ""}
                  </small>
        </div>
        <button
          type="submit"
          className="btn btn-one w-100 text-center"
          disabled={isLoading}
          style={{
            borderRadius: "10px",
            border: "none",
            fontWeight: "bold",
          }}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
        </button>
      </form>
    </div>
  </div>
  );
};

export default Login;
