import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function PartnerSlider() {
    var settings = {

        infinite: true,
        speed: 500,
        slidesToShow: 6,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };
    return (
        <div className="slider-container">
            <div >
                <Slider {...settings}>
                    <div className="item">
                        <div className="img-meta d-flex align-items-center justify-content-center"><img src="assets/images/logo/logo-12.png" alt="" /></div>
                    </div>
                    <div className="item">
                        <div className="img-meta d-flex align-items-center justify-content-center"><img src="assets/images/logo/logo-13.png" alt="" /></div>
                    </div>
                    <div className="item">
                        <div className="img-meta d-flex align-items-center justify-content-center"><img src="assets/images/logo/logo-14.png" alt="" /></div>
                    </div>
                    <div className="item">
                        <div className="img-meta d-flex align-items-center justify-content-center"><img src="assets/images/logo/logo-15.png" alt="" /></div>
                    </div>
                    <div className="item">
                        <div className="img-meta d-flex align-items-center justify-content-center"><img src="assets/images/logo/logo-16.png" alt="" /></div>
                    </div>
                    <div className="item">
                        <div className="img-meta d-flex align-items-center justify-content-center"><img src="assets/images/logo/logo-14.png" alt="" /></div>
                    </div>
                    <div className="item">
                        <div className="img-meta d-flex align-items-center justify-content-center"><img src="assets/images/logo/logo-13.png" alt="" /></div>
                    </div>
                </Slider>
            </div></div>
    )
}
