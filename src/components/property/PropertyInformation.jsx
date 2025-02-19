/* eslint-disable react/prop-types */
import moment from 'moment'
import { useState, useEffect } from "react";
const PropertyInformation = ({ tabTitle, tabSection, property }) => {
    const [objProperty, setProperty] = useState(property);
    const getPropertyData = JSON.parse(property?.propertyObject)

    useEffect(() => {

    }, []);

    const renderContent = () => {
        if (tabSection === 'Overview') {
            return fetchOverview();
        } else if (tabSection === 'AboutProperty') {
            return fetchAboutProperty();
        } else if (tabSection === 'Details') {
            return fetchPropertyDetails();
        } else if (tabSection === 'Amenities') {
            return fetchAmenities();
        } else if (tabSection === 'MapLocation') {
            return fetchMap();
        } else if (tabSection === 'AdditionalInformation') {
            return fetchAdditionalInformation();
        } else if (tabSection === 'PropertyVideo') {
            return PropertyVideo();
        } else if (tabSection === 'OurService') {
            return OurService();
        } else {
            return fetchDisclaimer();
        }
    };

    function getClassName() {
        let className = "overview-area";
        if (tabSection === 'Overview') {
            className += " overview-area";
        } else if (tabSection === 'AboutProperty') {
            className += " listing-area ";
        } else if (tabSection === 'Details') {
            className += " single-details-box table-responsive";
        } else if (tabSection === 'Amenities') {
            className += " ameniting-box";
        } else if (tabSection === 'MapLocation') {
            className += " map-box";
        } else if (tabSection === 'AdditionalInformation') {
            className += " listing-area";
        } else if (tabSection === 'Disclaimer') {
            className += " listing-area";
        } else if (tabSection === 'PropertyVideo') {
            className += " listing-area";
        } else if (tabSection === 'OurService') {
            className += " listing-area";
        }

        return className;
    };

    function OurService() {
        return (<div className="card-body">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="about-layout1">
                        <div className="item-img">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape23.svg" alt="shape" width="55" height="57" />
                        </div>
                        <h6 className="item-sm-title">Modern Villa</h6>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="about-layout1">
                        <div className="item-img">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape23.svg" alt="shape" width="55" height="57" />
                        </div>
                        <h6 className="item-sm-title">Modern Villa</h6>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6" >
                    <div className="about-layout1">
                        <div className="item-img">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape23.svg" alt="shape" width="55" height="57" />
                        </div>
                        <h6 className="item-sm-title">Modern Villa</h6>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="about-layout1">
                        <div className="item-img">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape23.svg" alt="shape" width="55" height="57" />
                        </div>
                        <h6 className="item-sm-title">Modern Villa</h6>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="about-layout1">
                        <div className="item-img">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape23.svg" alt="shape" width="55" height="57" />
                        </div>
                        <h6 className="item-sm-title">Modern Villa</h6>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6" >
                    <div className="about-layout1">
                        <div className="item-img">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape23.svg" alt="shape" width="55" height="57" />
                        </div>
                        <h6 className="item-sm-title">Modern Villa</h6>
                    </div>
                </div>
            </div>
        </div>)
    }

    function fetchAboutProperty() {
        return (
            <>
                {((property?.category === 'LandOrPlot Sale' || property?.category === 'Residential Sale' || property?.category === 'Commercial Sale') && getPropertyData.ReSaleDetails?.Description) &&
                    <div dangerouslySetInnerHTML={{ __html: getPropertyData.ReSaleDetails?.Description.replace(/\n/g, '<br />') }} />

                }

                {((property?.category === 'Residential Rent' || property?.category === 'Commercial Rent') && getPropertyData.RentalDetails?.Description) &&

                    <div dangerouslySetInnerHTML={{ __html: getPropertyData.RentalDetails?.Description.replace(/\n/g, '<br />') }} />
                }
            </>
        )
    }

    function fetchDisclaimer() {
        return (<div className="card-body">
            {property?.disclaimer &&
                property?.disclaimer
            }
        </div>)
    }

    function PropertyVideo() {
        return (<div className="item-img">
            <img src="/img/blog/listing1.jpg" alt="map" width="731" height="349" />
            <div className="play-button">
                <div className="item-icon">
                    <a href="http://www.youtube.com/watch?v=1iIZeIy7TqM" className="play-btn play-btn-big">
                        <span className="play-icon style-2">
                            <i className="fas fa-play"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>)
    }




    function fetchPropertyDetails() {
        if (property.category === "Residential Rent") {
            return (<table className="table-box1">
                <tbody><tr>
                    <td className="item-bold">Property Type</td>
                    <td>{getPropertyData.property_details?.ApartmentType}</td>

                    <td className="item-bold">OwnershipType</td>
                    <td>{getPropertyData.property_details?.OwnershipType}</td>

                </tr>
                    <tr>
                        <td className="item-bold">PreferredTenants</td>
                        <td>{getPropertyData.RentalDetails?.PreferredTenants}</td>

                        <td className="item-bold">Property Age</td>
                        <td>{getPropertyData.property_details?.PropertyAge}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">BuiltUpArea</td>
                        <td>{getPropertyData.property_details?.builtUpArea}</td>
                        <td className="item-bold">CarpetArea</td>
                        <td>{getPropertyData.property_details?.CarpetArea}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Rent Price</td>

                        {(getPropertyData?.RentalDetails?.PropertyAvailable === 'Only rent' || getPropertyData?.RentalDetails?.PropertyAvailable === 'Only Rent') &&
                            <td>
                                {"₹" + getPropertyData?.RentalDetails?.ExpectedRent + "/month"} ({getPropertyData?.RentalDetails?.PropertyAvailable})
                            </td>
                        }

                        {(getPropertyData?.RentalDetails?.PropertyAvailable === 'Only lease' || getPropertyData?.RentalDetails?.PropertyAvailable === 'Only Lease') &&
                            <td>
                                {"₹" + getPropertyData?.RentalDetails?.LeaseAmount} ({getPropertyData?.RentalDetails?.PropertyAvailable})
                            </td>
                        }
                        <td className="item-bold">Deposite</td>
                        <td>{getPropertyData.RentalDetails?.ExpectedDeposit}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Monthly Maintenance</td>
                        <td>{getPropertyData.RentalDetails?.MaintenanceAmount}</td>
                        <td className="item-bold">Available From</td>
                        <td>{moment(getPropertyData.RentalDetails?.AvailableFrom).format("DD-MMM-YYYY")} </td>
                    </tr>
                    <tr>
                        <td className="item-bold">Facing</td>
                        <td>{getPropertyData.property_details?.Facing}</td>
                        <td className="item-bold">Floor</td>
                        <td>{getPropertyData.property_details?.Floor} / {getPropertyData.property_details?.TotalFloor}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Rooms</td>
                        <td>{getPropertyData.property_details?.BHKType}</td>
                        <td className="item-bold">Bath Rooms</td>
                        <td>{getPropertyData.property_details?.Bathroom}</td>
                    </tr>
                    {/*<td className="item-bold">Property Status</td>*/}
                    {/*<td>{getPropertyData.property_details?.PropertyAge}</td>*/}

                    <tr>
                        <td className="item-bold">Furnishing</td>
                        <td>{getPropertyData.RentalDetails?.Furnishing}</td>
                        <td className="item-bold">Parking</td>
                        <td>{getPropertyData.RentalDetails?.Parking}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Lockin Period (Years)</td>
                        <td>{getPropertyData.RentalDetails?.LockinPeriod}</td>
                        <td className="item-bold">Balcony</td>
                        <td>{getPropertyData.property_details?.Balcony}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">GatedSecurity</td>
                        <td>{getPropertyData.property_details?.GatedSecurity}</td>
                        <td className="item-bold">Lift</td>
                        <td>{getPropertyData.AmenitiesDetails?.Lift}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">WaterSupply</td>
                        <td>{getPropertyData.property_details?.WaterSupply}</td>
                        <td className="item-bold">NonVegAllowed</td>
                        <td>{getPropertyData.property_details?.NonVegAllowed}</td>
                    </tr>
                </tbody></table>)
        } else if (property.category === "Residential Sale") {
            return (<table className="table-box1">
                <tbody><tr>
                    <td className="item-bold">Property Type</td>
                    <td>{getPropertyData.property_details?.ApartmentType}</td>

                    <td className="item-bold">
                        BHK Type</td>
                    <td>{getPropertyData.property_details?.
                        BHKType}</td>



                </tr>
                    <tr>
                        <td className="item-bold">Ownership Type</td>
                        <td>{getPropertyData.property_details?.OwnershipType}</td>

                        <td className="item-bold">Property Age</td>
                        <td>{getPropertyData.property_details?.PropertyAge}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Price</td>

                        <td>
                            {"₹" + getPropertyData?.ReSaleDetails?.ExpectedPrice + "/month"} ({getPropertyData?.ReSaleDetails?.PriceNegotiable})
                        </td>
                        <td className="item-bold">Booking mount</td>
                        <td>{"₹" + getPropertyData.ReSaleDetails?.BookingAmount}</td>
                    </tr>
                    <tr>

                        <td className="item-bold">Kitchen Type</td>
                        <td>{getPropertyData.ReSaleDetails?.Floor} </td>
                        <td className="item-bold">Floor</td>
                        <td>{getPropertyData.property_details?.Floor} / {getPropertyData.property_details?.TotalFloor}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Rooms</td>
                        <td>{getPropertyData.property_details?.BHKType}</td>
                        <td className="item-bold">Bath Rooms</td>
                        <td>{getPropertyData.property_details?.Bathroom}</td>
                    </tr>
                    {/*<td className="item-bold">Property Status</td>*/}
                    {/*<td>{getPropertyData.property_details?.PropertyAge}</td>*/}
                    <tr>
                        <td className="item-bold">BuiltUp Area</td>
                        <td>{getPropertyData.property_details?.builtUpArea}</td>
                        <td className="item-bold">Carpet rea</td>
                        <td>{getPropertyData.property_details?.CarpetArea}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Furnishing</td>
                        <td>{getPropertyData.ReSaleDetails?.Furnishing}</td>
                        <td className="item-bold">Parking</td>
                        <td>{getPropertyData.ReSaleDetails?.Parking}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Facing</td>
                        <td>{getPropertyData.property_details?.Facing}</td>
                        <td className="item-bold">Balcony</td>
                        <td>{getPropertyData.property_details?.Balcony}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">GatedSecurity</td>
                        <td>{getPropertyData.property_details?.GatedSecurity}</td>
                        <td className="item-bold">Lift</td>
                        <td>{getPropertyData.AmenitiesDetails?.Lift}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">WaterSupply</td>
                        <td>{getPropertyData.property_details?.WaterSupply}</td>
                        <td className="item-bold">NonVegAllowed</td>
                        <td>{getPropertyData.property_details?.NonVegAllowed}</td>
                    </tr>
                </tbody></table>)
        } else if (property.category === "Commercial Rent") {
            return (<table className="table-box1">
                <tbody>
                    <tr>
                        <td className="item-bold">Property Type</td>
                        <td>{getPropertyData.property_details?.PropertyType}</td>
                        <td className="item-bold">Property Age</td>
                        <td>{getPropertyData.property_details?.PropertyAge}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Building Type</td>
                        <td>{getPropertyData.property_details?.BuildingType}</td>
                        <td className="item-bold">Ownership Type</td>
                        <td>{getPropertyData.property_details?.Ownership}</td>
                    </tr>

                    <tr>
                        <td className="item-bold">Rent Price</td>

                        {(getPropertyData?.RentalDetails?.PropertyAvailable === 'Only Rent' || getPropertyData?.RentalDetails?.PropertyAvailable === 'Only Rent') &&
                            <td>
                                {"₹" + getPropertyData?.RentalDetails?.ExpectedRent + "/month"} ({getPropertyData?.RentalDetails?.PropertyAvailable})
                            </td>
                        }

                        {(getPropertyData?.RentalDetails?.PropertyAvailable === 'Only lease' || getPropertyData?.RentalDetails?.PropertyAvailable === 'Only Lease') &&
                            <td>
                                {"₹" + getPropertyData?.RentalDetails?.LeaseAmount} ({getPropertyData?.RentalDetails?.PropertyAvailable})
                            </td>
                        }




                        <td className="item-bold">Deposite</td>
                        <td>{getPropertyData.RentalDetails?.ExpectedDeposit}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Floor</td>
                        <td>{getPropertyData.property_details?.Floor} / {getPropertyData.property_details?.TotalFloor}</td>
                        <td className="item-bold">Bath Rooms</td>
                        <td>{getPropertyData.property_details?.Bathroom}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">BuiltUpArea</td>
                        <td>{getPropertyData.property_details?.builtUpArea}</td>
                        <td className="item-bold">CarpetArea</td>
                        <td>{getPropertyData.property_details?.CarpetArea}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Furnishing</td>
                        <td>{getPropertyData.property_details?.Furnishing}</td>
                        <td className="item-bold">Parking</td>
                        <td>{getPropertyData.AmenitiesDetails?.CommercialParking}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Facing</td>
                        <td>{getPropertyData.property_details?.Facing}</td>
                        <td className="item-bold">Balcony</td>
                        <td>{getPropertyData.property_details?.Balcony}</td>
                    </tr>


                </tbody></table>)
        } else if (property.category === "Commercial Sale") {
            return (<table className="table-box1">
                <tbody>
                    <tr>
                        <td className="item-bold">Property Type</td>
                        <td>{getPropertyData.property_details?.PropertyType}</td>
                        <td className="item-bold">Building Type</td>
                        <td>{getPropertyData.property_details?.BuildingType}</td>
                    </tr>

                    <tr>
                        <td className="item-bold">Property Age</td>
                        <td>{getPropertyData.property_details?.PropertyAge}</td>
                        <td className="item-bold">OwnershipType</td>
                        <td>{getPropertyData.property_details?.Ownership}</td>

                    </tr>

                    <tr>
                        <td className="item-bold">Price</td>
                        <td>
                            {"₹" + getPropertyData?.ReSaleDetails?.ExpectedPrice}
                        </td>

                        <td className="item-bold">Deposite</td>
                        <td>{getPropertyData.ReSaleDetails?.BookingAmount}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Floor</td>
                        <td>{getPropertyData.property_details?.Floor} / {getPropertyData.property_details?.TotalFloor}</td>
                        <td className="item-bold">Bath Rooms</td>
                        <td>{getPropertyData.property_details?.Bathroom}</td>
                    </tr>


                    <tr>
                        <td className="item-bold">BuiltUp Area</td>
                        <td>{getPropertyData.property_details?.builtUpArea}</td>
                        <td className="item-bold">Carpet Area</td>
                        <td>{getPropertyData.property_details?.CarpetArea}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Furnishing</td>
                        <td>{getPropertyData.property_details?.Furnishing}</td>
                        <td className="item-bold">Parking</td>
                        <td>{getPropertyData.AmenitiesDetails?.CommercialParking}</td>
                    </tr>

                    <tr>
                        <td className="item-bold">Security</td>
                        <td>{getPropertyData.AmenitiesDetails?.Security}</td>
                        <td className="item-bold">Lift</td>
                        <td>{getPropertyData.AmenitiesDetails?.Lift}</td>
                    </tr>

                </tbody></table>)
        } else if (property.category === "LandOrPlot Sale") {
            return (<table className="table-box1">
                <tbody><tr>
                    <td className="item-bold">Property Type</td>
                    <td>{getPropertyData.LandDetails?.PropertyType}</td>
                    <td className="item-bold">OwnershipType</td>
                    <td>{getPropertyData.LandDetails?.Ownership}</td>
                </tr>
                    <tr>
                        <td className="item-bold">Price</td>
                        <td>  {"₹" + getPropertyData?.ReSaleDetails?.ExpectedPrice} {getPropertyData?.ReSaleDetails?.PriceNegotiable}</td>
                        <td className="item-bold">Booking Amount</td>
                        <td>{"₹" + getPropertyData.ReSaleDetails?.BookingAmount}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">Available From</td>
                        <td> {moment(getPropertyData?.ReSaleDetails?.AvailableFromResale).format("DD-MMM-YYYY")} { }</td>
                        <td className="item-bold">Sale Type</td>
                        <td>{getPropertyData.LandDetails?.SaleType}</td>

                    </tr>
                    <tr>
                        <td className="item-bold">Currently UnderLoan</td>
                        <td>{getPropertyData.ReSaleDetails?.CurrentlyUnderLoan}</td>
                        <td className="item-bold">IS MultiplePlots</td>
                        <td>{getPropertyData.LandDetails?.ISMultiplePlots}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">PlotArea</td>
                        <td>{getPropertyData.LandDetails?.PlotArea} {getPropertyData.LandDetails?.LandUnits}</td>
                        <td className="item-bold">Width * Length</td>
                        <td>{getPropertyData.LandDetails?.PlotWidth} * {getPropertyData.LandDetails?.PlotLength}</td>
                    </tr>
                    <tr>
                        <td className="item-bold">BoundaryWall</td>
                        <td>{getPropertyData.LandDetails?.BoundaryWall}</td>
                        <td className="item-bold">GatedSecurity</td>
                        <td>{getPropertyData.LandDetails?.GatedSecurity}</td>
                    </tr>
                </tbody></table>)
        } else {
            return "Wrong Section!";
        }



    }


    function fetchMap() {
        return (<div className="item-map">
            {(getPropertyData?.LocalityDetails?.landmark) &&
                <iframe className="w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31099.803872209053!2d77.70488290468712!3d13.005364603014906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11abc8ffe3e7%3A0xd8368746c98e53bf!2sKrishnarajapuram%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1719839034377!5m2!1sen!2sin" style={{ "border": "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            }
        </div>)
    }

    function fetchOverview() {
        return (<div className="gallery-icon-box">
            {(property?.category === 'Residential Rent' || property?.category === 'Commercial Rent' && getPropertyData.property_details?.PropertyAge) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-building"></i>
                    </div>
                    <ul className="item-number">
                        <li>Property Age </li>
                        <li className="deep-clr ">{getPropertyData.property_details?.PropertyAge}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Rent' && getPropertyData.RentalDetails?.PreferredTenants) &&

                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-users icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Preferred Tenants </li>
                        <li className="deep-clr">{getPropertyData.RentalDetails?.PreferredTenants}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Rent' || property?.category === 'Commercial Rent' && getPropertyData.property_details?.Floor) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-layer-group icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Floor </li>
                        <li className="deep-clr">{getPropertyData.property_details?.Floor} / {getPropertyData.property_details?.TotalFloor}</li>
                    </ul>
                </div>
            }
            {((property?.category === 'Residential Rent' || property?.category === 'Commercial Rent') && (getPropertyData.RentalDetails?.Furnishing || getPropertyData.property_details?.Furnishing)) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-couch icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Furnishing</li>
                        <li className="deep-clr">{getPropertyData.RentalDetails?.Furnishing} {getPropertyData.property_details?.Furnishing}</li>
                    </ul>
                </div>
            }
            {((property?.category === 'Residential Rent' || property?.category === 'Commercial Rent') && (getPropertyData.RentalDetails?.Parking || getPropertyData.AmenitiesDetails?.CommercialParking)) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-parking icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Parking</li>
                        <li className="deep-clr">{getPropertyData.RentalDetails?.Parking} {getPropertyData.AmenitiesDetails?.CommercialParking}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Rent' && getPropertyData.property_details?.Facing) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-compass icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Facing</li>
                        <li className="deep-clr">{getPropertyData.property_details?.Facing}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Rent' && getPropertyData.property_details?.WaterSupply) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-faucet"></i>
                    </div>
                    <ul className="item-number">
                        <li>Water Supply</li>
                        <li className="deep-clr">{getPropertyData.property_details?.WaterSupply}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Rent' && getPropertyData.property_details?.Bathroom) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-bath icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Bathroom </li>
                        <li className="deep-clr">{getPropertyData.property_details?.Bathroom}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Rent' && getPropertyData.property_details?.Balcony) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-archway icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Balcony</li>
                        <li className="deep-clr">{getPropertyData.property_details?.Balcony}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Rent' && getPropertyData.property_details?.FloorType) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-grip-horizontal icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Floor Type</li>
                        <li className="deep-clr">{getPropertyData.property_details?.FloorType}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Rent' && getPropertyData.property_details?.NonVegAllowed) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-utensils icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Non VegAllowed </li>
                        <li className="deep-clr">{getPropertyData.property_details?.NonVegAllowed}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Rent' && getPropertyData.property_details?.GatedSecurity) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-shield-alt icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Gated Security</li>
                        <li className="deep-clr">{getPropertyData.property_details?.GatedSecurity}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Rent' && getPropertyData.AmenitiesDetails?.PowerBackup) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-battery-full icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Power Backup </li>
                        <li className="deep-clr">{getPropertyData.AmenitiesDetails?.PowerBackup}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Rent' && getPropertyData.AmenitiesDetails?.Lift) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-elevator icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Lift</li>
                        <li className="deep-clr">{getPropertyData.AmenitiesDetails?.Lift}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Rent' && getPropertyData.AmenitiesDetails?.Washroom) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-toilet icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Washroom </li>
                        <li className="deep-clr">{getPropertyData.AmenitiesDetails?.Washroom}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Rent' && getPropertyData.AmenitiesDetails?.WaterStorageFacility) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-tint icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Water Storage Facility</li>
                        <li className="deep-clr">{getPropertyData.AmenitiesDetails?.WaterStorageFacility}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Rent' && getPropertyData.AmenitiesDetails?.Security) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-shield-alt icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Security </li>
                        <li className="deep-clr">{getPropertyData.AmenitiesDetails?.Security}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Rent' && getPropertyData.AmenitiesDetails?.Wifi) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-wifi icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Wifi </li>
                        <li className="deep-clr">{getPropertyData.AmenitiesDetails?.Wifi}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Rent' && getPropertyData.AmenitiesDetails?.SimilarUnits) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-building icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Similar Units </li>
                        <li className="deep-clr">{getPropertyData.AmenitiesDetails?.SimilarUnits}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Sale' && getPropertyData.property_details?.PropertyType) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-building"></i>
                    </div>
                    <ul className="item-number">
                        <li>PropertyType</li>
                        <li className="deep-clr">{getPropertyData.property_details?.PropertyType}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Sale' && getPropertyData.property_details?.BuildingType) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-building"></i>
                    </div>
                    <ul className="item-number">
                        <li>Building Type</li>
                        <li className="deep-clr">{getPropertyData.property_details?.BuildingType}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Sale' || property?.category === 'Commercial Sale' && getPropertyData.property_details?.PropertyAge) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-building"></i>
                    </div>
                    <ul className="item-number">
                        <li>Property Age </li>
                        <li className="deep-clr">{getPropertyData.property_details?.PropertyAge}</li>
                    </ul>
                </div>
            }
            {((property?.category === 'Residential Sale' || property?.category === 'Commercial Sale') && (getPropertyData.property_details?.OwnershipType || getPropertyData.property_details?.Ownership)) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-key icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Ownership </li>
                        <li className="deep-clr">{getPropertyData.property_details?.OwnershipType} {getPropertyData.property_details?.Ownership}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Sale' || property?.category === 'Commercial Sale' && getPropertyData.property_details?.Floor) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-layer-group icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Floor</li>
                        <li className="deep-clr">{getPropertyData.property_details?.Floor} / {getPropertyData.property_details?.TotalFloor}</li>
                    </ul>
                </div>
            }

            {((property?.category === 'Residential Sale' || property?.category === 'Commercial Sale') && (getPropertyData.property_details?.Furnishing || getPropertyData.ReSaleDetails?.Furnishing)) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-couch icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Furnishing </li>
                        <li className="deep-clr">{getPropertyData.property_details?.Furnishing} {getPropertyData.ReSaleDetails?.Furnishing}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Commercial Sale' && getPropertyData.property_details?.builtUpArea) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-building"></i>
                    </div>
                    <ul className="item-number">
                        <li>Builtup</li>
                        <li className="deep-clr">{getPropertyData.property_details?.builtUpArea} Sqft</li>
                    </ul>
                </div>
            }
            {((property?.category === 'Residential Sale' || property?.category === 'Commercial Sale') && (getPropertyData.property_details?.Parking || getPropertyData.ReSaleDetails?.Parking)) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-parking icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Parking</li>
                        <li className="deep-clr">{getPropertyData.property_details?.Parking} {getPropertyData.ReSaleDetails?.Parking}</li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Sale' && getPropertyData.ReSaleDetails?.KitchenType) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-utensils"></i>
                    </div>
                    <ul className="item-number">
                        <li>KitchenType </li>
                        <li className="deep-clr">{getPropertyData.ReSaleDetails?.KitchenType} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Sale' && getPropertyData.property_details?.Facing) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-compass icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Facing </li>
                        <li className="deep-clr">{getPropertyData.property_details?.Facing} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Sale' && getPropertyData.property_details?.Bathroom) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-bath icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Bathroom </li>
                        <li className="deep-clr">{getPropertyData.property_details?.Bathroom} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Sale' && getPropertyData.property_details?.Balcony) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-archway icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Balcony </li>
                        <li className="deep-clr">{getPropertyData.property_details?.Balcony}  </li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Sale' && getPropertyData.property_details?.FloorType) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-grip-horizontal icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Floor Type</li>
                        <li className="deep-clr">{getPropertyData.property_details?.FloorType}  </li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Sale' && getPropertyData.property_details?.WaterSupply) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-faucet"></i>
                    </div>
                    <ul className="item-number">
                        <li>Water Supply </li>
                        <li className="deep-clr">{getPropertyData.property_details?.WaterSupply}  </li>
                    </ul>
                </div>
            }
            {(property?.category === 'Residential Sale' && getPropertyData.property_details?.GatedSecurity) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-shield-alt icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Gated Security</li>
                        <li className="deep-clr">{getPropertyData.property_details?.GatedSecurity} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.PropertyType) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-home icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Property Type </li>
                        <li className="deep-clr">{getPropertyData.LandDetails?.PropertyType} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.Ownership) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-key icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Ownership  </li>
                        <li className="deep-clr">{getPropertyData.LandDetails?.Ownership} </li>
                    </ul>
                </div>
            }

            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.SaleType) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-tags icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Sale Type  </li>
                        <li className="deep-clr">{getPropertyData.LandDetails?.SaleType} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.PlotArea) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-home icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Builtup</li>
                        <li className="deep-clr">{getPropertyData.LandDetails?.PlotArea}  {getPropertyData.LandDetails?.LandUnits}  </li>
                    </ul>
                </div>
            }
            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.PlotWidth) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-expand icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Width and Length  </li>
                        <li className="deep-clr">{getPropertyData.LandDetails?.PlotWidth}* {getPropertyData.LandDetails?.PlotLength}s </li>
                    </ul>
                </div>
            }
            {(property?.category === 'LandOrPlot Sale' && getPropertyData.AmenitiesDetails?.RoadWidth) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-road icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Road Width  </li>
                        <li className="deep-clr">{getPropertyData.AmenitiesDetails?.RoadWidth} </li>
                    </ul>
                </div>
            }


            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.BoundaryWall) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-border-style icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Boundary Wall  </li>
                        <li className="deep-clr">{getPropertyData.LandDetails?.BoundaryWall} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.GatedSecurity) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-shield-alt icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Gated Security  </li>
                        <li className="deep-clr">{getPropertyData.LandDetails?.GatedSecurity} </li>
                    </ul>
                </div>
            }

            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.FloorsAllowed) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-layer-group icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Floors Allowed  </li>
                        <li className="deep-clr">{getPropertyData.LandDetails?.FloorsAllowed} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'LandOrPlot Sale' && getPropertyData.ReSaleDetails?.CurrentlyUnderLoan) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-hand-holding-usd icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Currently UnderLoan   </li>
                        <li className="deep-clr">{getPropertyData.ReSaleDetails?.CurrentlyUnderLoan} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.ISMultiplePlots) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-copy icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>IS MultiplePlots  </li>
                        <li className="deep-clr">{getPropertyData.LandDetails?.ISMultiplePlots} </li>
                    </ul>
                </div>
            }
            {(property?.category === 'LandOrPlot Sale' && getPropertyData.LandDetails?.ISMultiplePlots) &&
                <div className="item-icon-box">
                    <div className="item-icon">
                        <i className="fas fa-copy icon"></i>
                    </div>
                    <ul className="item-number">
                        <li>Khata Certificate  </li>
                        <li className="deep-clr">{getPropertyData.AdditionalInfo?.KhataCertificate} </li>
                    </ul>
                </div>
            }

        </div>)
    }

    const isValidJson = (jsonString) => {
        try {
            const jsonObject = JSON.parse(jsonString);
            return jsonObject && typeof jsonObject === 'object';
        } catch (e) {
            return false;
        }
    };

    function fetchAdditionalInformation() {
        return (<>
            <div id="additional-information" className="col-12">
                <div className="row row-cards mt-4">
                    {((property?.category === 'LandOrPlot Sale' || property?.category === 'Residential Sale') && getPropertyData.AdditionalInfo?.KhataCertificate) &&

                        <div className="col-lg-4 col-md-4">
                            <div className="about-svg-shape">
                                <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                                <div className="item-content">
                                    <div className="item-content">
                                        <div className="item-content__text">
                                            <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AdditionalInfo?.KhataCertificate}</span></div>
                                        </div>
                                        <p>KhataCertificate </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    }
                    {((property?.category === 'LandOrPlot Sale' || property?.category === 'Residential Sale') && getPropertyData.AdditionalInfo?.ConversionCertificate) &&



                        <div className="col-lg-4 col-md-4">
                            <div className="about-svg-shape">
                                <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                                <div className="item-content">
                                    <div className="item-content">
                                        <div className="item-content__text">
                                            <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AdditionalInfo?.ConversionCertificate}</span></div>
                                        </div>
                                        <p>Conversion Certificate </p>
                                    </div>
                                </div>
                            </div>
                        </div>



                    }
                    {((property?.category === 'LandOrPlot Sale' || property?.category === 'Residential Sale') && getPropertyData.AdditionalInfo?.EncumbranceCertificate) &&

                        <div className="col-lg-4 col-md-4">
                            <div className="about-svg-shape">
                                <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                                <div className="item-content">
                                    <div className="item-content">
                                        <div className="item-content__text">
                                            <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AdditionalInfo?.EncumbranceCertificate}</span></div>
                                        </div>
                                        <p>Encumbrance Certificate  </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    }
                    {((property?.category === 'LandOrPlot Sale' || property?.category === 'Residential Sale') && getPropertyData.AdditionalInfo?.SaleDeedCertificate) &&

                        <div className="col-lg-4 col-md-4">
                            <div className="about-svg-shape">
                                <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                                <div className="item-content">
                                    <div className="item-content">
                                        <div className="item-content__text">
                                            <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AdditionalInfo?.SaleDeedCertificate}</span></div>
                                        </div>
                                        <p>SaleDeed Certificate   </p>
                                    </div>
                                </div>
                            </div>
                        </div>



                    }
                    {((property?.category === 'LandOrPlot Sale' || property?.category === 'Residential Sale') && getPropertyData.AdditionalInfo?.ReraApproved) &&

                        <div className="col-lg-4 col-md-4">
                            <div className="about-svg-shape">
                                <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                                <div className="item-content">
                                    <div className="item-content">
                                        <div className="item-content__text">
                                            <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AdditionalInfo?.ReraApproved == "Yes" ? (getPropertyData.AdditionalInfo?.ReraApproved + "(" + getPropertyData.AdditionalInfo?.RERANumber + ")") : getPropertyData.AdditionalInfo?.ReraApproved}</span></div>
                                        </div>
                                        <p>ReraApproved    </p>
                                    </div>
                                </div>
                            </div>
                        </div>



                    }
                    {(property?.category === 'Commercial Sale' && getPropertyData.AdditionalInfo?.PreviousOccupancy) &&

                        <div className="col-lg-4 col-md-4">
                            <div className="about-svg-shape">
                                <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                                <div className="item-content">
                                    <div className="item-content">
                                        <div className="item-content__text">
                                            <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AdditionalInfo?.PreviousOccupancy}</span></div>
                                        </div>
                                        <p>PreviousOccupancy    </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    }
                    {(property?.category === 'Residential Sale' && getPropertyData.AdditionalInfo?.PropertyTax) &&

                        <div className="col-lg-4 col-md-4">
                            <div className="about-svg-shape">
                                <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                                <div className="item-content">
                                    <div className="item-content">
                                        <div className="item-content__text">
                                            <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AdditionalInfo?.PropertyTax}</span></div>
                                        </div>
                                        <p>PropertyTax    </p>
                                    </div>
                                </div>
                            </div>
                        </div>



                    }
                    {(property?.category === 'Commercial Sale' && getPropertyData.AdditionalInfo?.IdealFor) &&


                        <div className="col-lg-4 col-md-4">
                            <div className="about-svg-shape">
                                <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                                <div className="item-content">
                                    <div className="item-content">
                                        <div className="item-content__text">
                                            <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AdditionalInfo?.IdealFor}</span></div>
                                        </div>
                                        <p>Ideal For    </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    }

                </div>
            </div>
        </>
        )
    }


    function fetchAmenities() {
        console.log("fetchAmenities")
        console.log(getPropertyData?.AmenitiesDetails)

        const columns = [[], [], []];
        if (getPropertyData?.AmenitiesDetails && (property?.category === 'Residential Rent' || property?.category === 'Residential Sale')) {
            const parsedData = getPropertyData?.AmenitiesDetails.map((item) => JSON.parse(item));
            parsedData.forEach((item, index) => {
                columns[index % 3].push(item); // Distribute items cyclically across the 3 columns
            });
        }
        return (<>

            <div className="row">
                {(property?.category === 'Residential Sale' || property?.category === 'Residential Rent') && columns?.map((column, columnIndex) => {

                    return (
                        <div className="col-lg-4" key={columnIndex} >
                            <ul className="ameniting-list">
                                {column.map((item, index) => (
                                    <li key={index}><i className="fas fa-check-circle"></i>{item.name}</li>

                                ))}
                            </ul>
                        </div>

                    );

                })}

                {/* {(property?.category === 'Residential Sale' || property?.category === 'Residential Rent') && getPropertyData?.AmenitiesDetails?.map((item, index) => {
                        return (
                            <div className="col-3 col-sm-3 col-lg-2" key={index}>
                                <div className="card">
                                    <div className="card-body p-3 text-center">
                                        <div className="h4 m-0">{item}</div>
                                        <p className="text  mb-4" color="gray">{item}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })} */}
                {((property?.category === 'Commercial Rent' || property?.category === 'Commercial Sale') && getPropertyData.AmenitiesDetails?.PowerBackup) &&



                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src={"/svgs/power-bank-svgrepo-com.svg"} className="Features-icon" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AmenitiesDetails?.PowerBackup}</span></div>
                                    </div>
                                    <p>PowerBackup </p>
                                </div>
                            </div>
                        </div>
                    </div>



                }
                {((property?.category === 'Commercial Rent' || property?.category === 'Commercial Sale') && getPropertyData.AmenitiesDetails?.Lift) &&

                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src={"/svgs/lift-elevator-svgrepo-com.svg"} className="Features-icon" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AmenitiesDetails?.Lift}</span></div>
                                    </div>
                                    <p>Lift </p>
                                </div>
                            </div>
                        </div>
                    </div>


                }
                {((property?.category === 'Commercial Rent' || property?.category === 'Commercial Sale') && getPropertyData.AmenitiesDetails?.CommercialParking) &&

                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src={"/svgs/parking-svgrepo-com.svg"} className="Features-icon" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AmenitiesDetails?.CommercialParking}</span></div>
                                    </div>
                                    <p>CommercialParking </p>
                                </div>
                            </div>
                        </div>
                    </div>


                }
                {((property?.category === 'Commercial Rent' || property?.category === 'Commercial Sale') && getPropertyData.AmenitiesDetails?.Washroom) &&


                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src={"/svgs/wc-washroom-svgrepo-com.svg"} className="Features-icon" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AmenitiesDetails?.Washroom}</span></div>
                                    </div>
                                    <p>Washroom </p>
                                </div>
                            </div>
                        </div>
                    </div>



                }
                {((property?.category === 'Commercial Rent' || property?.category === 'Commercial Sale') && getPropertyData.AmenitiesDetails?.WaterStorageFacility) &&
                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src="/svgs/plumbering-water-supply-svgrepo-com.svg" alt="svg" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55">  {getPropertyData.AmenitiesDetails?.WaterStorageFacility}</span></div>
                                    </div>
                                    <p>WaterStorageFacility </p>
                                </div>
                            </div>
                        </div>
                    </div>


                }
                {((property?.category === 'Commercial Rent' || property?.category === 'Commercial Sale') && getPropertyData.AmenitiesDetails?.Security) &&


                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src="/svgs/security-svgrepo-com.svg" alt="svg" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55"> {getPropertyData.AmenitiesDetails?.Security}</span></div>
                                    </div>
                                    <p>Security </p>
                                </div>
                            </div>
                        </div>
                    </div>



                }
                {((property?.category === 'Commercial Rent' || property?.category === 'Commercial Sale') && getPropertyData.AmenitiesDetails?.Wifi) &&

                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src="/svgs/wifi-1029-svgrepo-com.svg" alt="svg" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55"> {getPropertyData.AmenitiesDetails?.Wifi}</span></div>
                                    </div>
                                    <p>Wifi </p>
                                </div>
                            </div>
                        </div>
                    </div>


                }
                {((property?.category === 'Commercial Rent' || property?.category === 'Commercial Sale') && getPropertyData.AmenitiesDetails?.SimilarUnits) &&



                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src="/svgs/multiple-defenses-svgrepo-com.svg" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AmenitiesDetails?.SimilarUnits}</span></div>
                                    </div>
                                    <p>SimilarUnits </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }


                {(property?.category === 'LandOrPlot Sale' && getPropertyData.AmenitiesDetails?.WaterSupply) &&



                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AmenitiesDetails?.WaterSupply}</span></div>
                                    </div>
                                    <p>Water Supply</p>
                                </div>
                            </div>
                        </div>
                    </div>

                }
                {(property?.category === 'LandOrPlot Sale' && getPropertyData.AmenitiesDetails?.ElectricityConnection) &&

                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AmenitiesDetails?.ElectricityConnection}</span></div>
                                    </div>
                                    <p>Electricity Connection</p>
                                </div>
                            </div>
                        </div>
                    </div>


                }
                {(property?.category === 'LandOrPlot Sale' && getPropertyData.AmenitiesDetails?.SewageConnection) &&

                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55">{getPropertyData.AmenitiesDetails?.SewageConnection} </span></div>
                                    </div>
                                    <p>Sewage Connection</p>
                                </div>
                            </div>
                        </div>
                    </div>


                }
                {(property?.category === 'LandOrPlot Sale' && getPropertyData.AmenitiesDetails?.RoadWidth) &&

                    <div className="col-lg-4 col-md-4">
                        <div className="about-svg-shape">
                            <img src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg" alt="svg" />
                            <div className="item-content">
                                <div className="item-content">
                                    <div className="item-content__text">
                                        <div className="item-k"><span className="counterUp" data-counter="55"> {getPropertyData.AmenitiesDetails?.RoadWidth} </span></div>
                                    </div>
                                    <p>RoadWidth </p>
                                </div>
                            </div>
                        </div>
                    </div>

                }

            </div>

        </>
        )
    }

    return (<div className={getClassName()}>
        <h3 className="item-title">{tabTitle}</h3>

        {renderContent()}

    </div>
    )
}
export default PropertyInformation