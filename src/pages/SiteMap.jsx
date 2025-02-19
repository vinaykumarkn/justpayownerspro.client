import Jsonfooter from "../mockdata/footerData.json";
import { NavLink } from "react-router-dom";
import "../assets/css/SiteMap.css";
import React, { useState } from "react";

const residentialAreas = [
    "Koramangala",
    "Indiranagar",
    "Jayanagar",
    "Whitefield",
    "HSR Layout",
    "Basavanagudi",
    "Malleswaram",
    "Rajajinagar",
    "Sadashivanagar",
    "BTM Layout",
    "Banashankari",
    "Sarjapur Road",
    "Electronic City",
    "Hebbal",
    "Yelahanka",
    "Devanahalli",
    "Marathahalli",
    "Ulsoor",
    "Richmond Town",
    "Frazer Town",
    "Cooke Town",
    "Cox Town",
    "Domlur",
    "Shivajinagar",
    "Vasanth Nagar",
    "R.T. Nagar",
    "Seshadripuram",
    "Austin Town",
    "Murphy Town",
    "Cantonment Area",
    "Pete Area",
    "Sultanpet",
    "Adugodi",
    "Peenya",
    "Hulimavu",
    "Nagawara",
    "Kadubeesanahalli",
    "Bellandur",
    "Kanakapura Road",
    "Rajarajeshwari Nagar",
    "Kaggadasapura",
    "Horamavu",
    "Kengeri",
    "Kumaraswamy Layout",
    "Hennur Road",
    "Thanisandra",
    "Doddanekkundi",
    "Kudlu Gate",
    "Mahadevapura",
    "Chandapura",
];

const districts = [
    "Bagalkot",
    "Ballari (Bellary)",
    "Belagavi (Belgaum)",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikballapur",
    "Chikkamagaluru (Chikmagalur)",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi (Gulbarga)",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru (Mysore)",
    "Raichur",
    "Ramanagara",
    "Shivamogga (Shimoga)",
    "Tumakuru (Tumkur)",
    "Udupi",
    "Uttara Kannada (Karwar)",
    "Vijayapura (Bijapur)",
    "Yadgir",
];

const tabData = [
    {
        title: "Residential Properties For Rent",
        icon: "fas fa-chart-pie",
        content: ["Flats For Rent", "House For Rent", "Villa's For Rent", "Rooms For Rent", "Pg/Hostels For Rent"],
    },
    {
        title: "Residential Properties For Sale",
        icon: "fas fa-chart-line",
        content: ["Flats For Sale", "House For Sale", "Villa's For Rent", "Pg/Hostels For Sale"],
    },
    {
        title: "Commercial Properties For Rent",
        icon: "fas fa-cogs",
        content: ["Commercial Shops For Rent", "Commercial Showrooms For Rent", "Commercial Building For Rent", "Office Space For Rent", "Warehouse For Rent", "Coworking Space For Rent", "Industrial Building For Rent"],
    },
    {
        title: "Commercial Properties For Sale",
        icon: "fas fa-cogs",
        content: ["Commercial Shops For Sale", "Commercial Showrooms For Sale", "Commercial Building For Sale", "Office Space For Sale", "Warehouse For Sale", "Coworking Space For Sale", "Industrial Building For Sale"],
    },
    {
        title: "Land or Plots For Sale",
        icon: "fas fa-cogs",
        content: ["Plots For Sale", "Plots For ReSale", "New Projects"],
    },
    {
        title: "District Wise Property",
        icon: "fas fa-cogs",
        content: ["Flats Or House For Rent", "Commercial Properties For Rent", "Flats Or House For Sale", "Commercial Properties For Sale", "Plots / Land For Sale"],
    },
    {
        title: "Builders Projects",
        icon: "fas fa-cogs",
        content: ["Builders Projects"],
    },
];

const getUrl = (parent, category, location) => {
    const basePaths = {
        "Residential Properties For Rent": "/property/residential_rentals/location/",
        "Residential Properties For Sale": "/property/residential_sales/location/",
        "Commercial Properties For Rent": "/property/commercial_rentals/location/",
        "Commercial Properties For Sale": "/property/commercial_sales/location/",
        "Land or Plots For Sale": "/property/landorplot_sales/location/",
        "Builders Projects": "/property/projects/location/",
    };

    if (parent === "District Wise Property") {
        return `/property/districtwise/location/${location}/${category.replace("/", " or ")}`;
    }

    return `${basePaths[parent] || "/not-found"}/${location}/${category.replace("/", " or ")}`;
};

const SiteMap = () => {
    console.log("SiteMap - Render");

    const [activeKey, setActiveKey] = useState(tabData[0]?.title || "");

    return (
        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 rtcl-login-form-wrap">
                                <h4>Site Map</h4>

                                <div className="mb-3" id="dynamic-tabs">
                                    {tabData.map((tab, index) => (
                                        <div key={index}>
                                            <h5>{tab.title}</h5>
                                            <ul id="dynamic-tabs-content">
                                                {tab.content.map((category, i) => (
                                                    <li key={i}>
                                                        <div className="property-type-title">{category}</div>
                                                        <div className="item-link">
                                                            <ul>
                                                                {(tab.title !== "District Wise Property" ? residentialAreas : districts).map((location, j) => (
                                                                    <li key={j}>
                                                                        <NavLink to={getUrl(tab.title, category, location)}>
                                                                            {category} {location}
                                                                        </NavLink>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SiteMap;
