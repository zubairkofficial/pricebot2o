import React from 'react'

export default function Menu() {
    return (
        <div className="theme-main-menu sticky-menu theme-menu-five">
            <div className="d-flex align-items-center justify-content-center">
                <div className="logo"><a href="index.html"><img src="images/logo/deski_06.svg" alt="" /></a></div>

                <nav id="mega-menu-holder" className="navbar navbar-expand-lg">
                    <div className="nav-container">
                        <button className="navbar-toggler">
                            <span></span>
                        </button>
                        <div className="navbar-collapse collapse" id="navbarSupportedContent">
                            <div className="d-lg-flex justify-content-between align-items-center">
                                <ul className="navbar-nav main-side-nav font-gordita" id="one-page-nav">
                                    <li className="nav-item dropdown position-static">
                                        <a className="nav-link dropdown-toggle" href="#2" data-toggle="dropdown">Home</a>
                                        <div className="dropdown-menu">
                                            <ul className="mega-menu d-flex">
                                                <li>
                                                    <a href="index-event.html" className="dropdown-item img-box">
                                                        <img src="images/menu/home01.png" alt="" />
                                                        <span className="font-rubik">Event Organiser</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index-doc.html" className="dropdown-item img-box">
                                                        <img src="images/menu/home02.png" alt="" />
                                                        <span className="font-rubik">Doc landing</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index.html" className="dropdown-item img-box">
                                                        <img src="images/menu/home03.png" alt="" />
                                                        <span className="font-rubik">Project Management</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index-customer-support.html" className="dropdown-item img-box">
                                                        <img src="images/menu/home04.png" alt="" />
                                                        <span className="font-rubik">Customer Support</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(product-landing).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home05.png" alt="" />
                                                        <span className="font-rubik">Product landing</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(product-landing-dark).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home06.png" alt="" />
                                                        <span className="font-rubik">Product landing Dark</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(note-taking).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home07.png" alt="" />
                                                        <span className="font-rubik">Note Taking App landing</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(video-editor).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home08.png" alt="" />
                                                        <span className="font-rubik">Video Editor Landing</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(appointment-scheduling).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home10.png" alt="" />
                                                        <span className="font-rubik">Appointment Scheduling</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(mobile-appV1).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home11.png" alt="" />
                                                        <span className="font-rubik">Mobile App Landing</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(doc-signature).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home12.png" alt="" />
                                                        <span className="font-rubik">Doc Signature Landing</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(webiste-builder).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home13.png" alt="" />
                                                        <span className="font-rubik">Website Builder</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(form-survey).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home14.png" alt="" />
                                                        <span className="font-rubik">Form & Survey</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(vr).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home16.png" alt="" />
                                                        <span className="font-rubik">VR Landing</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(e-commerce).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home15.png" alt="" />
                                                        <span className="font-rubik">E-commerce</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index(crm-platform).html" className="dropdown-item img-box">
                                                        <img src="images/menu/home17.png" alt="" />
                                                        <span className="font-rubik">CRM Platform</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="coming-soon-v1.html" className="dropdown-item img-box">
                                                        <img src="images/menu/home09.png" alt="" />
                                                        <span className="font-rubik">Coming Soon</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#feature" className="nav-link">Features</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#about" className="nav-link">About us</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#product" className="nav-link">Product</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#pricing" className="nav-link">Pricing</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#feedback" className="nav-link">Feedback</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="right-widget">
                    <a href="1#" data-toggle="modal" data-target="#contactModal" className="demo-button"><span>Contact Us</span> <img src="images/icon/user.svg" alt="" /></a>
                </div>
            </div>
        </div>
    )
}
