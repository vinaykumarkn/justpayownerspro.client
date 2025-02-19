import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from 'react-router-dom';

import JPOapi from "../../common";


const PropertySimilartags = ({ TabTitle, property }) => {

    const [advertiseData, setAdvertiseData] = useState([]);
    const [option, setOption] = useState(property?.category);
    const { userId } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdvartise()
            .then(data => {
                setAdvertiseData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const fetchAdvartise = async () => {

        var geturl = JPOapi.Advertises.url;
        if (property?.category === 'Residential Rent') geturl = JPOapi.GetPropertyResidentialRentals.url + `?Category=${property?.category}&pageNumber=1&pageSize=10`;
        if (property?.category === 'Residential Sale') geturl = JPOapi.GetPropertyResidentialSales.url + `?Category=${property?.category}&pageNumber=1&pageSize=10`;
        if (property?.category === 'Commercial Rent') geturl = JPOapi.GetPropertyCommercialRentals.url + `?Category=${property?.category}&pageNumber=1&pageSize=10`;
        if (property?.category === 'Commercial Sale') geturl = JPOapi.GetPropertyCommercialSales.url + `?Category=${property?.category}&pageNumber=1&pageSize=10`;
        if (property?.category === 'LandOrPlot Sale') geturl = JPOapi.GetPropertyPlotSales.url + `?Category=${property?.category}&pageNumber=1&pageSize=10`;



        console.log("similar tag-" + geturl)
        console.log(property)
        const response = await fetch(geturl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        /*const { data } = await response.json();*/
        const data = await response.json();
        console.log(data);
        // order by created date in descending order
        data.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
        console.log(data);
        return data;
    }

    const filteredData = useMemo(() => {
        if (advertiseData.filter(item => item.category === option).length > 0) {
            return advertiseData.filter(item => item.category === option);
        } else {
            return advertiseData;
        }
    }, [advertiseData, option]);

    const renderPropertyLogo = (item, width, height) => {
        console.log(property)
        console.log(JSON.parse(item.PropertyObject || item.propertyObject)?.GalleryDetails)
        return <img src={JSON.parse(item.PropertyObject || item.propertyObject)?.GalleryDetails != undefined ? JSON.parse(item.PropertyObject || item.propertyObject)?.GalleryDetails[0] : ""} alt='widget'
            width={width}
            height={height}
        />
    };

   
   
    return (<div className="widget widget-listing-box1">
        <h3 className="widget-subtitle">Similar Listing</h3>       
        {/* Main Listing */}
        <>
            {advertiseData.length > 0 && (
                <>
                    <div className="item-img">
                        <a target="_blank" href={"/property/" + advertiseData[0].category.split(" ").join("/").toLowerCase() + "/" + advertiseData[0].propertyTitle + "/" + advertiseData[0].propertyID + "/detail?justpayowners=" + advertiseData[0].category.split(" ").join("_").toLowerCase() + "_list"} >                           
                            {renderPropertyLogo(advertiseData[0], 540, 360 )}
                        </a>
                        <div className="item-category-box1">
                            <div className="item-category">For Rent</div>
                        </div>
                    </div>
                    <div className="widget-content">
                        <div className="item-category10">
                            <a href="#">{advertiseData[0].propertyType}</a>
                        </div>
                        <h4 className="item-title">
                            <a target="_blank" href={"/property/" + advertiseData[0].category.split(" ").join("/").toLowerCase() + "/" + advertiseData[0].propertyTitle + "/" + advertiseData[0].propertyID + "/detail?justpayowners=" + advertiseData[0].category.split(" ").join("_").toLowerCase() + "_list"} >                           
                                {advertiseData[0].propertyTitle}</a>
                        </h4>
                        <div className="location-area">
                            <i className="fas fa-map-marker-alt icon"></i>

                            {JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.landmark ? JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.landmark + ", " : ""}
                            {JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.street ? JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.street + ", " : ""}
                            {JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.locality ? JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.locality + ", " : ""}
                            {JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.city ? JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.city + ", " : ""}
                            {JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.state ? JSON.parse(advertiseData[0].PropertyObject || advertiseData[0].propertyObject)?.LocalityDetails?.state + ", " : ""}

                        </div>
                        

                        {advertiseData[0].expectedRent != undefined && <div className="item-price">{advertiseData[0].expectedRent}<span>/month</span></div>}
                    </div></>
            )}
                       
            {advertiseData.length === 0 ? (
                <div>Loading..</div>
            ) : (filteredData.length > 0 ? (
                    filteredData.slice(1).map((item, index) => (
                    <>
                            <div key={index} className={index === filteredData.length - 2 ? "widget-listing no-brd" : "widget-listing"}>
                            <div className="item-img">
                                    <a target="_blank" className="text-color" href={"/property/" + item.category.split(" ").join("/").toLowerCase() + "/" + item.propertyTitle + "/" + item.propertyID + "/detail?justpayowners=" + item.category.split(" ").join("_").toLowerCase() + "_list"} >                           
                                        {renderPropertyLogo(item, 120, 102)}   </a>
                            </div>
                            <div className="item-content">
                                    <h5 className="item-title">
                                        <a target="_blank" className="text-color"  href={"/property/" + item.category.split(" ").join("/").toLowerCase() + "/" + item.propertyTitle + "/" + item.propertyID + "/detail?justpayowners=" + item.category.split(" ").join("_").toLowerCase() + "_list"} >                           
                                        
                                            {item?.propertyTitle}</a>
                                </h5>
                                <div className="location-area">
                                    <i className="fas fa-map-marker-alt icon"></i>

                                        {JSON.parse(item.PropertyObject || item.propertyObject)?.LocalityDetails?.landmark ? JSON.parse(item.PropertyObject || item.propertyObject)?.LocalityDetails?.landmark + ", " : ""}
                                        {JSON.parse(item.PropertyObject || item.propertyObject)?.LocalityDetails?.street ? JSON.parse(item.PropertyObject || item.propertyObject )?.LocalityDetails?.street + ", " : ""}
                                        {JSON.parse(item.PropertyObject || item.propertyObject)?.LocalityDetails?.locality ? JSON.parse(item.PropertyObject || item.propertyObject )?.LocalityDetails?.locality + ", " : ""}
                                        {JSON.parse(item.PropertyObject || item.propertyObject)?.LocalityDetails?.city ? JSON.parse(item.PropertyObject || item.propertyObject )?.LocalityDetails?.city + ", " : ""}
                                        {JSON.parse(item.PropertyObject || item.propertyObject)?.LocalityDetails?.state ? JSON.parse(item.PropertyObject || item.propertyObject)?.LocalityDetails?.state + ", " : ""}

                                </div>
                                    {item.expectedRent != undefined && <div className="item-price">$ {item.expectedRent}<span>/mo</span></div>}
                            </div>
                        </div>



                    </>
                ))
            ) : (
                <div>No data found</div>
            )
            )}
        </>
    </div>
    )
}
export default PropertySimilartags