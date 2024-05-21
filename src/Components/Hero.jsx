import React from 'react'
import PartnerSlider from './PartnerSlider'

export default function Hero() {
    return (
        <div className="hero-banner-five">
            <div className="container">
                <div className="row">
                    <div className="col-xl-10 col-lg-11 col-md-10 m-auto">
                        <h1 className="font-recoleta hero-heading">Build your <span>Product</span> with Deski pro app.</h1>
                        <p className="hero-sub-heading">Deski delivered blazing fast performance, striking word soludtion</p>
                    </div>
                </div>
                <div className="d-sm-flex align-items-center justify-content-center button-group">
                    <a href="#2" className="d-flex align-items-center ios-button">
                        <img src="assets/images/icon/apple.svg" alt="" className="icon" />
                        <div>
                            <span>Download on the</span>
                            <strong>App store</strong>
                        </div>
                    </a>
                    <a href="#1" className="d-flex align-items-center windows-button">
                        <img src="assets/images/icon/windows.svg" alt="" className="icon" />
                        <div>
                            <span>Get it on</span>
                            <strong>Windows pc</strong>
                        </div>
                    </a>
                </div>
                <p className="sing-in-call">Different Platform? <a href="#3" data-toggle="modal" data-target="#contactModal">Contact us</a></p>
            </div>

            <div className="img-gallery">
                <div className="container text-center">
                    <div className="screen-container">
                        <img src="assets/images/assets/screen_01.png" alt="" className="main-screen" />
                        <img src="assets/images/assets/screen_01.1.png" alt="" className="shapes screen-one" />
                        <img src="assets/images/assets/screen_01.2.png" alt="" className="shapes screen-two" />
                    </div>
                </div>
            </div>
            <img src="assets/images/shape/133.svg" alt="" className="shapes shape-one" />
            <img src="assets/images/shape/134.svg" alt="" className="shapes shape-two" />
            <img src="assets/images/shape/135.svg" alt="" className="shapes shape-three" />
            <img src="assets/images/shape/136.svg" alt="" className="shapes shape-four" />

            <div className="partner-slider-two mt-110 md-mt-80">
                <div className="container">
                    <p className="text-center">Over <span>32K+</span> software businesses growing with Deski.</p>
                    <PartnerSlider />
                </div>
            </div>
        </div>
    )
}
