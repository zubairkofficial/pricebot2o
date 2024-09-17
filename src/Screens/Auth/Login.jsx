import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Helpers from "../../Config/Helpers";

const Login = () => {
  const defaultUser = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState({email: "", password: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    console.log("New value:", e.currentTarget.value);
    setUser(oldData => ({ ...oldData, email: e.target.value })); // Update state correctly
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${Helpers.apiUrl}auth/login`, user)
      .then((response) => {
        Helpers.toast("success", Helpers.getTranslationValue("login_msg"));
        Helpers.setItem("user", response.data.user, true);
        Helpers.setItem("token", response.data.token);
        Helpers.setItem(
          "is_user_org",
          response.data.user.is_user_organizational
        );
        localStorage.removeItem("translationData");
        const loginTimestamp = new Date().getTime();
        Helpers.setItem("loginTimestamp", loginTimestamp);
        Helpers.setItem("is_user_org", response.data.user.is_user_organizational);
       // Helpers.setItem("translationData", response.data.translationData, true);
        if (response.data.user.user_type == 1) {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorData = error.response.data.errors || {
            message: Helpers.getTranslationValue(error.response.data.message),
          };
          setErrors(errorData);
        } else {
          setErrors({
            message: Helpers.getTranslationValue("unexpected_error"),
          });
        }
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
            <h2 className="text-2xl font-bold mb-6 text-center">
              {Helpers.getTranslationValue("Login")}
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  value={user.email}
                   onKeyDown={(e) => console.log(e.key)}
                  onChange={e => setUser(oldData => ({ ...oldData, email: e.target.value }))}
                  placeholder={Helpers.getTranslationValue("Email")}
                  className="text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
                />
                {errors.email && (
                  <small className="text-error-200">{errors.email[0]}</small>
                )}
              </div>
              <div className="mb-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder={Helpers.getTranslationValue("Password")}
                  className="text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-base"
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
                {errors.password && (
                  <small className="text-error-200">{errors.password[0]}</small>
                )}
              </div>

              {errors.message && (
                <div className="mb-4 text-error-200 text-center">
                  {errors.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="py-3.5 flex text-white items-center justify-center font-bold bg-success-300 hover:bg-success-300 transition-all rounded-lg w-full"
              >
                {Helpers.getTranslationValue(
                  isLoading ? "Is_loading" : "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
