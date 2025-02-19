import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";

import JPOapi from "../../common";
import fetchHomePageProperties from "../../common/property/getHomePagePropertiesData";
import PropertyCard from "./PropertyCard";

const PropertyHighlights = ({ headline, userId, url, template }) => {
    const [pickedData, setPickedData] = useState([]);
    const [viewAllLink, setViewAllLink] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const storageKey = headline.replace(/ /g, "");
            let linkViewAll = "";
            let fetchedData = null;
            try {
                const storedData = localStorage.getItem(storageKey);
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    setPickedData(parsedData);
                    setViewAllLink(`property-list/${url}`);
                    console.log(`Fetched ${headline} data from localStorage.`);
                } else {
                    let _url = "";
                    switch (headline) {
                        case "Latest Our Residential Rental Post":
                            _url = `${JPOapi.GetPropertyResidentialRentals.url}?cityName=&Category=Residential%20Rent&pageNumber=1&pageSize=10`;
                            fetchedData = await fetchHomePageProperties(_url, userId);
                            linkViewAll = "/property-list/Residential_Rentals";
                            break;
                        case "Latest Our Commerical Rental Post":
                            _url = `${JPOapi.GetPropertyCommercialRentals.url}?cityName=&Category=Commercial%20Rent&pageNumber=1&pageSize=10`;
                            fetchedData = await fetchHomePageProperties(_url, userId);
                            linkViewAll = "/property-list/Commercial_Rentals";
                            break;
                        case "Latest Our Residential Sales Post":
                            _url = `${JPOapi.GetPropertyResidentialSales.url}?cityName=&Category=Residential%20Sale&pageNumber=1&pageSize=10`;
                            fetchedData = await fetchHomePageProperties(_url, userId);
                            linkViewAll = "/property-list/Residential_sales";
                            break;
                        case "Latest Our Commercial Sales Post":
                            _url = `${JPOapi.GetPropertyCommercialSales.url}?cityName=&Category=Commercial%20Sale&pageNumber=1&pageSize=10`;
                            fetchedData = await fetchHomePageProperties(_url, userId);
                            linkViewAll = "/property-list/Commercial_Sales";
                            break;
                        case "Latest Our Land or Plot Sales Post":
                            _url = `${JPOapi.GetPropertyPlotSales.url}?cityName=&Category=LandOrPlot%20Sale&pageNumber=1&pageSize=10`;
                            fetchedData = await fetchHomePageProperties(_url, userId);
                            linkViewAll = "/property-list/PlotSales";
                            break;
                        default:
                            break;
                    }
                    if (fetchedData && fetchedData.length > 0) {
                        setPickedData(fetchedData);
                        setViewAllLink(linkViewAll);
                        localStorage.setItem(storageKey, JSON.stringify(fetchedData));
                        console.log(
                            `Fetched ${headline} data from API and stored in localStorage.`
                        );
                    } else {
                        console.error(`No data found for ${headline}`);
                    }
                }
            } catch (error) {
                console.error(`Error fetching ${headline}:`, error);
            }
        };
        fetchData();
    }, [headline, userId, url]);

    const renderContent = () => {
        if (template === "Landing") {
            return Landing();
        } else if (template === "Blog") {
            return Blog();
        } else {
            return <div>No Match</div>;
        }
    };

    function Landing() {
        return (
            <section className="property-wrap1">
                <div className="container">
                    <div className="isotope-wrap">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-5 col-sm-12">
                                <div className="item-heading-left">
                                    <span className="section-subtitle">Our PROPERTIES</span>
                                    <h2 className="section-title">Latest Properties</h2>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-7 col-sm-12">
                                <div className="isotope-classes-tab text-md-end text-center">
                                    <a className="nav-item current">New Apartment's</a>
                                    <a className="nav-item">Builder's Project</a>
                                    <a className="nav-item">Resale Property</a>
                                </div>
                            </div>
                        </div>
                        <div className="row featuredContainer">
                            {pickedData.map((item, index) => (
                                <div
                                    className="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                                    key={index}
                                >
                                    <div className="property-box2 wow fadeInUp animated">
                                        <div className="item-img">
                                            <a href={`/property/${item.propertyID}`}>
                                                <img
                                                    src={
                                                        JSON.parse(item.propertyObject)?.GalleryDetails?.[0] || ""
                                                    }
                                                    alt="property"
                                                    className="img-fluid"
                                                />
                                            </a>
                                        </div>
                                        <div className="item-content">
                                            <h3 className="item-title">
                                                <a href={`/property/${item.propertyID}`}>{item.propertyTitle}</a>
                                            </h3>
                                            <div className="location-area">
                                                <i className="fas fa-map-marker-alt"></i>
                                                {JSON.parse(item.propertyObject)?.LocalityDetails?.city || ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }


    function Blog() {
        return (<>
            {pickedData &&
                pickedData.map((item, index) => (
                    <div className="widget-listing no-brd" key={index} >
                        <div className="item-img">


                            <a target="_blank" width="120" height="102" href={"/property/" + item.category.split(" ").join("/").toLowerCase() + "/" + item.propertyTitle + "/" + item.propertyID + "/detail?justpayowners=" + item.category.split(" ").join("_").toLowerCase() + "_list"} >

                                <img src={JSON.parse(item.propertyObject)?.GalleryDetails != undefined ? JSON.parse(item.propertyObject)?.GalleryDetails[0] : ""} alt='widget'
                                    width={'120'}
                                    height={'102'}
                                />
                            </a>

                        </div>
                        <div className="item-content">
                            <h5 className="item-title">
                                <a target="_blank" className="text-color" href={"/property/" + item.category.split(" ").join("/").toLowerCase() + "/" + item.propertyTitle + "/" + item.propertyID + "/detail?justpayowners=" + item.category.split(" ").join("_").toLowerCase() + "_list"} >
                                    {item?.propertyTitle}</a>
                            </h5>
                            <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>

                                {JSON.parse(item.propertyObject)?.LocalityDetails?.landmark ? JSON.parse(item.propertyObject)?.LocalityDetails?.landmark + ", " : ""}
                                {JSON.parse(item.propertyObject)?.LocalityDetails?.street ? JSON.parse(item.propertyObject)?.LocalityDetails?.street + ", " : ""}
                                {JSON.parse(item.propertyObject)?.LocalityDetails?.locality ? JSON.parse(item.propertyObject)?.LocalityDetails?.locality + ", " : ""}
                                {JSON.parse(item.propertyObject)?.LocalityDetails?.city ? JSON.parse(item.propertyObject)?.LocalityDetails?.city + ", " : ""}
                                {JSON.parse(item.propertyObject)?.LocalityDetails?.state ? JSON.parse(item.propertyObject)?.LocalityDetails?.state + ", " : ""}


                            </div>
                            <div className="item-price">
                                $ {item.expectedRent}
                                <span><i>/</i>month</span>
                            </div>
                        </div>
                    </div>
                )
                )}
        </>)
    }

    return <>{renderContent()}</>;
};

export default PropertyHighlights;
