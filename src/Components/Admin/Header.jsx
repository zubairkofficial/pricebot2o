import React from "react";
import Helpers from "../../Config/Helpers";

const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");

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
