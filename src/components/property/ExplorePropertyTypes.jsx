import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { NavLink } from "react-router-dom";

import PropertyControl from "../../common/property/propertyControl";

const ExplorePropertyTypes = ({ propertyType }) => {
    const [pickedData, setPickedData] = useState([]);

    useEffect(() => {
        const storageKey = `property_${propertyType.replace(/ /g, "")}`;
        const storedData = localStorage.getItem(storageKey);

        if (storedData) {
            console.log("Fetched ExplorePropertyTypes data from localStorage.");
            try {
                const parsedData = JSON.parse(storedData); // FIXED: No need to parse each item
                console.log(parsedData)

                const parsedArray = parsedData.map(item => {
                    const parsedItem = JSON.parse(item); // Parse the string to JSON object
                    const { type, iconClass, Name, Order } = parsedItem; // Destructure the object
                    return { type, iconClass, Name, Order }; // Return the destructured object
                });


                setPickedData(parsedArray);
            } catch (error) {
                console.error("Error parsing stored data:", error);
                setPickedData([]);
            }
        } else {
            console.log("Fetching ExplorePropertyTypes data from API.");
            PropertyControl()
                .then((res) => {
                    if (res && Array.isArray(res.ExploreProperty)) {
                        localStorage.setItem(storageKey, JSON.stringify(res.ExploreProperty)); // Store as JSON
                        const parsedData = JSON.parse(localStorage.getItem(storageKey)); // FIXED: No need to parse each item
                        const parsedArray = parsedData.map(item => {
                            const parsedItem = JSON.parse(item); // Parse the string to JSON object
                            const { type, iconClass, Name, Order } = parsedItem; // Destructure the object
                            return { type, iconClass, Name, Order }; // Return the destructured object
                        });


                        setPickedData(parsedArray);
                    } else {
                        console.error("Invalid API response for ExplorePropertyTypes");
                        setPickedData([]);
                    }
                })
                .catch((error) => console.error("API fetch error:", error));
        }
    }, [propertyType]);

    const getUrl = (type, propertyType, title) => {
        if (type === "RENT") {
            return propertyType === "Residential"
                ? `/property_type/residential_rentals/${title}`
                : `/property_type/commercial_rent/${title}`;
        }
        if (type === "BUY") {
            return propertyType === "Residential"
                ? `/property_type/residential_sales/${title}`
                : `/property_type/commercial_sale/${title}`;
        }
        return "/not-found";
    };

    return (
        <section className="feature-wrap2 rt-feature-slide-wrap">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="item-heading-left">
                            <span className="section-subtitle">PROPERTY TYPE</span>
                            <h2 className="section-title">Explore by Property Type</h2>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-end">
                        <div className="feature-layout-nav-button-wrap">
                            <span className="feature-btn-prev mr-2 d-flex">
                                <i className="fas fa-chevron-left"></i>
                            </span>
                            <span className="feature-btn-next">
                                <i className="fas fa-chevron-right"></i>
                            </span>
                        </div>
                    </div>
                </div>
                {pickedData.length > 0 ? (
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: ".feature-btn-next",
                            prevEl: ".feature-btn-prev",
                        }}
                        spaceBetween={20}
                        slidesPerView={1} // Default for mobile
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                        loop={true}
                        className="feature-layout-style-1"
                    >
                        {pickedData.map(({ iconClass, Path, Name, type }, index) => (
                            <SwiperSlide key={index} style={{ minWidth: "220px", width: "220px" }}>
                                <div className="feature-box4 wow fadeInUp" data-wow-delay=".3s">
                                    <div className="item-img">
                                        <img
                                            src={iconClass}
                                            alt={Name}
                                            height="78"
                                            width="70"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="item-content">
                                        <h3 className="item-title">
                                            <NavLink to={Path} target="_blank">{Name}</NavLink>
                                        </h3>
                                        <div className="item-category">
                                            <NavLink to={getUrl("RENT", type, Name)} target="_blank">Rent</NavLink> |
                                            <NavLink to={getUrl("BUY", type, Name)} target="_blank">Buy</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-center">No property types available.</p>
                )}
            </div>
        </section>
    );
};

export default ExplorePropertyTypes;
