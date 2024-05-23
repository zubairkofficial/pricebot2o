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
        <a href="index-2.html">
          <img
            className="nftmax-logo__main"
            src="./../../../assets/images/logo/Logo.svg"
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
                fill="#22C55E"
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
              <li className="menu-bar-title">
                <span>Menu</span>
              </li>

              <li className="has-child menu-main">
                <a href="#" className="active">
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
                </a>

             
              </li>

              <li className="menu-main">
                <a href="transaction.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="svg-color-1"
                              d="M18 16V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H14C16.2091 20 18 18.2091 18 16Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z"
                            />
                            <path d="M11 0H7C5.89543 0 5 0.895431 5 2C5 3.10457 5.89543 4 7 4H11C12.1046 4 13 3.10457 13 2C13 0.895431 12.1046 0 11 0Z" />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Transaction </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="statistics.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="svg-color-1"
                              d="M18 11C18 15.9706 13.9706 20 9 20C4.02944 20 0 15.9706 0 11C0 6.02944 4.02944 2 9 2C13.9706 2 18 6.02944 18 11Z"
                            />
                            <path d="M19.8025 8.01277C19.0104 4.08419 15.9158 0.989557 11.9872 0.197453C10.9045 -0.0208635 10 0.89543 10 2V8C10 9.10457 10.8954 10 12 10H18C19.1046 10 20.0209 9.09555 19.8025 8.01277Z" />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Statistics </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="analytics.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="svg-color-1"
                              d="M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4Z"
                            />
                            <path d="M14 9C12.8954 9 12 9.89543 12 11L12 13C12 14.1046 12.8954 15 14 15C15.1046 15 16 14.1046 16 13V11C16 9.89543 15.1046 9 14 9Z" />
                            <path d="M6 5C4.89543 5 4 5.89543 4 7L4 13C4 14.1046 4.89543 15 6 15C7.10457 15 8 14.1046 8 13L8 7C8 5.89543 7.10457 5 6 5Z" />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Analytics </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="my-wallet.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="svg-color-1"
                              d="M20 4C20 1.79086 18.2091 0 16 0H4C1.79086 0 0 1.79086 0 4V14C0 16.2091 1.79086 18 4 18H16C18.2091 18 20 16.2091 20 14V4Z"
                            />
                            <path d="M6 9C6 7.34315 4.65685 6 3 6H0V12H3C4.65685 12 6 10.6569 6 9Z" />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> My Wallet </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="message.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 18C9.38503 18 10.5633 17.1652 11 16H5C5.43668 17.1652 6.61497 18 8 18Z" />
                            <path
                              className="svg-color-1"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.6896 0.754028C9.27403 0.291157 8.67102 0 8 0C6.74634 0 5.73005 1.01629 5.73005 2.26995V2.37366C3.58766 3.10719 2.0016 4.85063 1.76046 6.97519L1.31328 10.9153C1.23274 11.6249 0.933441 12.3016 0.447786 12.8721C-0.649243 14.1609 0.394434 16 2.22281 16H13.7772C15.6056 16 16.6492 14.1609 15.5522 12.8721C15.0666 12.3016 14.7673 11.6249 14.6867 10.9153L14.2395 6.97519C14.2333 6.92024 14.2262 6.86556 14.2181 6.81113C13.8341 6.93379 13.4248 7 13 7C10.7909 7 9 5.20914 9 3C9 2.16744 9.25436 1.3943 9.6896 0.754028Z"
                            />
                            <circle cx="13" cy="3" r="3" />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Inbox </span>
                      </div>

                      <span className="has-child-profile-1">
                        <svg
                          width="10"
                          height="11"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.879751 10.0038L3.16823 9.6766C3.49833 9.6294 3.80424 9.47629 4.04003 9.24027L8.45886 4.81712C8.45886 4.81712 7.36911 4.81712 6.27936 3.72631C5.18961 2.63549 5.18961 1.54468 5.18961 1.54468L0.770776 5.96783C0.534986 6.20385 0.382033 6.51005 0.334876 6.84048L0.00795056 9.13119C-0.0646994 9.64024 0.371201 10.0766 0.879751 10.0038Z"
                            fill="#1A202C"
                          />
                          <path
                            opacity="0.4"
                            d="M9.54846 1.5446L8.45871 0.453784C7.85685 -0.148657 6.88106 -0.148657 6.27921 0.453784L5.18945 1.5446C5.18945 1.5446 5.18945 2.63542 6.2792 3.72623C7.36895 4.81705 8.4587 4.81705 8.4587 4.81705L9.54846 3.72623C10.1503 3.12379 10.1503 2.14704 9.54846 1.5446Z"
                            fill="#1A202C"
                          />
                        </svg>
                      </span>
                      <span className="has-child-profile-2">
                        <img
                          src="./../../../assets/images/profile-2.png"
                          alt="profile"
                        />
                      </span>
                      <span className="has-child-profile-3"> 5 </span>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="integrations.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.57617 3.61499C1.57617 2.51042 2.4716 1.61499 3.57617 1.61499H8.49951C9.60408 1.61499 10.4995 2.51042 10.4995 3.61499V8.53833C10.4995 9.64289 9.60408 10.5383 8.49951 10.5383H3.57617C2.4716 10.5383 1.57617 9.64289 1.57617 8.53832V3.61499Z"
                              className="svg-color-1"
                            />
                            <path
                              d="M13.5 15.5383C13.5 14.4338 14.3954 13.5383 15.5 13.5383H20.4233C21.5279 13.5383 22.4233 14.4338 22.4233 15.5383V20.4617C22.4233 21.5662 21.5279 22.4617 20.4233 22.4617H15.5C14.3954 22.4617 13.5 21.5662 13.5 20.4617V15.5383Z"
                              className="svg-color-1"
                            />
                            <circle
                              cx="6.03784"
                              cy="18"
                              r="4.46166"
                              className="svg-color-1"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M18 2C18.4142 2 18.75 2.33579 18.75 2.75V5.25H21.25C21.6642 5.25 22 5.58579 22 6C22 6.41421 21.6642 6.75 21.25 6.75H18.75V9.25C18.75 9.66421 18.4142 10 18 10C17.5858 10 17.25 9.66421 17.25 9.25V6.75H14.75C14.3358 6.75 14 6.41421 14 6C14 5.58579 14.3358 5.25 14.75 5.25H17.25V2.75C17.25 2.33579 17.5858 2 18 2Z"
                            />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Integrations</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="user.html">
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
                        <span> User</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="callender.html">
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
                              d="M0 6.5C0 4.29086 1.79086 2.5 4 2.5H14C16.2091 2.5 18 4.29086 18 6.5V8V17C18 19.2091 16.2091 21 14 21H4C1.79086 21 0 19.2091 0 17V8V6.5Z"
                            ></path>
                            <path
                              d="M14 2.5H4C1.79086 2.5 0 4.29086 0 6.5V8H18V6.5C18 4.29086 16.2091 2.5 14 2.5Z"
                              className="path-2"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5 0.25C5.41421 0.25 5.75 0.585786 5.75 1V4C5.75 4.41421 5.41421 4.75 5 4.75C4.58579 4.75 4.25 4.41421 4.25 4V1C4.25 0.585786 4.58579 0.25 5 0.25ZM13 0.25C13.4142 0.25 13.75 0.585786 13.75 1V4C13.75 4.41421 13.4142 4.75 13 4.75C12.5858 4.75 12.25 4.41421 12.25 4V1C12.25 0.585786 12.5858 0.25 13 0.25Z"
                              className="svg-color-1"
                            ></path>
                            <circle cx="9" cy="14" r="1"></circle>
                            <circle
                              cx="13"
                              cy="14"
                              r="1"
                              className="path-2"
                            ></circle>
                            <circle
                              cx="5"
                              cy="14"
                              r="1"
                              className="path-2"
                            ></circle>
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Calender</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="history.html">
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
                              d="M17.5 12.5C17.5 17.1944 13.6944 21 9 21C4.30558 21 0.5 17.1944 0.5 12.5C0.5 7.80558 4.30558 4 9 4C13.6944 4 17.5 7.80558 17.5 12.5Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.00019 1.75C8.02986 1.75 7.09221 1.88462 6.20431 2.13575C5.80573 2.24849 5.39124 2.01676 5.2785 1.61818C5.16577 1.21961 5.39749 0.805108 5.79607 0.692376C6.8155 0.404046 7.89048 0.25 9.00019 0.25C10.1099 0.25 11.1849 0.404046 12.2043 0.692376C12.6029 0.805108 12.8346 1.21961 12.7219 1.61818C12.6091 2.01676 12.1947 2.24849 11.7961 2.13575C10.9082 1.88462 9.97052 1.75 9.00019 1.75Z"
                            />
                            <path d="M11 13C11 14.1046 10.1046 15 9 15C7.89543 15 7 14.1046 7 13C7 11.8954 7.89543 11 9 11C10.1046 11 11 11.8954 11 13Z" />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9 7.25C9.41421 7.25 9.75 7.58579 9.75 8V12C9.75 12.4142 9.41421 12.75 9 12.75C8.58579 12.75 8.25 12.4142 8.25 12V8C8.25 7.58579 8.58579 7.25 9 7.25Z"
                            />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> History</span>
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
              <li className="menu-bar-title">
                <span>Help</span>
              </li>
              <li className="menu-main">
                <a href="support-ticket.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon mt-1">
                        <span>
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="svg-color-1"
                              d="M5 2V11C5 12.1046 5.89543 13 7 13H18C19.1046 13 20 12.1046 20 11V2C20 0.895431 19.1046 0 18 0H7C5.89543 0 5 0.89543 5 2Z"
                              fill="#1A202C"
                            />
                            <path d="M0 15C0 13.8954 0.895431 13 2 13H2.17157C2.70201 13 3.21071 13.2107 3.58579 13.5858C4.36683 14.3668 5.63317 14.3668 6.41421 13.5858C6.78929 13.2107 7.29799 13 7.82843 13H8C9.10457 13 10 13.8954 10 15V16C10 17.1046 9.10457 18 8 18H2C0.89543 18 0 17.1046 0 16V15Z" />
                            <path d="M7.5 9.5C7.5 10.8807 6.38071 12 5 12C3.61929 12 2.5 10.8807 2.5 9.5C2.5 8.11929 3.61929 7 5 7C6.38071 7 7.5 8.11929 7.5 9.5Z" />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.25 4.5C8.25 4.08579 8.58579 3.75 9 3.75L16 3.75C16.4142 3.75 16.75 4.08579 16.75 4.5C16.75 4.91421 16.4142 5.25 16 5.25L9 5.25C8.58579 5.25 8.25 4.91421 8.25 4.5Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.25 8.5C11.25 8.08579 11.5858 7.75 12 7.75L16 7.75C16.4142 7.75 16.75 8.08579 16.75 8.5C16.75 8.91421 16.4142 9.25 16 9.25L12 9.25C11.5858 9.25 11.25 8.91421 11.25 8.5Z"
                            />
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Support </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="setting.html">
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
                        <span> Setting </span>
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
              <li className="menu-bar-title">
                <span>Help</span>
              </li>
              <li className="menu-main">
                <a href="sign-in.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon mt-1">
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
                            ></ellipse>
                            <circle cx="7" cy="4" r="4"></circle>
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Signin </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li className="menu-main">
                <a href="sign-up.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon mt-1">
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
                            ></ellipse>
                            <circle cx="7" cy="4" r="4"></circle>
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text">
                        <span> Signup </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="coming-soon.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="18"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.4 17.2C19.8833 19.1777 18.4721 22 16 22L8 22C5.52786 22 4.11672 19.1777 5.6 17.2L8.15 13.8C8.95 12.7333 8.95 11.2667 8.15 10.2L5.6 6.8C4.11672 4.82229 5.52787 2 8 2L16 2C18.4721 2 19.8833 4.82229 18.4 6.8L15.85 10.2C15.05 11.2667 15.05 12.7333 15.85 13.8L18.4 17.2Z"
                              className="svg-color-1"
                            ></path>
                            <path d="M12.7809 9.02391C12.3805 9.52432 11.6195 9.52432 11.2191 9.02391L9.29976 6.6247C8.77595 5.96993 9.24212 5 10.0806 5L13.9194 5C14.7579 5 15.2241 5.96993 14.7002 6.6247L12.7809 9.02391Z"></path>
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text has-child-text-mt">
                        <span> Coming Soon </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>

              <li className="menu-main">
                <a href="404.html">
                  <div className="has-child-main">
                    <div className="has-child-main-inner">
                      <div className="has-child-icon">
                        <span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="10"
                              className="svg-color-1"
                            ></circle>
                            <path d="M9 15C9 14.4477 9.44772 14 10 14C10.5523 14 11 14.4477 11 15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z"></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10 12.75C9.58579 12.75 9.25 12.4142 9.25 12L9.25 5C9.25 4.58579 9.58579 4.25 10 4.25C10.4142 4.25 10.75 4.58579 10.75 5L10.75 12C10.75 12.4142 10.4142 12.75 10 12.75Z"
                            ></path>
                          </svg>
                        </span>
                      </div>

                      <div className="has-child-text has-child-text-mt">
                        <span> 404</span>
                      </div>
                    </div>
                  </div>
                </a>
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

                      <div className="has-child-text has-child-text-mt">
                        <span> Logout</span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
