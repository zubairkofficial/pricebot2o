import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaAngleRight,
} from "react-icons/fa";
import { Link, useNavigate, Outlet } from "react-router-dom";

// Make sure to include your CSS file

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/admin-login", {
      state: { successMessage: "Logout successful" },
    });
  };

  return (
    <div className={`nftmax-smenu ${isVisible ? "" : "nftmax-close"}`}>
      <div className="logo">
        <a href="/admin/home">
          <img
          height={40}
          
            className="nftmax-logo__main"
            src="./../../../assets/123.webp"
            alt="logo"
          />
        </a>

        {/* <div className="logo-two">
          <img src="./../../../assets/images/logo/logo-sort.png" alt="img" />
        </div> */}
        <div className="nftmax__sicon close-icon" onClick={toggleSidebar}>
          <span>
            <svg
              width="16"
              height="40"
              viewBox="0 0 16 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z"
                fill="darkblue"
              ></path>
              <path
                d="M10 15L6 20.0049L10 25.0098"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
        </div>
      </div>

      <div className="admin-menu">
        <div className="admin-menu__one">
          <div className="menu-bar">
            <ul className="sidebar_nav">
              <li className="menu-bar-title  text-white ">
                <span>Menu</span>
              </li>

              <li className="has-child menu-main">
                <Link to="/admin/home" className="active">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="18"
                            height="21"
                            viewBox="0 0 18 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="svg-color-1"
                              d="M0 8.84719C0 7.99027 0.366443 7.17426 1.00691 6.60496L6.34255 1.86217C7.85809 0.515019 10.1419 0.515019 11.6575 1.86217L16.9931 6.60496C17.6336 7.17426 18 7.99027 18 8.84719V17C18 19.2091 16.2091 21 14 21H4C1.79086 21 0 19.2091 0 17V8.84719Z"
                            />
                            <path d="M5 17C5 14.7909 6.79086 13 9 13C11.2091 13 13 14.7909 13 17V21H5V17Z" />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Dashboards </span>
                      </div>
                    </div>

                    <div className="has-child-icon-two">
                      <span>
                        <svg
                          width="6"
                          height="12"
                          viewBox="0 0 6 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.531506 0.414376C0.20806 0.673133 0.155619 1.1451 0.414376 1.46855L4.03956 6.00003L0.414376 10.5315C0.155618 10.855 0.208059 11.3269 0.531506 11.5857C0.854952 11.8444 1.32692 11.792 1.58568 11.4685L5.58568 6.46855C5.80481 6.19464 5.80481 5.80542 5.58568 5.53151L1.58568 0.531506C1.32692 0.20806 0.854953 0.155619 0.531506 0.414376Z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>

              <li className="menu-main">
                <a href="/admin/home">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="14"
                            height="18"
                            viewBox="0 0 14 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              className="svg-color-1"
                              cx="7"
                              cy="14"
                              rx="7"
                              ry="4"
                            />
                            <circle cx="7" cy="4" r="4" />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Benutzer</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="admin-menu__one admin-menu__two">
          <div className="menu-bar">
            <ul className="sidebar_nav">
              <li className="menu-bar-title  text-white">
                <span>Helfen</span>
              </li>

              <li className="menu-main">
                <a href="/admin/home">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="svg-color-1"
                              d="M8.84849 0H7.15151C6.2143 0 5.45454 0.716345 5.45454 1.6C5.45454 2.61121 4.37259 3.25411 3.48444 2.77064L3.39424 2.72153C2.58258 2.27971 1.54473 2.54191 1.07612 3.30717L0.227636 4.69281C-0.240971 5.45808 0.0371217 6.43663 0.848773 6.87846C1.73734 7.36215 1.73734 8.63785 0.848771 9.12154C0.0371203 9.56337 -0.240972 10.5419 0.227635 11.3072L1.07612 12.6928C1.54473 13.4581 2.58258 13.7203 3.39424 13.2785L3.48444 13.2294C4.37259 12.7459 5.45454 13.3888 5.45454 14.4C5.45454 15.2837 6.2143 16 7.15151 16H8.84849C9.7857 16 10.5455 15.2837 10.5455 14.4C10.5455 13.3888 11.6274 12.7459 12.5156 13.2294L12.6058 13.2785C13.4174 13.7203 14.4553 13.4581 14.9239 12.6928L15.7724 11.3072C16.241 10.5419 15.9629 9.56336 15.1512 9.12153C14.2627 8.63784 14.2627 7.36216 15.1512 6.87847C15.9629 6.43664 16.241 5.45809 15.7724 4.69283L14.9239 3.30719C14.4553 2.54192 13.4174 2.27972 12.6058 2.72154L12.5156 2.77065C11.6274 3.25412 10.5455 2.61122 10.5455 1.6C10.5455 0.716344 9.7857 0 8.84849 0Z"
                            />
                            <path d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z" />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text has-child-text-mt">
                        <span> Einstellung </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="admin-menu__one admin-menu__two">
          <div className="menu-bar">
            <ul className="sidebar_nav">
              <li className="menu-bar-title text-white ">
                <span>Helfen</span>
              </li>

              <li className="menu-main">
                <a href="#">
                  <div className="has-child-main" onClick={handleLogout}>
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="21"
                            height="18"
                            viewBox="0 0 21 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17.1464 10.4394C16.8536 10.7323 16.8536 11.2072 17.1464 11.5001C17.4393 11.7929 17.9142 11.7929 18.2071 11.5001L19.5 10.2072C20.1834 9.52375 20.1834 8.41571 19.5 7.73229L18.2071 6.4394C17.9142 6.1465 17.4393 6.1465 17.1464 6.4394C16.8536 6.73229 16.8536 7.20716 17.1464 7.50006L17.8661 8.21973H11.75C11.3358 8.21973 11 8.55551 11 8.96973C11 9.38394 11.3358 9.71973 11.75 9.71973H17.8661L17.1464 10.4394Z"
                            />
                            <path
                              className="svg-color-1"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.75 17.75H12C14.6234 17.75 16.75 15.6234 16.75 13C16.75 12.5858 16.4142 12.25 16 12.25C15.5858 12.25 15.25 12.5858 15.25 13C15.25 14.7949 13.7949 16.25 12 16.25H8.21412C7.34758 17.1733 6.11614 17.75 4.75 17.75ZM8.21412 1.75H12C13.7949 1.75 15.25 3.20507 15.25 5C15.25 5.41421 15.5858 5.75 16 5.75C16.4142 5.75 16.75 5.41421 16.75 5C16.75 2.37665 14.6234 0.25 12 0.25H4.75C6.11614 0.25 7.34758 0.82673 8.21412 1.75Z"
                            />
                            <path
                              className="svg-color-1"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0 5C0 2.37665 2.12665 0.25 4.75 0.25C7.37335 0.25 9.5 2.37665 9.5 5V13C9.5 15.6234 7.37335 17.75 4.75 17.75C2.12665 17.75 0 15.6234 0 13V5Z"
                            />
                          </svg>
                        </span>
                      </div>

                      <div
                        className="has-child-text has-child-text-mt"
                        onClick={handleLogout}
                      >
                        <span> Ausloggen</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
