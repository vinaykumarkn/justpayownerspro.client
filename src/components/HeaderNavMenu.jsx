import React from 'react'
import jsonHeader from '../mockdata/locationData.json';
import { Link } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa6';



const HeaderNavMenu = ({ type }) => {
    const menuTitle = (type) => {
        switch (type) {
            case 'Buyers':
                return 'Top Cities to Buy Property';
            case 'Tenants':
                return 'Top Cities to Rent Property';
            case 'Owners':
                return 'New Project by City';
            case 'Services':
                return 'Real Estate Agents in Top Cities';
            case 'Builders':
                return 'Real Estate Agents in Top Cities';
        }
    }
   
    const renderMenu = (type) => {
        switch (type) {
            case 'Buyers':
                return <>
                    <div className="template-mega-menu">
                        <div className="container">
                            <div className="row">
                                <div className="col-3">
                                    <div className="menu-ctg-title">Popular Choices</div>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="/property/residential_sales">
                                                <i className="fas fa-building"></i>New Projects</a>
                                        </li>
                                        <li>
                                            <a href="/property/residential_sales">
                                                <i className="fas fa-home"></i>Budget Homes</a>
                                        </li>
                                        <li>
                                            <a href="/property/residential_sales">
                                                <i className="fas fa-user"></i>Owner Properties</a>
                                        </li>
                                        <li>
                                            <a href="/property/commercial_sales">
                                                <i className="fas fa-city"></i> Commercial </a>
                                        </li>
                                        <li>
                                            <a href="/property/plotsales">
                                                <i className="fas fa-map-marker-alt"></i>Land / Plot Sales</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-3">
                                    <div className="menu-ctg-title">Residential and Commercial Properties</div>
                                    <ul className="sub-menu">                                       
                                        <li>
                                            <a href="/property/residential_sales">
                                                <i className="fas fa-home"></i>Residential Properties</a>
                                        </li>
                                        <li>
                                            <a href="/property/commercial_sales">
                                                <i className="fas fa-city"></i>Commercial Properties</a>
                                        </li>
                                        <li>
                                            <a href="/property/plotsales">
                                                <i className="fas fa-chart-pie"></i>Land/Plot Properties</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-3">
                                    <div className="menu-ctg-title">Articles & News</div>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="/blog/Articles For Buyers"><i className="fas fa-newspaper"></i>Articles For Buyers</a>
                                        </li>                                       
                                        <li>
                                            <a href="/blog/Buyer Guide"><i className="fas fa-book"></i>Buyer Guide</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-3">
                                    <div className="menu-ctg-title">Budget Property</div>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="/property/residential_sales">
                                                <i className="fas fa-rupee-sign"></i>Under ₹ 50 Lac
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/property/residential_sales">
                                                <i className="fas fa-rupee-sign"></i>
                                                ₹ 50 Lac - ₹ 1 Cr</a>
                                        </li>
                                        <li>
                                            <a href="/property/residential_sales">
                                                <i className="fas fa-rupee-sign"></i>₹ 1 Cr - ₹ 1.5 Cr</a>
                                        </li>
                                        <li>
                                            <a href="/property/residential_sales">
                                                <i className="fas fa-rupee-sign"></i>Above ₹ 1.5 Cr</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            case 'Tenants':
                return <> <div className="template-mega-menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <div className="menu-ctg-title">Residential Rentals Proeprties</div>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="/property/residential_rentals">
                                            <i className="fas fa-user"></i>Owner Properties</a>
                                    </li>
                                    <li>
                                        <a href="/property/residential_rentals">
                                            <i className="fas fa-check-circle"></i>Verified Properties</a>
                                    </li>
                                    <li>
                                        <a href="/property/residential_rentals">
                                            <i className="fas fa-couch"></i>Furnished Homes</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <div className="menu-ctg-title">Articles & News</div>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="/blog/Articles For Tenants"><i className="far fa-money-bill-alt"></i>Articles For Tenants</a>
                                    </li>
                                    <li>
                                        <a href="/blog/Real Estate News">
                                            <i className="fas fa-newspaper"></i>Real Estate News</a>
                                    </li>                                  

                                </ul>
                            </div>
                            <div className="col-3">
                                <div className="menu-ctg-title">Commercial Rentals Properties</div>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="/property/commercial_rentals">
                                            <i className="fas fa-user"></i>Owner Properties</a>
                                    </li>
                                    <li>
                                        <a href="/property/commercial_rentals">
                                            <i className="fas fa-check-circle"></i>Verified Properties</a>
                                    </li>
                                    <li>
                                        <a href="/property/commercial_rentals">
                                            <i className="fas fa-couch"></i>Furnished Homes</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <div className="menu-ctg-title">Tenant Services</div>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="/blog/Articles For Tenants">
                                            <i className="fas fa-file-contract"></i>Rental Agreement</a>
                                    </li>
                                    <li>
                                        <a href="/blog/Real Estate News">
                                            <i className="fas fa-truck-moving"></i>Move-In/Move-Out Services</a>
                                    </li>
                                    <li>
                                        <a href="/blog/Rent Agreement">
                                            <i className="fas fa-faucet"></i>Plumbing,Electrical and Painting Services</a>
                                    </li>
                                </ul>
                            </div>                          
                           
                        </div>
                    </div>
                </div>
                </>

            case 'Owners':
                return <><ul className="dropdown-menu-col-1">
                    <li>
                        <a href="/post-property-for-sale-rent">Post Property for Free</a>
                    </li>
                    <li>
                        <a href="/about-us#Owner Services">Owner Services</a>
                    </li>
                    <li>
                        <a href="/blog/Articles For Owners">Articles For Owners</a>
                    </li>                   
                </ul>
                </>

            case 'Services':
                return <> <ul className="dropdown-menu-col-1">
                    <li>
                        <a href="/about-us#Home Interior Design Services">Home Interior Design Services</a>
                    </li>
                    <li>
                        <a href="/about-us#Design Consultation">Design Consultation</a>
                    </li>

                    <li>
                        <a href="/about-us#Home Loans">Home Loans</a>
                    </li>
                    <li>
                        <a href="/about-us#Balance Transfer">Balance Transfer</a>
                    </li>
                    <li>
                        <a href="/about-us#Loan Against Property">Loan Against Property</a>
                    </li>
                </ul>
                </>
        }
    }
    return (
        <>

            {/*} <p className='_link_hed'>
                    {menuTitle(type)}                   
                </p>*/}




            <ul className='sub_in_link2'>
                {renderMenu(type)}
                {/*<li className='_more'>
                        <Link to="#" title="More">View all City
                            <FaAngleRight />
                        </Link>
                    </li>*/}
            </ul>

        </>
    )
}

export default HeaderNavMenu