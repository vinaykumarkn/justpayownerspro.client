/* eslint-disable no-undef */
import { NavLink } from 'react-router-dom'
import React, { useEffect, useState } from "react";
const QuickLinks = function ({ json }) {
    const storedCitiesJson = JSON.parse(window.localStorage.getItem("TopCities"));
    const structuredNavData = {
        navbar: [
            { text: "Property for Sale", menu: [] },
            { text: "Property for Sale", menu: [] },
            { text: "Property for Sale", menu: [] },
            { text: "Property for Sale", menu: [] }
        ]
    };
    if (storedCitiesJson) {
        storedCitiesJson.forEach(city => {
            structuredNavData.navbar[0].menu.push({ text: `Real estate in ${city.cityName}`, url: `/property-location/${city.cityName}` });
            structuredNavData.navbar[1].menu.push({ text: `Residential Land / Plot in ${city.cityName}`, url: `/${city.cityName}/residential-land-and-plot-projects` });
            structuredNavData.navbar[2].menu.push({ text: `Residential Projects in ${city.cityName}`, url: `/${city.cityName}/residential-apartment-projects` });
            structuredNavData.navbar[3].menu.push({ text: `Residential Projects in ${city.cityName}`, url: `/${city.cityName}/residential-apartment-projects` });
        });
        //structuredNavData.navbar[2].menu.push({ text: `Flats in ${city.cityName}`, url: `/property-location/${city.cityName}` });
        // Output the structured data  //New Projects & Plots
        console.log("structuredNavData", structuredNavData);
    }

    useEffect(() => {
        // Some side effect logic
        console.log('Footer-QuickLinks rendered');
        return () => {
            // Cleanup if necessary
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [json]); // Make sure dependencies are correctly set

    return (<>
        <div className="footer-top">
            <div className="row justify-content-between">

                {structuredNavData != undefined && structuredNavData.navbar.map((item, index) => {
                    return (
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6" key={index}>
                            <div className="footer-link">
                                <div className="footer-title">
                                    <h3>{item.text}</h3>
                                </div>
                                <div className="item-link">
                                    <ul >
                                        {item.menu && item.menu.map((itemsub, subindex) => {
                                            return (
                                                <li key={subindex}>
                                                    <NavLink to={itemsub.url} target={"_blank"} >{itemsub.text}</NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </>
    );
};
export default QuickLinks;