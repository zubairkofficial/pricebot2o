import React from "react";
import Helpers from "../../Config/Helpers";




export default function Header() {

  
  // React.useEffect(() => {
  //   console.log("scripts are loading");
  //   Helpers.loadScript("../../../public/assets/js/custom")
  //     // .then(() => Helpers.loadScript("assets/js/pages/dashboard-default.js"))
  //     // .then(() => Helpers.loadScript("assets/js/plugins/popper.min.js"))
  //     // .then(() => Helpers.loadScript("assets/js/plugins/simplebar.min.js"))
  //     // .then(() => Helpers.loadScript("assets/js/plugins/bootstrap.min.js"))
  //     // .then(() => Helpers.loadScript("assets/js/pcoded.js"))
  //     // .then(() => Helpers.loadScript("assets/js/plugins/feather.min.js"))
  //     .catch((error) => console.error("Script loading failed: ", error));
  // }, []);

  return (
    <header class="nftmax-header">
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
                  <p>Lassen Sie uns noch heute Ihr Update überprüfen</p>
                </div>
                
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </header>
    
  );
}
