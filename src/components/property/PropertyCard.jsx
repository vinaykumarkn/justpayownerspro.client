import React, { useState, useEffect } from 'react';

const PropertyCard = (props) => {
    const [listed, setListed] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            $(".match-height").matchHeight();
            $(".match-height1").matchHeight();
        }, 1000);

        return () => clearTimeout(timeout); // Cleanup timeout
    }, []);

    const addToWishlist = () => {
        setListed((prevListed) => !prevListed);
    };

    const url = `url(${props.url})`;
    const {
        discount,
        cashback,
        currency,
        lastPrice,
        ratings,
        stars,
        city,
        about,
        showMore,
        highlight,
        type,
        data,
        propertyObject,
        propertyTitle,
        propertyID,
        category,
        price,
    } = props;

    const style = listed
        ? {
            color: '#f43361',
            fontSize: '20px',
            position: 'absolute',
            right: '10px',
            top: '15px',
            fontWeight: '700',
            transition: 'transform 0.3s ease-in-out',
        }
        : {
            color: 'white',
            fontSize: '20px',
            position: 'absolute',
            right: '10px',
            top: '15px',
            fontWeight: '400',
            transition: 'transform 0.3s ease-in-out',
        };

    const getViewDetailsLink = (type, title, id) => {
        const encodedTitle = title.replace("/", "_");
        const baseUrl = `/property/${type}/${id}/detail?justpayowners=`;
        const map = {
            "Residential Rent": "residential_rent_list",
            "Commercial Rent": "commercial_rent_list",
            "Residential Sale": "residential_buy_list",
            "Commercial Sale": "commercial_buy_list",
            "LandOrPlot Sale": "plot_buy_list",
        };
        return `${baseUrl}${map[category] || ""}`;
    };

    return (
        <div className="exp-card match-height">
            {type === 'dynamic' ? (
                <>
                    <div className="row featuredContainer" style={{ position: "relative", height: "869.094px" }}>
                        <div className="col-xl-4 col-lg-6 col-md-6 for-sell" style={{ position: "absolute", left: "0px", top: "0px" }}>
                            <div className="property-box2 wow  fadeInUp" data-wow-delay=".3s" style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeInUp" }}>
                                <div className="item-img">
                                    <a href="single-listing1.html"><img src="https://radiustheme.com/demo/html/homlisti/img/blog/blog4.jpg" alt="blog" width="510" height="340" /></a>
                                    <div className="item-category-box1">
                                        <div className="item-category">For Sell</div>
                                    </div>
                                    <div className="rent-price">
                                        <div className="item-price">$15,000<span><i>/</i>mo</span></div>
                                    </div>
                                    <div className="react-icon">
                                        <ul>
                                            <li>
                                                <a href="favourite.html" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Favourites">
                                                    <i className="flaticon-heart"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="compare.html" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                    <i className="flaticon-left-and-right-arrows"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item-category10"><a href="single-listing1.html">Appartment</a></div>
                                <div className="item-content">
                                    <div className="verified-area">
                                        <h3 className="item-title"><a href="single-listing1.html">Family House For Sell</a></h3>
                                    </div>
                                    <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>Downey, California</div>
                                    <div className="item-categoery3">
                                        <ul>
                                            <li><i className="flaticon-bed"></i>Beds: 03</li>
                                            <li><i className="flaticon-shower"></i>Baths: 02</li>
                                            <li><i className="flaticon-two-overlapping-square"></i>931 Sqft</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>





                    </div>

                </>
            ) : showMore ? (
                <div className="show-more">
                    <p>View All</p>
                </div>
            ) : (
                <>
                    <div className="row featuredContainer" style={{ position: "relative", height: "869.094px" }}>
                        <div className="col-xl-4 col-lg-6 col-md-6 for-sell" style={{ position: "absolute", left: "0px", top: "0px" }}>
                            <div className="property-box2 wow  fadeInUp" data-wow-delay=".3s" style={{ visibility: "visible", animationDelay: "0.3s", animationName: "fadeInUp" }}>
                                <div className="item-img">
                                    <a href="single-listing1.html"><img src="https://radiustheme.com/demo/html/homlisti/img/blog/blog4.jpg" alt="blog" width="510" height="340" /></a>
                                    <div className="item-category-box1">
                                        <div className="item-category">For Sell</div>
                                    </div>
                                    <div className="rent-price">
                                        <div className="item-price">$15,000<span><i>/</i>mo</span></div>
                                    </div>
                                    <div className="react-icon">
                                        <ul>
                                            <li>
                                                <a href="favourite.html" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Favourites">
                                                    <i className="flaticon-heart"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="compare.html" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                    <i className="flaticon-left-and-right-arrows"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item-category10"><a href="single-listing1.html">Appartment</a></div>
                                <div className="item-content">
                                    <div className="verified-area">
                                        <h3 className="item-title"><a href="single-listing1.html">Family House For Sell</a></h3>
                                    </div>
                                    <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>Downey, California</div>
                                    <div className="item-categoery3">
                                        <ul>
                                            <li><i className="flaticon-bed"></i>Beds: 03</li>
                                            <li><i className="flaticon-shower"></i>Baths: 02</li>
                                            <li><i className="flaticon-two-overlapping-square"></i>931 Sqft</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PropertyCard;
