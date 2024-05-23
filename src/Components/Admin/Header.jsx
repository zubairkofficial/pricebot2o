import React from "react";
import Helpers from "../../Config/Helpers";
// import '../../../public/assets/js/modeControl';



export default function Header() {

  
  // React.useEffect(() => {
  //   console.log("scripts are loading");
  //   Helpers.loadScript("../../../public/assets/js/modeControl")
  //     // .then(() => Helpers.loadScript("assets/js/pages/dashboard-default.js"))
  //     // .then(() => Helpers.loadScript("assets/js/plugins/popper.min.js"))
  //     // .then(() => Helpers.loadScript("assets/js/plugins/simplebar.min.js"))
  //     // .then(() => Helpers.loadScript("assets/js/plugins/bootstrap.min.js"))
  //     // .then(() => Helpers.loadScript("assets/js/pcoded.js"))
  //     // .then(() => Helpers.loadScript("assets/js/plugins/feather.min.js"))
  //     .catch((error) => console.error("Script loading failed: ", error));
  // }, []);

  return (
    <header class="nftmax-header" >
      <div class="container-fluid">
        <div class="row g-50">
          <div class="col-12">
            <div class="nftmax-header__inner">
              <div class="nftmax__sicon close-icon close-icon-two d-xl-none">
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

              <div class="header-left">
                <div class="header-text">
                  <h3>Dashboard</h3>
                  <p>Let’s check your update today</p>
                </div>
                <div class="header-search">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Search..."
                  />

                  <div class="header-search-img">
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="9.7859"
                          cy="9.78614"
                          r="8.23951"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.5166 15.9448L18.747 19.1668"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div class="header-search-img-two">
                    <span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.975 13.3875C6.975 13.8548 6.83644 14.3115 6.57685 14.7C6.31725 15.0885 5.94828 15.3914 5.51659 15.5702C5.0849 15.749 4.60988 15.7958 4.1516 15.7046C3.69332 15.6134 3.27236 15.3884 2.94196 15.058C2.61156 14.7276 2.38655 14.3067 2.2954 13.8484C2.20424 13.3901 2.25102 12.9151 2.42984 12.4834C2.60865 12.0517 2.91146 11.6827 3.29997 11.4232C3.68848 11.1636 4.14524 11.025 4.6125 11.025H13.3875C13.8548 11.025 14.3115 11.1636 14.7 11.4232C15.0885 11.6827 15.3914 12.0517 15.5702 12.4834C15.749 12.9151 15.7958 13.3901 15.7046 13.8484C15.6134 14.3067 15.3884 14.7276 15.058 15.058C14.7276 15.3884 14.3067 15.6134 13.8484 15.7046C13.3901 15.7958 12.9151 15.749 12.4834 15.5702C12.0517 15.3914 11.6827 15.0885 11.4232 14.7C11.1636 14.3115 11.025 13.8548 11.025 13.3875V4.6125C11.025 4.14524 11.1636 3.68848 11.4232 3.29997C11.6827 2.91146 12.0517 2.60865 12.4834 2.42984C12.9151 2.25102 13.3901 2.20424 13.8484 2.2954C14.3067 2.38655 14.7276 2.61156 15.058 2.94196C15.3884 3.27236 15.6134 3.69332 15.7046 4.1516C15.7958 4.60988 15.749 5.0849 15.5702 5.51659C15.3914 5.94828 15.0885 6.31725 14.7 6.57685C14.3115 6.83644 13.8548 6.975 13.3875 6.975H4.6125C4.14524 6.975 3.68848 6.83644 3.29997 6.57685C2.91146 6.31725 2.60865 5.94828 2.42984 5.51659C2.25102 5.0849 2.20424 4.60988 2.2954 4.1516C2.38655 3.69332 2.61156 3.27236 2.94196 2.94196C3.27236 2.61156 3.69332 2.38655 4.1516 2.2954C4.60988 2.20424 5.0849 2.25102 5.51659 2.42984C5.94828 2.60865 6.31725 2.91146 6.57685 3.29997C6.83644 3.68848 6.975 4.14524 6.975 4.6125V13.3875Z"
                          strokeWidth="1.5"
                        />
                      </svg>
                      K
                    </span>
                  </div>
                </div>
              </div>

              <div class="header-right">
                <div class="icon-item">
                  <div class="dark-lite-icon">
                    <div class="icon" id="theme-controll">
                      <span id="dark-icon">
                        <svg
                          class="stroke-bgray-900 dark:stroke-bgray-50"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="5"
                            strokeWidth="1.5"
                          ></circle>
                          <path
                            d="M12 2V4"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>
                          <path
                            d="M12 20V22"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>
                          <path
                            d="M20.6602 7L18.9281 8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>
                          <path
                            d="M5.07178 16L3.33973 17"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>
                          <path
                            d="M3.33984 7L5.07189 8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>
                          <path
                            d="M18.9282 16L20.6603 17"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                      </span>

                      <span id="light-icon">
                        <svg
                          class="stroke-bgray-900"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.3284 14.8687C13.249 14.8687 9.13135 10.751 9.13135 5.67163C9.13135 4.74246 9.26914 3.84548 9.5254 3C5.74897 4.14461 3 7.65276 3 11.803C3 16.8824 7.11765 21 12.197 21C16.3472 21 19.8554 18.251 21 14.4746C20.1545 14.7309 19.2575 14.8687 18.3284 14.8687Z"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div
                    class="icon    icon-one icon-dropdown   "
                    data-name="notification"
                  >
                    <ul>
                      <li data-name="notification">
                        <a href="#" data-name="notification">
                          <span data-name="notification">
                            <svg
                              data-name="notification"
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19.9718 5.84979L19.2802 6.13973L19.9718 5.84979ZM19.357 6.32294C19.5171 6.70496 19.9566 6.88483 20.3386 6.7247C20.7206 6.56457 20.9005 6.12508 20.7403 5.74307L19.357 6.32294ZM16.7787 1.83432C16.3942 1.6804 15.9576 1.86736 15.8037 2.25191C15.6498 2.63646 15.8367 3.07298 16.2213 3.22691L16.7787 1.83432ZM16.6672 2.59755L16.3885 3.29384V3.29384L16.6672 2.59755ZM4.0768 5.84979L4.76849 6.13973L4.0768 5.84979ZM3.30831 5.74307C3.14818 6.12508 3.32805 6.56457 3.71006 6.7247C4.09207 6.88483 4.53156 6.70496 4.69169 6.32294L3.30831 5.74307ZM7.82735 3.22691C8.2119 3.07298 8.39886 2.63646 8.24494 2.25191C8.09101 1.86736 7.65449 1.6804 7.26994 1.83432L7.82735 3.22691ZM7.38142 2.59755L7.10271 1.90126V1.90126L7.38142 2.59755ZM18.2395 9.01023L17.4943 9.09475L18.2395 9.01023ZM18.6867 12.953L19.4319 12.8685L18.6867 12.953ZM5.31328 12.953L4.56805 12.8685L5.31328 12.953ZM5.76046 9.01023L6.50569 9.09475L5.76046 9.01023ZM4.44779 14.9112L3.87651 14.4252H3.87651L4.44779 14.9112ZM19.5522 14.9112L18.9809 15.3971L19.5522 14.9112ZM14.2699 4.40556H13.5199C13.5199 4.72608 13.7236 5.01118 14.0269 5.11507L14.2699 4.40556ZM9.73005 4.40556L9.97315 5.11507C10.2764 5.01118 10.4801 4.72608 10.4801 4.40556H9.73005ZM15.7024 20.3056C15.8476 19.9177 15.6509 19.4855 15.263 19.3402C14.8751 19.1949 14.4429 19.3916 14.2976 19.7795L15.7024 20.3056ZM9.70236 19.7795C9.55708 19.3916 9.12486 19.1949 8.73695 19.3402C8.34905 19.4855 8.15237 19.9177 8.29764 20.3056L9.70236 19.7795ZM19.2802 6.13973L19.357 6.32294L20.7403 5.74307L20.6635 5.55985L19.2802 6.13973ZM16.2213 3.22691L16.3885 3.29384L16.9459 1.90126L16.7787 1.83432L16.2213 3.22691ZM20.6635 5.55985C19.9642 3.89139 18.625 2.57333 16.9459 1.90126L16.3885 3.29384C17.6943 3.81651 18.736 4.84166 19.2802 6.13973L20.6635 5.55985ZM3.38511 5.55985L3.30831 5.74307L4.69169 6.32294L4.76849 6.13973L3.38511 5.55985ZM7.26994 1.83432L7.10271 1.90126L7.66013 3.29384L7.82735 3.22691L7.26994 1.83432ZM4.76849 6.13973C5.3126 4.84166 6.35436 3.81651 7.66013 3.29384L7.10271 1.90126C5.42367 2.57333 4.08448 3.89139 3.38511 5.55985L4.76849 6.13973ZM17.7772 17.2912H6.22281V18.7912H17.7772V17.2912ZM17.4943 9.09475L17.9415 13.0375L19.4319 12.8685L18.9848 8.9257L17.4943 9.09475ZM6.0585 13.0375L6.50569 9.09475L5.01524 8.92571L4.56805 12.8685L6.0585 13.0375ZM5.01906 15.3971C5.59632 14.7185 5.96031 13.9032 6.0585 13.0375L4.56805 12.8685C4.50516 13.423 4.27056 13.962 3.87651 14.4252L5.01906 15.3971ZM17.9415 13.0375C18.0397 13.9032 18.4037 14.7185 18.9809 15.3971L20.1235 14.4252C19.7294 13.962 19.4948 13.423 19.4319 12.8685L17.9415 13.0375ZM6.22281 17.2912C5.56803 17.2912 5.10465 16.9672 4.89067 16.5898C4.68402 16.2255 4.68712 15.7874 5.01906 15.3971L3.87651 14.4252C3.11142 15.3247 3.08784 16.4516 3.58588 17.3298C4.07657 18.1951 5.04922 18.7912 6.22281 18.7912V17.2912ZM17.7772 18.7912C18.9508 18.7912 19.9234 18.1951 20.4141 17.3298C20.9122 16.4516 20.8886 15.3247 20.1235 14.4252L18.9809 15.3971C19.3129 15.7874 19.316 16.2255 19.1093 16.5898C18.8954 16.9672 18.432 17.2912 17.7772 17.2912V18.7912ZM15.0199 4.40556V4.30177H13.5199V4.40556H15.0199ZM18.9848 8.9257C18.7056 6.46415 16.8809 4.50732 14.513 3.69605L14.0269 5.11507C15.9438 5.77185 17.2912 7.30429 17.4943 9.09475L18.9848 8.9257ZM10.4801 4.40556V4.30177H8.98005V4.40556H10.4801ZM6.50569 9.09475C6.70876 7.30429 8.05621 5.77185 9.97315 5.11507L9.48696 3.69605C7.11911 4.50732 5.29443 6.46415 5.01524 8.92571L6.50569 9.09475ZM12 2.78027C12.839 2.78027 13.5199 3.46099 13.5199 4.30177H15.0199C15.0199 2.63353 13.6684 1.28027 12 1.28027V2.78027ZM12 1.28027C10.3316 1.28027 8.98005 2.63353 8.98005 4.30177H10.4801C10.4801 3.46099 11.161 2.78027 12 2.78027V1.28027ZM14.2976 19.7795C13.9748 20.6416 13.0843 21.2939 12 21.2939V22.7939C13.6858 22.7939 15.1518 21.7756 15.7024 20.3056L14.2976 19.7795ZM12 21.2939C10.9157 21.2939 10.0252 20.6416 9.70236 19.7795L8.29764 20.3056C8.84816 21.7756 10.3142 22.7939 12 22.7939V21.2939Z" />
                            </svg>
                          </span>
                        </a>

                        <ul class="notification-dropdown" id="notification">
                          <li>
                            <div class="notification">
                              <div class="notification-head">
                                <div class="notification-text">
                                  <h2>Notifications</h2>
                                </div>
                                <div class="notification-icon">
                                  <a href="#">
                                    <span>
                                      <svg
                                        class="svg-two"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.325 2.317C8.751 0.561 11.249 0.561 11.675 2.317C11.7389 2.5808 11.8642 2.82578 12.0407 3.032C12.2172 3.23822 12.4399 3.39985 12.6907 3.50375C12.9414 3.60764 13.2132 3.65085 13.4838 3.62987C13.7544 3.60889 14.0162 3.5243 14.248 3.383C15.791 2.443 17.558 4.209 16.618 5.753C16.4769 5.98466 16.3924 6.24634 16.3715 6.51677C16.3506 6.78721 16.3938 7.05877 16.4975 7.30938C16.6013 7.55999 16.7627 7.78258 16.9687 7.95905C17.1747 8.13553 17.4194 8.26091 17.683 8.325C19.439 8.751 19.439 11.249 17.683 11.675C17.4192 11.7389 17.1742 11.8642 16.968 12.0407C16.7618 12.2172 16.6001 12.4399 16.4963 12.6907C16.3924 12.9414 16.3491 13.2132 16.3701 13.4838C16.3911 13.7544 16.4757 14.0162 16.617 14.248C17.557 15.791 15.791 17.558 14.247 16.618C14.0153 16.4769 13.7537 16.3924 13.4832 16.3715C13.2128 16.3506 12.9412 16.3938 12.6906 16.4975C12.44 16.6013 12.2174 16.7627 12.0409 16.9687C11.8645 17.1747 11.7391 17.4194 11.675 17.683C11.249 19.439 8.751 19.439 8.325 17.683C8.26108 17.4192 8.13578 17.1742 7.95929 16.968C7.7828 16.7618 7.56011 16.6001 7.30935 16.4963C7.05859 16.3924 6.78683 16.3491 6.51621 16.3701C6.24559 16.3911 5.98375 16.4757 5.752 16.617C4.209 17.557 2.442 15.791 3.382 14.247C3.5231 14.0153 3.60755 13.7537 3.62848 13.4832C3.64942 13.2128 3.60624 12.9412 3.50247 12.6906C3.3987 12.44 3.23726 12.2174 3.03127 12.0409C2.82529 11.8645 2.58056 11.7391 2.317 11.675C0.561 11.249 0.561 8.751 2.317 8.325C2.5808 8.26108 2.82578 8.13578 3.032 7.95929C3.23822 7.7828 3.39985 7.56011 3.50375 7.30935C3.60764 7.05859 3.65085 6.78683 3.62987 6.51621C3.60889 6.24559 3.5243 5.98375 3.383 5.752C2.443 4.209 4.209 2.442 5.753 3.382C6.753 3.99 8.049 3.452 8.325 2.317Z"
                                          stroke="#A0AEC0"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
                                          stroke="#A0AEC0"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>
                                  </a>
                                </div>
                              </div>
                              <div class="notification-item-main">
                                <div class="notification-item">
                                  <div class="notification-item-text">
                                    <p>
                                      {" "}
                                      <span>James Eusobio </span> send a new
                                      payment for <span>SEO writing</span>{" "}
                                      totaling{" "}
                                      <span class="color-green"> $199.00</span>
                                    </p>

                                    <h6>23 mins ago</h6>
                                  </div>
                                </div>
                                <div class="notification-item">
                                  <div class="notification-item-text">
                                    <p>
                                      {" "}
                                      <span>James Eusobio </span> send a new
                                      payment for <span>SEO writing</span>{" "}
                                      totaling{" "}
                                      <span class="color-green"> $199.00</span>
                                    </p>

                                    <h6>23 mins ago</h6>
                                  </div>
                                </div>
                                <div class="notification-item">
                                  <div class="notification-item-text">
                                    <p>
                                      {" "}
                                      <span>James Eusobio </span> send a new
                                      payment for <span>SEO writing</span>{" "}
                                      totaling{" "}
                                      <span class="color-green"> $199.00</span>
                                    </p>

                                    <h6>23 mins ago</h6>
                                  </div>
                                </div>
                                <div class="notification-item">
                                  <div class="notification-item-text">
                                    <p>
                                      {" "}
                                      <span>James Eusobio </span> send a new
                                      payment for <span>SEO writing</span>{" "}
                                      totaling{" "}
                                      <span class="color-green"> $199.00</span>
                                    </p>

                                    <h6>23 mins ago</h6>
                                  </div>
                                </div>
                                <div class="notification-item">
                                  <div class="notification-item-text">
                                    <p>
                                      {" "}
                                      <span>James Eusobio </span> send a new
                                      payment for <span>SEO writing</span>{" "}
                                      totaling{" "}
                                      <span class="color-green"> $199.00</span>
                                    </p>

                                    <h6>23 mins ago</h6>
                                  </div>
                                </div>
                                <div class="notification-item">
                                  <div class="notification-item-text">
                                    <p>
                                      {" "}
                                      <span>James Eusobio </span> send a new
                                      payment for <span>SEO writing</span>{" "}
                                      totaling{" "}
                                      <span class="color-green"> $199.00</span>
                                    </p>

                                    <h6>23 mins ago</h6>
                                  </div>
                                </div>
                                <div class="notification-item">
                                  <div class="notification-item-text">
                                    <p>
                                      {" "}
                                      <span>James Eusobio </span> send a new
                                      payment for <span>SEO writing</span>{" "}
                                      totaling{" "}
                                      <span class="color-green"> $199.00</span>
                                    </p>

                                    <h6>23 mins ago</h6>
                                  </div>
                                </div>
                                <div class="notification-item">
                                  <div class="notification-item-text">
                                    <p>
                                      {" "}
                                      <span>James Eusobio </span> send a new
                                      payment for <span>SEO writing</span>{" "}
                                      totaling{" "}
                                      <span class="color-green"> $199.00</span>
                                    </p>

                                    <h6>23 mins ago</h6>
                                  </div>
                                </div>
                              </div>

                              <div class="notification-btm notification-btm-two ">
                                <div class="notification-btm-text">
                                  <h2>
                                    {" "}
                                    <span class="">
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7 12L12 17L22 7M2 12L7 17M12 12L17 7"
                                          stroke="#0CAF60"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>{" "}
                                    Mark all as read
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="icon icon-two-two  icon-dropdown"
                    data-name="massage-drop"
                  >
                    <ul data-name="massage-drop">
                      <li data-name="massage-drop">
                        <a href="#" data-name="massage-drop">
                          <span data-name="massage-drop">
                            <svg
                              data-name="massage-drop"
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2 12.0369V7.0335C2 4.82285 3.79086 3.03076 6 3.03076H18C20.2091 3.03076 22 4.82285 22 7.0335V17.0403C22 19.251 20.2091 21.0431 18 21.0431H8M6 8.03418L9.7812 10.5567C11.1248 11.453 12.8752 11.453 14.2188 10.5567L18 8.03418M2 15.039H8M2 18.041H8"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        </a>

                        <ul class="massage-dropdown" id="massage-drop">
                          <li>
                            <div class="notification">
                              <div class="notification-head">
                                <div class="notification-text">
                                  <h2>Notifications</h2>
                                </div>
                                <div class="notification-icon">
                                  <a href="#">
                                    <span>
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M8.325 2.317C8.751 0.561 11.249 0.561 11.675 2.317C11.7389 2.5808 11.8642 2.82578 12.0407 3.032C12.2172 3.23822 12.4399 3.39985 12.6907 3.50375C12.9414 3.60764 13.2132 3.65085 13.4838 3.62987C13.7544 3.60889 14.0162 3.5243 14.248 3.383C15.791 2.443 17.558 4.209 16.618 5.753C16.4769 5.98466 16.3924 6.24634 16.3715 6.51677C16.3506 6.78721 16.3938 7.05877 16.4975 7.30938C16.6013 7.55999 16.7627 7.78258 16.9687 7.95905C17.1747 8.13553 17.4194 8.26091 17.683 8.325C19.439 8.751 19.439 11.249 17.683 11.675C17.4192 11.7389 17.1742 11.8642 16.968 12.0407C16.7618 12.2172 16.6001 12.4399 16.4963 12.6907C16.3924 12.9414 16.3491 13.2132 16.3701 13.4838C16.3911 13.7544 16.4757 14.0162 16.617 14.248C17.557 15.791 15.791 17.558 14.247 16.618C14.0153 16.4769 13.7537 16.3924 13.4832 16.3715C13.2128 16.3506 12.9412 16.3938 12.6906 16.4975C12.44 16.6013 12.2174 16.7627 12.0409 16.9687C11.8645 17.1747 11.7391 17.4194 11.675 17.683C11.249 19.439 8.751 19.439 8.325 17.683C8.26108 17.4192 8.13578 17.1742 7.95929 16.968C7.7828 16.7618 7.56011 16.6001 7.30935 16.4963C7.05859 16.3924 6.78683 16.3491 6.51621 16.3701C6.24559 16.3911 5.98375 16.4757 5.752 16.617C4.209 17.557 2.442 15.791 3.382 14.247C3.5231 14.0153 3.60755 13.7537 3.62848 13.4832C3.64942 13.2128 3.60624 12.9412 3.50247 12.6906C3.3987 12.44 3.23726 12.2174 3.03127 12.0409C2.82529 11.8645 2.58056 11.7391 2.317 11.675C0.561 11.249 0.561 8.751 2.317 8.325C2.5808 8.26108 2.82578 8.13578 3.032 7.95929C3.23822 7.7828 3.39985 7.56011 3.50375 7.30935C3.60764 7.05859 3.65085 6.78683 3.62987 6.51621C3.60889 6.24559 3.5243 5.98375 3.383 5.752C2.443 4.209 4.209 2.442 5.753 3.382C6.753 3.99 8.049 3.452 8.325 2.317Z"
                                          stroke="#A0AEC0"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
                                          stroke="#A0AEC0"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>
                                  </a>
                                </div>
                              </div>
                              <div class="massage-text">
                                <h2>All</h2>
                              </div>
                              <div class="notification-item-main notification-item-main-two ">
                                <div class="massage-item">
                                  <div class="massage-inner">
                                    <div class="massage-img">
                                      <img
                                        src="assets/images/massage-1.png"
                                        alt="img"
                                      />
                                      <div class="round"></div>
                                    </div>
                                    <div class="massage-item-text">
                                      <p>
                                        <span>James Eusobio</span> send a
                                        message Hi, how are you? nedd help!
                                        .......{" "}
                                      </p>

                                      <h6>23 mins ago</h6>
                                    </div>
                                  </div>
                                  <div class="massage-inner">
                                    <div class="massage-img">
                                      <img
                                        src="assets/images/massage-2.png"
                                        alt="img"
                                      />
                                      <div class="round round-two "></div>
                                    </div>
                                    <div class="massage-item-text">
                                      <p>
                                        <span>Eusobio Joy</span> send a message
                                        Hi, how are you? nedd help! .......{" "}
                                      </p>

                                      <h6>23 mins ago</h6>
                                    </div>
                                  </div>
                                  <div class="massage-inner">
                                    <div class="massage-img">
                                      <img
                                        src="assets/images/massage-3.png"
                                        alt="img"
                                      />
                                      <div class="round "></div>
                                    </div>
                                    <div class="massage-item-text">
                                      <p>
                                        <span>James Camaron</span> send a
                                        message Hi, how are you? nedd help!
                                        .......{" "}
                                      </p>

                                      <h6>23 mins ago</h6>
                                    </div>
                                  </div>
                                  <div class="massage-inner">
                                    <div class="massage-img">
                                      <img
                                        src="assets/images/massage-1.png"
                                        alt="img"
                                      />
                                      <div class="round"></div>
                                    </div>
                                    <div class="massage-item-text">
                                      <p>
                                        <span>James Eusobio</span> send a
                                        message Hi, how are you? nedd help!
                                        .......{" "}
                                      </p>

                                      <h6>23 mins ago</h6>
                                    </div>
                                  </div>
                                  <div class="massage-inner">
                                    <div class="massage-img">
                                      <img
                                        src="assets/images/massage-2.png"
                                        alt="img"
                                      />
                                      <div class="round round-two "></div>
                                    </div>
                                    <div class="massage-item-text">
                                      <p>
                                        <span>Eusobio Joy</span> send a message
                                        Hi, how are you? nedd help! .......{" "}
                                      </p>

                                      <h6>23 mins ago</h6>
                                    </div>
                                  </div>
                                  <div class="massage-inner">
                                    <div class="massage-img">
                                      <img
                                        src="assets/images/massage-3.png"
                                        alt="img"
                                      />
                                      <div class="round "></div>
                                    </div>
                                    <div class="massage-item-text">
                                      <p>
                                        <span>James Camaron</span> send a
                                        message Hi, how are you? nedd help!
                                        .......{" "}
                                      </p>

                                      <h6>23 mins ago</h6>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="notification-btm">
                                <div class="notification-btm-text">
                                  <h2>
                                    {" "}
                                    <span>
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7 12L12 17L22 7M2 12L7 17M12 12L17 7"
                                          stroke="#0CAF60"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>{" "}
                                    Mark all as read
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div class="icon icon-two-two icon-dropdown" data-name="gift">
                    <ul data-name="gift">
                      <li data-name="gift">
                        <a href="#" data-name="gift">
                          <span data-name="gift">
                            <svg
                              data-name="gift"
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 11.0364H20M4 11.0364C2.89543 11.0364 2 10.1404 2 9.03506V8.03437C2 6.92905 2.89543 6.03301 4 6.03301H20C21.1046 6.03301 22 6.92905 22 8.03437V9.03506C22 10.1404 21.1046 11.0364 20 11.0364M4 11.0364L4 20.0426C4 21.1479 4.89543 22.0439 6 22.0439H18C19.1046 22.0439 20 21.1479 20 20.0426V11.0364M12 6.03301H16C17.1046 6.03301 18 5.13696 18 4.03164C18 2.92632 17.1046 2.03027 16 2.03027C13.7909 2.03027 12 3.82236 12 6.03301ZM12 6.03301H8C6.89543 6.03301 6 5.13696 6 4.03164C6 2.92632 6.89543 2.03027 8 2.03027C10.2091 2.03027 12 3.82236 12 6.03301ZM12 6.03301V22.0439"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        </a>

                        <ul id="gift">
                          <li>
                            <div class="notification">
                              <div class="gift-item">
                                <div class="gift-inner">
                                  <div class="gift-item-text">
                                    <h2>60% Bonus </h2>
                                    <p>Create an Account and Get Bonus</p>
                                  </div>
                                  <div class="gift-btn">
                                    <div class="btn-one btn-one-two ">
                                      <a href="#">Discover More</a>
                                    </div>
                                  </div>
                                </div>
                                <div class="circule">
                                  <div class="bonus-per">
                                    <div class="bonus-outer">
                                      <div class="bonus-inner">
                                        <div class="number">
                                          <div class="text">
                                            <span>25%</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div class="svg-img">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="200px"
                                        height="200px"
                                      >
                                        <circle
                                          cx="50"
                                          cy="50"
                                          r="45"
                                          strokeLinecap="round"
                                        ></circle>
                                      </svg>
                                    </div>
                                  </div>
                                </div>

                                <div class="gift-item-taitel">
                                  <p>Discover more</p>
                                </div>

                                <div class="gift-item-taitel-img">
                                  <img
                                    src="assets/images/Group.png"
                                    alt="img"
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="profile icon-dropdown" data-name="profile-drop">
                  <ul class="profile-dropdown" id="profile-drop">
                    <li data-name="profile-drop">
                      <a href="setting.html" data-name="profile-drop">
                        <span data-name="profile-drop">
                          <svg
                            data-name="profile-drop"
                            class="stroke-bgray-900 dark:stroke-bgray-50"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.1197 12.7805C12.0497 12.7705 11.9597 12.7705 11.8797 12.7805C10.1197 12.7205 8.71973 11.2805 8.71973 9.51047C8.71973 7.70047 10.1797 6.23047 11.9997 6.23047C13.8097 6.23047 15.2797 7.70047 15.2797 9.51047C15.2697 11.2805 13.8797 12.7205 12.1197 12.7805Z"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M18.7398 19.3796C16.9598 21.0096 14.5998 21.9996 11.9998 21.9996C9.39977 21.9996 7.03977 21.0096 5.25977 19.3796C5.35977 18.4396 5.95977 17.5196 7.02977 16.7996C9.76977 14.9796 14.2498 14.9796 16.9698 16.7996C18.0398 17.5196 18.6398 18.4396 18.7398 19.3796Z"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a href="message.html">
                        <span>
                          <svg
                            class="stroke-bgray-900 dark:stroke-gray-300"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 12V7C2 4.79086 3.79086 3 6 3H18C20.2091 3 22 4.79086 22 7V17C22 19.2091 20.2091 21 18 21H8M6 8L9.7812 10.5208C11.1248 11.4165 12.8752 11.4165 14.2188 10.5208L18 8M2 15H8M2 18H8"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                        </span>
                        Inbox
                      </a>
                    </li>
                    <li class="text-color">
                      <a href="#">
                        <span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 10L13.7071 11.2929C13.3166 11.6834 13.3166 12.3166 13.7071 12.7071L15 14M14 12L22 12M6 20C3.79086 20 2 18.2091 2 16V8C2 5.79086 3.79086 4 6 4M6 20C8.20914 20 10 18.2091 10 16V8C10 5.79086 8.20914 4 6 4M6 20H14C16.2091 20 18 18.2091 18 16M6 4H14C16.2091 4 18 5.79086 18 8"
                              stroke="#22C55E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                        </span>
                        Log Out
                      </a>
                    </li>

                    <li>
                      <a href="setting.html">Settings</a>
                    </li>
                    <li>
                      <a href="user.html">Users</a>
                    </li>
                  </ul>

                  <div class="profile-img" data-name="profile-drop">
                    <img
                      src="./../../../assets/images/profile.png"
                      alt="img"
                      data-name="profile-drop"
                    />
                  </div>
                  <div class="profile-taitel" data-name="profile-taitel ">
                    <h3 data-name="profile-drop">
                      AJOY Sarker
                      <span data-name="profile-drop">
                        <svg
                          data-name="profile-drop"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 10L12 14L17 10"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </h3>

                    <h6 data-name="profile-drop">Super Admin</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    
  );
}
