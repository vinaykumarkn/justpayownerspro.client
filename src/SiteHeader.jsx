import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HeaderLink, SiteLogo  } from "./components";

const SiteHeader = function () {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [submenuState, setSubmenuState] = useState({
        forBuyers: false,
        popularChoices: false,
    });

    const handleSidebarToggle = () => {
        if (isSidebarOpen) {
            setSidebarOpen(false);
            document.body.classList.remove("slidemenuon");
        } else {
            setSidebarOpen(true);
            document.body.classList.add("slidemenuon");
        }
    };

    const handleMenuClick = (menuKey) => {
        setSubmenuState((prevState) => ({
            ...prevState,
            [menuKey]: !prevState[menuKey],
        }));
    };

    return (
        <>
            {/* Header Link Section */}
            <HeaderLink />

            {/* Main Header Menu */}
            <div
                className="rt-header-menu mean-container position-relative"
                id="meanmenu"
            >
                <div className="mean-bar">
                    <SiteLogo />
                    <div className="mean-bar--right">
                        <div className="actions user">
                            <Link to="/login">
                                <i className="flaticon-user"></i>
                            </Link>
                        </div>
                        {/* Sidebar Toggle Button */}
                        <span
                            className="sidebarBtn"
                            onClick={handleSidebarToggle}
                            style={{ cursor: "pointer" }}
                        >
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </span>
                    </div>
                </div>

                {/* Sidebar menu visibility */}
                <div
                    id="mobile-menu"
                    className={`rt-slide-nav ${isSidebarOpen ? "open" : "closed"}`}
                    style={{
                        transition: "all 0.3s ease",
                        display: isSidebarOpen ? "block" : "none",
                    }}
                >
                    <div className="offscreen-navigation">
                        <nav className="menu-main-primary-container">
                            <ul className="menu">
                                {/* For Buyers Dropdown */}
                                <li className="list menu-item-parent menu-item-has-children">
                                    <a
                                        className={`animation ${submenuState["forBuyers"] ? "opened" : ""
                                            }`}
                                        onClick={() => handleMenuClick("forBuyers")}
                                    >
                                        For Buyers
                                    </a>
                                    <ul
                                        className="main-menu__dropdown sub-menu"
                                        style={{
                                            display: ` ${submenuState["forBuyers"] ? "block" : "none"
                                                }`,
                                        }}
                                    >
                                        <li>
                                            <Link to="/property/residential_sales">
                                                <i className="fas fa-building"></i>New Projects
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/property/residential_sales">
                                                <i className="fas fa-home"></i>Budget Homes
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/property/residential_sales">
                                                <i className="fas fa-user"></i>Owner Properties
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/property/commercial_sales">
                                                <i className="fas fa-city"></i> Commercial
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/property/plotsales">
                                                <i className="fas fa-map-marker-alt"></i>Land / Plot Sales
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="list menu-item-parent menu-item-has-children">
                                    <a
                                        className={`animation ${submenuState["ForTenants"] ? "opened" : ""
                                            }`}
                                        onClick={() => handleMenuClick("ForTenants")}
                                    >
                                        For Tenants
                                    </a>
                                    <ul
                                        className="main-menu__dropdown sub-menu"
                                        style={{
                                            display: ` ${submenuState["ForTenants"] ? "block" : "none"
                                                }`,
                                        }}
                                    >
                                        <li>
                                            <Link to="/property/residential_rentals">
                                                <i className="fas fa-user"></i>Owner Properties
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/property/residential_rentals">
                                                <i className="fas fa-check-circle"></i>Verified Properties
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/property/residential_rentals">
                                                <i className="fas fa-couch"></i>Furnished Homes
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="list menu-item-parent menu-item-has-children">
                                    <a
                                        className={`animation ${submenuState["ForOwners"] ? "opened" : ""
                                            }`}
                                        onClick={() => handleMenuClick("ForOwners")}
                                    >
                                        For Owners
                                    </a>
                                    <ul
                                        className="main-menu__dropdown sub-menu"
                                        style={{
                                            display: ` ${submenuState["ForOwners"] ? "block" : "none"
                                                }`,
                                        }}
                                    >
                                        <li>
                                            <Link to="/post-property-for-sale-rent">
                                                Post Property for Free
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/about-us#Owner Services">Owner Services</Link>
                                        </li>
                                        <li>
                                            <Link to="/blog/Articles For Owners">
                                                Articles For Owners
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SiteHeader;
