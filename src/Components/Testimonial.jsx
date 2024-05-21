import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function Testimonial() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2
                }
            }
        ]
    };
    return (
        <div>
            <div className="client-feedback-slider-four mt-200 md-mt-100" id="feedback">
                <div className="inner-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-9 col-md-8 m-auto">
                                <div className="title-style-six text-center">
                                    <h2><span>13,000+</span> Clients love Our product</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="clientSliderFour">
                        <Slider {...settings}>
                            <div className="item">
                                <div className="feedback-wrapper">
                                    <img src="assets/images/icon/77.svg" alt="" className="icon" />
                                    <p>Latin derived from Cicero's 1st-century BC text De Finibus Bonoru et Malorum print demo version.</p>
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h6 className="name">Martin Jonas, <span>USA</span></h6>
                                        <ul className="d-flex">
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="feedback-wrapper">
                                    <img src="assets/images/icon/77.svg" alt="" className="icon" />
                                    <p>Placeholder text commonly used in the graphic, print, and  industries for preview layouts & visual</p>
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h6 className="name">Martin Jonas, <span>USA</span></h6>
                                        <ul className="d-flex">
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="feedback-wrapper">
                                    <img src="assets/images/icon/77.svg" alt="" className="icon" />
                                    <p>From its medieval origins to the digital er, learn everything there is to know about the ubiquitous</p>
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h6 className="name">Martin Jonas, <span>USA</span></h6>
                                        <ul className="d-flex">
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="feedback-wrapper">
                                    <img src="assets/images/icon/77.svg" alt="" className="icon" />
                                    <p>Latin derived from Cicero's 1st-century BC text De Finibus Bonoru et Malorum print demo version.</p>
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h6 className="name">Martin Jonas, <span>USA</span></h6>
                                        <ul className="d-flex">
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="feedback-wrapper">
                                    <img src="assets/images/icon/77.svg" alt="" className="icon" />
                                    <p>Placeholder text commonly used in the graphic, print, and  industries for preview layouts & visual</p>
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h6 className="name">Martin Jonas, <span>USA</span></h6>
                                        <ul className="d-flex">
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="feedback-wrapper">
                                    <img src="assets/images/icon/77.svg" alt="" className="icon" />
                                    <p>From its medieval origins to the digital er, learn everything there is to know about the ubiquitous</p>
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h6 className="name">Martin Jonas, <span>USA</span></h6>
                                        <ul className="d-flex">
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="feedback-wrapper">
                                    <img src="assets/images/icon/77.svg" alt="" className="icon" />
                                    <p>Latin derived from Cicero's 1st-century BC text De Finibus Bonoru et Malorum print demo version.</p>
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <h6 className="name">Martin Jonas, <span>USA</span></h6>
                                        <ul className="d-flex">
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>

                    <img src="assets/images/shape/141.svg" alt="" className="shapes shape-one" />
                    <img src="assets/images/shape/142.svg" alt="" className="shapes shape-two" />
                </div>
            </div>
        </div>
    )
}
