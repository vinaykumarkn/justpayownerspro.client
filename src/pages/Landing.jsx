import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import {
    PropertyHighlights,
    ExplorePropertyTypes,
    OurServices,
    MainBannerSection,
    ServiceFeedback,
    BrandSlider
} from "../components";

import fetchTestimonials from "../common/Testimonials/getTestimonials";
import fetchTopCities from "../common/TopCities/getTopCities";
import fetchTopAreas from "../common/TopAreas/getTopAreas";


export const landingLoader = async () => {
    // const response = await axios(
    //   `http://justpayowners.runasp.net/WeatherForecast`
    // );
    const data = [];
    return { products: data };
};

const Landing = () => {
    const { userId } = useSelector(state => state.auth);

    const [testimonials, setTestimonials] = useState([]);
    const [topCities, setTopCities] = useState([]);
    const [topAreas, setTopAreas] = useState([]);

    const getCachedData = (key, fetchFunction, setState) => {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
            setState(JSON.parse(cachedData));
            return Promise.resolve();
        } else {
            return fetchFunction(userId)
                .then(response => {
                    if (response?.data) {
                        localStorage.setItem(key, JSON.stringify(response.data));
                        setState(response.data);
                    }
                })
                .catch(error => console.error(`Error fetching ${key}:`, error));
        }
    };

    const fetchData = useCallback(async () => {
        await Promise.all([
            getCachedData("TopCities", fetchTopCities, setTopCities),
            getCachedData("TopAreas", fetchTopAreas, setTopAreas),
            getCachedData("Testimonials", fetchTestimonials, setTestimonials),
        ]);
    }, [userId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <MainBannerSection />
            <OurServices />
            <ExplorePropertyTypes propertyType="ExplorePropertyTypes" />
            <PropertyHighlights
                pickedData={[]}
                headline="Latest Our Residential Rental Post"
                url="residential_rentals"
                template="Landing"
            />
            <ServiceFeedback data={testimonials} />
            <BrandSlider />
        </>
    );
};

export default Landing;
