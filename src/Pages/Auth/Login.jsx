import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Helpers from "../../Config/Helpers";

const Login = () => {
  const defaultUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(defaultUser);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
          window.location.href = "/admin/dashboard";
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row justify-between min-h-screen">
        <div className="xl:w-full lg:w-88 px-5 xl:pl-12 pt-10">
          <div className="max-w-[450px] m-auto pt-24 pb-16">
            <h2 className="text-2xl font-bold  mb-6 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  className=" text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                  placeholder="Username or email"
                />
                <small className="text-danger">
                  {errors.email ? errors.email[0] : ""}
                </small>
              </div>
              <div className="mb-6 relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type based on state
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className=" text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                  placeholder="Password"
                />
                <div
                  className="absolute top-4 right-4 bottom-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="text-gray-500"
                    />
                </div>
                <small className="text-danger">
                  {errors.password ? errors.password[0] : ""}
                </small>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="py-3.5 flex items-center justify-center  font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg w-full"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
