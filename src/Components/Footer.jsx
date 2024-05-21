import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className="theme-footer-five mt-130 md-mt-100">
                <div className="inner-container">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-4">
                                <div className="logo"><a href="index.html"><img src="assets/images/logo/deski_06.svg" alt="" /></a></div>
                            </div>
                            <div className="col-lg-4">
                                <div className="title">Find us on Social Media</div>
                                <ul className="d-flex justify-content-center social-icon">
                                    <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                            <div className="col-lg-4">
                                <div className="title">We’r always happy to help.</div>
                                <div className="text-center"><a href="#" className="email">ask@jdeski.com</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="copyright">Copyright @2022 deski inc.</p>
            </footer>
        </div>
    )
}
