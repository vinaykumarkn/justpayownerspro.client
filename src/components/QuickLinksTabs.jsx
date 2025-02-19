import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ".././assets/css/QuickLinksTabs.css"

function QuickLinksTabs() {
    const residentialAreas = [
        "Koramangala", "Indiranagar", "Jayanagar", "Whitefield", "HSR Layout",
        "Basavanagudi", "Malleswaram", "Rajajinagar", "Sadashivanagar", "BTM Layout"
    ];

    const districts = [
        "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
        "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga"
    ];

    const tabData = [
        {
            title: "Residential Properties For Rent",
            content: ["Flats For Rent", "House For Rent", "Villa's For Rent", "Rooms For Rent"]
        },
        {
            title: "Residential Properties For Sale",
            content: ["Flats For Sale", "House For Sale", "Villa's For Sale"]
        },
        {
            title: "Commercial Properties For Rent",
            content: ["Commercial Shops", "Showrooms", "Office Space", "Warehouse"]
        },
        {
            title: "Commercial Properties For Sale",
            content: ["Commercial Shops", "Showrooms", "Office Space", "Warehouse"]
        },
        {
            title: "Land or Plots For Sale",
            content: ["Plots For Sale", "New Projects"]
        },
        {
            title: "District Wise Property",
            content: ["Flats Or House For Rent", "Commercial Properties For Rent", "Plots / Land For Sale"]
        }
    ];

    const getUrl = (parent, category, location) => {
        const formattedCategory = category.replace("/", " or ");
        switch (parent) {
            case "Residential Properties For Rent":
                return `/property/residential_rentals/location/${location}/${formattedCategory}`;
            case "Residential Properties For Sale":
                return `/property/residential_sales/location/${location}/${formattedCategory}`;
            case "Commercial Properties For Rent":
                return `/property/commercial_rentals/location/${location}/${formattedCategory}`;
            case "Commercial Properties For Sale":
                return `/property/commercial_sales/location/${location}/${formattedCategory}`;
            case "Land or Plots For Sale":
                return `/property/landorplot_sales/location/${location}/${formattedCategory}`;
            case "District Wise Property":
                return `/property/district/location/${location}/${formattedCategory}`;
            default:
                return "/not-found";
        }
    };

    const [activeKey, setActiveKey] = useState(tabData[0]?.title || "");

    return (
        <div className="quick-links-container">
            <Tabs activeKey={activeKey} onSelect={setActiveKey} id="dynamic-tabs" className="custom-tabs">
                {tabData.map((tab, index) => (
                    <Tab key={index} eventKey={tab.title} title={tab.title}>
                        <div className="tab-content-container">
                            <ul className="category-list">
                                {tab.content.map((category, i) => (
                                    <li key={i} className="category-item">
                                        <div className="category-title">{category}</div>
                                        <div className="property-links">
                                            <ul>
                                                {(tab.title !== "District Wise Property" ? residentialAreas : districts).map((location, j) => (
                                                    <li key={j} className="property-link">
                                                        <NavLink to={getUrl(tab.title, category, location)} target="_blank">
                                                            {`${category} in ${location}`}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

export default QuickLinksTabs;
