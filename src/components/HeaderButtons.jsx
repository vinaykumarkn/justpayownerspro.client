import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import HeaderProfile from './HeaderProfile';
import * as bootstrap from 'bootstrap';

const HeaderButtons = () => {
    const { currentUser } = useSelector(state => state.user);
    const [activeButton, setActiveButton] = useState("Sign In");
    const navigate = useNavigate();
    const handleNavClick = (e, path) => {
        e.preventDefault();
        navigate(path); // Navigates to the specified path
        window.scrollTo(0, 0); // Scrolls to the top
    };
    const handleToggle = (button) => {
        setActiveButton(button);
        if (button === "Sign up") {
            window.location.href = "/register"; // Redirect to Sign up page
        } else if (button === "Sign In") {
            window.location.href = "/Login"; // Redirect to Sign In page
        }
    };
    const getButtonClass = (button) => {
        let baseClass = "btn";
        if (button === activeButton) {
            baseClass += " signin-button btn-primary active";
        } else {
            baseClass += " signup-button btn-default";
        }
        return baseClass;
    };
    useEffect(() => {
        const tooltipTriggerList = Array.from(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);
    return (<>


        <div className="header-action-layout1">
            <ul className="action-list">
                <li className="listing-button action-item-style">
                    <Link id="add-property-btn" to="/post-property-for-sale-rent" onClick={(e) => handleNavClick(e, "/post-property-for-sale-rent")}  className="listing-btn" >
                        <span><i className="fas fa-plus-circle"></i> </span>
                        <span className="item-text">Add Property</span>
                    </Link>

                </li>
                <li className="action-item-style my-account">
                   

                    {(currentUser == null || currentUser.length == 0) ?
                        <>
                            <div className="btn-group btn-toggle">

                                <Link to="/register" onClick={(e) => handleNavClick(e, "/register")}  className={getButtonClass("Sign up")} data-bs-toggle="tooltip"  >Sign up</Link>
                                        

                                <Link to="/Login" onClick={(e) => handleNavClick(e, "/Login")}  className={getButtonClass("Sign In")}  data-bs-toggle="tooltip"   >Sign In</Link>


                                {/*<button*/}
                                {/*    className={getButtonClass("Sign up")}*/}
                                {/*    onClick={() => handleToggle("Sign up")}*/}
                                {/*>*/}
                                {/*    Sign up*/}
                                {/*</button>*/}
                                {/*<button*/}
                                {/*    className={getButtonClass("Sign In")}*/}
                                {/*    onClick={() => handleToggle("Sign In")}*/}
                                {/*>*/}
                                {/*    Sign In*/}
                                {/*</button>*/}
                         </div>

                        </>
                         : <HeaderProfile />}

                    {/*<Link to="/Login" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="Sign In" >
                    {/*    <i className="flaticon-user-1 icon-round"></i></Link>*/}


                </li>
                {/*<li className="action-item-style my-account">*/}
                {/*    {(currentUser == null || currentUser.length == 0) &&*/}
                {/*        <Link to="/register" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Sign up"  > <i className="flaticon-user-1 icon-round"></i></Link>}*/}



                {/*</li>*/}

            </ul>
        </div>




    </>
    )
}

export default HeaderButtons