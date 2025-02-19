import React, { useEffect, useState } from "react";
import { FaLocationDot, FaAngleDown } from "react-icons/fa6";

import jsonHeader from '../mockdata/locationData.json';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/property/propertyByCity";
import { store } from "../redux/store";

import '../assets/css/header.css';

/*import '../assets/css/header.css';*/

const LocationListing = () => {
    const [showLocationMenu, setShowLocationMenu] = useState(false);
    const { selectedCity } = useSelector(state => state.propertyByCity);
    const dispatch = useDispatch();

    const handleLocationMenu = () => {
        setShowLocationMenu(!showLocationMenu);
    };

    useEffect(() => {
        store.dispatch(setCity("All India"));
    }, [selectedCity == ""]);

    const handleClickAllIndia = () => {
        store.dispatch(setCity("All India"));
        setShowLocationMenu(false);
    }

    return (
        <div className="set_location position-relative">
            <a className="city" title="All India" onClick={handleLocationMenu}>
                <FaLocationDot style={{ marginRight: '5px' }} />
                <span className="d-inline">
                    {"Karnataka"}
                </span>
                <FaAngleDown style={{ marginLeft: '5px' }} />
            </a>
            {showLocationMenu && (
                <div className="location-dropdown loc_menu">
                    <div className="location-dropdown-inner ffos">                       
                        <div className="popular-location">
                            <p className="loc_hed">POPULAR Area</p>
                            <ul>
                                {jsonHeader.popularAreas.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path} title={item.name} onClick={() => {
                                            dispatch(setCity(item.name));
                                            setShowLocationMenu(false);
                                        }}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                            <p className="loc_hed">Karnataka Districts </p>
                            <ul>
                                {jsonHeader.OtherCity.map((item, index) => (
                                    <li key={index}>
                                        <Link to={item.path} title={item.name} onClick={() => {
                                            dispatch(setCity(item.name));
                                            setShowLocationMenu(false);
                                        }}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default LocationListing;