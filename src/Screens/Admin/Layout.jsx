import axios from "axios";
import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import { useHeader } from "../../Components/HeaderContext";

const Layout = () => {
  const { headerData } = useHeader();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear the access token from local storage
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${Helpers.apiUrl}logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.clear();
        Helpers.toast("success", response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full layout-wrapper active">
      <div className="w-full flex relative">
        <aside className="block xl:block sm:hidden sidebar-wrapper w-[308px] fixed top-0 bg-white h-full z-30">
          <div className="sidebar-header relative border-r border-b   border-r-[#F7F7F7] border-b-[#F7F7F7] w-full h-[108px] flex items-center pl-[50px] z-30">
            <Link to="/admin/dashboard">
              <img
                src="/assets/images/logo/logo-color.svg"
                className="block"
                alt="logo"
              />
            </Link>
            <button
              type="button"
              className="drawer-btn absolute right-0 top-auto text-white"
              title="Ctrl+b"
            >
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
                    fill="#567BD9"
                  />
                  <path
                    d="M10 15L6 20.0049L10 25.0098"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div className="sidebar-body pl-[48px] pt-[14px] w-full relative z-30 h-screen overflow-style-none overflow-y-scroll pb-[200px]">
            <div className="nav-wrapper pr-[50px] mb-[36px]">
              <div className="item-wrapper mb-5">
                <h4 className="text-sm font-medium text-black border-b border-bgray-200 leading-7">
                  Speisekarte
                </h4>
                <ul className="mt-2.5">
                  <li className="item py-[11px] text-black ">
                    <Link to="/admin/dashboard">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2.5 items-center">
                          <span className="item-ico">
                            <svg
                              width="18"
                              height="21"
                              viewBox="0 0 18 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="path-1"
                                d="M0 8.84719C0 7.99027 0.366443 7.17426 1.00691 6.60496L6.34255 1.86217C7.85809 0.515019 10.1419 0.515019 11.6575 1.86217L16.9931 6.60496C17.6336 7.17426 18 7.99027 18 8.84719V17C18 19.2091 16.2091 21 14 21H4C1.79086 21 0 19.2091 0 17V8.84719Z"
                                fill="#1A202C"
                              />
                              <path
                                className="path-2"
                                d="M5 17C5 14.7909 6.79086 13 9 13C11.2091 13 13 14.7909 13 17V21H5V17Z"
                                fill="#567BD9"
                              />
                            </svg>
                          </span>
                          <span className="item-text text-lg font-medium leading-none">
                            Armaturenbrett
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li class="item py-[11px] text-bgray-900">
                    <Link to="/admin/orgs">
                      <div class="flex items-center justify-between">
                        <div class="flex space-x-2.5 items-center">
                          <span class="item-ico">
                            <svg
                              width="18"
                              height="20"
                              viewBox="0 0 18 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18 16V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H14C16.2091 20 18 18.2091 18 16Z"
                                fill="#1A202C"
                                class="path-1"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                              <path
                                d="M11 0H7C5.89543 0 5 0.895431 5 2C5 3.10457 5.89543 4 7 4H11C12.1046 4 13 3.10457 13 2C13 0.895431 12.1046 0 11 0Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                            </svg>
                          </span>
                          <span class="item-text text-lg font-medium leading-none">
                            Organisations
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li class="item py-[11px] text-bgray-900 dark:text-white">
                    <Link to="/admin/services">
                      <div class="flex items-center justify-between">
                        <div class="flex space-x-2.5 items-center">
                          <span class="item-ico">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4Z"
                                fill="#1A202C"
                                class="path-1"
                              />
                              <path
                                d="M14 9C12.8954 9 12 9.89543 12 11L12 13C12 14.1046 12.8954 15 14 15C15.1046 15 16 14.1046 16 13V11C16 9.89543 15.1046 9 14 9Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                              <path
                                d="M6 5C4.89543 5 4 5.89543 4 7L4 13C4 14.1046 4.89543 15 6 15C7.10457 15 8 14.1046 8 13L8 7C8 5.89543 7.10457 5 6 5Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                            </svg>
                          </span>
                          <span class="item-text text-lg font-medium leading-none">
                            Services
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="item py-[11px] text-black ">
                    <a onClick={handleLogout}>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2.5 items-center">
                          <span className="item-ico">
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
                                fill="#567BD9"
                                className="path-2"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.75 17.75H12C14.6234 17.75 16.75 15.6234 16.75 13C16.75 12.5858 16.4142 12.25 16 12.25C15.5858 12.25 15.25 12.5858 15.25 13C15.25 14.7949 13.7949 16.25 12 16.25H8.21412C7.34758 17.1733 6.11614 17.75 4.75 17.75ZM8.21412 1.75H12C13.7949 1.75 15.25 3.20507 15.25 5C15.25 5.41421 15.5858 5.75 16 5.75C16.4142 5.75 16.75 5.41421 16.75 5C16.75 2.37665 14.6234 0.25 12 0.25H4.75C6.11614 0.25 7.34758 0.82673 8.21412 1.75Z"
                                fill="#1A202C"
                                className="path-1"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 5C0 2.37665 2.12665 0.25 4.75 0.25C7.37335 0.25 9.5 2.37665 9.5 5V13C9.5 15.6234 7.37335 17.75 4.75 17.75C2.12665 17.75 0 15.6234 0 13V5Z"
                                fill="#1A202C"
                                className="path-1"
                              />
                            </svg>
                          </span>
                          <span className="item-text text-lg font-medium leading-none">
                            Ausloggen
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <div
          style={{ zIndex: "25" }}
          className="aside-overlay block sm:hidden w-full h-full fixed left-0 top-0 bg-white bg-opacity-30"
        ></div>
        <aside className="sm:block hidden relative w-[96px] bg-white">
          <div className="w-full sidebar-wrapper-collapse relative top-0 z-30">
            <div className="sidebar-header bg-white  sticky top-0 border-r border-b border-r-[#F7F7F7] border-b-[#F7F7F7] w-full h-[108px] flex items-center justify-center z-20">
              <Link to="/admin/dashboard">
                <img
                  src="/assets/images/logo/logo-short.svg"
                  className="block"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="sidebar-body pt-[14px] w-full">
              <div className="flex flex-col items-center">
                <div className="nav-wrapper mb-[36px]">
                  <div className="item-wrapper mb-5">
                    <ul className="mt-2.5 flex justify-center items-center flex-col">
                      <li className="item py-[11px] px-[43px]">
                        <Link to="/admin/dashboard">
                          <span className="item-ico">
                            <svg
                              width="18"
                              height="21"
                              viewBox="0 0 18 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="path-1"
                                d="M0 8.84719C0 7.99027 0.366443 7.17426 1.00691 6.60496L6.34255 1.86217C7.85809 0.515019 10.1419 0.515019 11.6575 1.86217L16.9931 6.60496C17.6336 7.17426 18 7.99027 18 8.84719V17C18 19.2091 16.2091 21 14 21H4C1.79086 21 0 19.2091 0 17V8.84719Z"
                                fill="#1A202C"
                              />
                              <path
                                className="path-2"
                                d="M5 17C5 14.7909 6.79086 13 9 13C11.2091 13 13 14.7909 13 17V21H5V17Z"
                                fill="#567BD9"
                              />
                            </svg>
                          </span>
                        </Link>
                      </li>
                      <li class="item py-[11px] px-[43px]">
                        <Link to="/admin/orgs">
                          <span class="item-ico">
                            <svg
                              width="18"
                              height="20"
                              viewBox="0 0 18 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18 16V6C18 3.79086 16.2091 2 14 2H4C1.79086 2 0 3.79086 0 6V16C0 18.2091 1.79086 20 4 20H14C16.2091 20 18 18.2091 18 16Z"
                                fill="#1A202C"
                                class="path-1"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H5C4.58579 8.75 4.25 8.41421 4.25 8Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H9C9.41421 15.25 9.75 15.5858 9.75 16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                              <path
                                d="M11 0H7C5.89543 0 5 0.895431 5 2C5 3.10457 5.89543 4 7 4H11C12.1046 4 13 3.10457 13 2C13 0.895431 12.1046 0 11 0Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                            </svg>
                          </span>
                        </Link>
                      </li>
                      <li class="item py-[11px] px-[43px]">
                        <Link to="/admin/services">
                          <span class="item-ico">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4Z"
                                fill="#1A202C"
                                class="path-1"
                              />
                              <path
                                d="M14 9C12.8954 9 12 9.89543 12 11L12 13C12 14.1046 12.8954 15 14 15C15.1046 15 16 14.1046 16 13V11C16 9.89543 15.1046 9 14 9Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                              <path
                                d="M6 5C4.89543 5 4 5.89543 4 7L4 13C4 14.1046 4.89543 15 6 15C7.10457 15 8 14.1046 8 13L8 7C8 5.89543 7.10457 5 6 5Z"
                                fill="#567BD9"
                                class="path-2"
                              />
                            </svg>
                          </span>
                        </Link>
                      </li>
                      <li className="item py-[11px] px-[43px]">
                        <a onClick={handleLogout}>
                          <span className="item-ico">
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
                                fill="#567BD9"
                                className="path-2"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.75 17.75H12C14.6234 17.75 16.75 15.6234 16.75 13C16.75 12.5858 16.4142 12.25 16 12.25C15.5858 12.25 15.25 12.5858 15.25 13C15.25 14.7949 13.7949 16.25 12 16.25H8.21412C7.34758 17.1733 6.11614 17.75 4.75 17.75ZM8.21412 1.75H12C13.7949 1.75 15.25 3.20507 15.25 5C15.25 5.41421 15.5858 5.75 16 5.75C16.4142 5.75 16.75 5.41421 16.75 5C16.75 2.37665 14.6234 0.25 12 0.25H4.75C6.11614 0.25 7.34758 0.82673 8.21412 1.75Z"
                                fill="#1A202C"
                                className="path-1"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 5C0 2.37665 2.12665 0.25 4.75 0.25C7.37335 0.25 9.5 2.37665 9.5 5V13C9.5 15.6234 7.37335 17.75 4.75 17.75C2.12665 17.75 0 15.6234 0 13V5Z"
                                fill="#1A202C"
                                className="path-1"
                              />
                            </svg>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="body-wrapper  flex-1 overflow-x-hidden">
          <header className="md:block hidden header-wrapper w-full fixed z-30">
            <div className="w-full h-[108px] bg-white flex items-center justify-between 2xl:px-[76px] px-10 relative">
              <button
                title="Ctrl+b"
                type="button"
                className="drawer-btn absolute left-0 top-auto transform rotate-180"
              >
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
                      fill="#567BD9"
                    />
                    <path
                      d="M10 15L6 20.0049L10 25.0098"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div>
                <h3 className="lg:text-3xl text-xl text-bgray-50 text-black font-bold lg:leading-[36.4px]">
                  {headerData.title}
                </h3>
                <p className="lg:text-sm text-xs text-bgray-50 text-black font-medium lg:leading-[25.2px]">
                  {headerData.desc}
                </p>
              </div>
            </div>
          </header>
          <header className="md:hidden block mobile-wrapper w-full fixed z-20">
            <div className="w-full h-[80px] bg-white flex justify-between items-center">
              <div className="w-full h-full flex items-center space-x-5">
                <button
                  type="button"
                  className="drawer-btn transform rotate-180"
                >
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
                        fill="#567BD9"
                      />
                      <path
                        d="M10 15L6 20.0049L10 25.0098"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div>
                  <a href="https://spaceraceit.com/">
                    <img
                      src="/assets/images/logo/logo-color.svg"
                      className="block"
                      alt="logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </header>
          <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
            {/* <main className="w-full"> */}
            <div className="2xl:flex 2xl:space-x-[48px]">
              <section className="2xl:flex-1 2xl:mb-0 mb-6">
                <Outlet />
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
