/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from 'react-router-dom';
import { memo, useCallback } from 'react';

const CompanyRights = ({ json }) => {
    const navigate = useNavigate();

    const handleNavClick = useCallback((e, path) => {
        e.preventDefault();
        navigate(path);
        window.scrollTo(0, 0);
    }, [navigate]);

    return (
        <div className="footer-bottom">
            <div className="row justify-content-center">
                {/* Site Map Links */}
                <div className="col-lg-7 col-md-6 text-center text-md-start">
                    <div className="copyright-area1">
                        <ul className="d-flex flex-wrap justify-content-center justify-content-md-start">
                            {json?.siteMap?.map(({ url, text }, index) => (
                                <li key={index} className="nav-item sitemap mx-2">
                                    <NavLink to={url} onClick={(e) => handleNavClick(e, url)} className="nav-link">
                                        {text}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div className="col-lg-5 col-md-6 text-center text-md-end">
                    <div className="copyright-area2">
                        <div className="footer-logo-area">
                            <div className="item-social">
                                <ul className="d-flex justify-content-center justify-content-md-end gap-3">
                                    {[
                                        { platform: "Facebook", path: "/facebook", icon: "fab fa-facebook-f" },
                                        { platform: "Twitter", path: "/twitter", icon: "fab fa-twitter" },
                                        { platform: "WhatsApp", path: "/whatsapp", icon: "fab fa-whatsapp" }
                                    ].map(({ platform, path, icon }) => (
                                        <li key={platform}>
                                            <NavLink to={path} onClick={(e) => handleNavClick(e, path)} className="nav-link">
                                                <i className={icon}></i>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Text */}
            <div className="col-lg-12 col-md-12 text-center mt-3">
                <div id="copyright" className="copyright-area2">
                    <p>
                        Copyright © 2024{" "}
                        <NavLink to="/about-us" onClick={(e) => handleNavClick(e, "/about-us")}>
                            justpayowners.In Pvt. Ltd
                        </NavLink>
                        . All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default memo(CompanyRights);
