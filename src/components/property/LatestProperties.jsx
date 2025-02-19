
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from 'react-router-dom';

import JPOapi from "../../common";


const LatestProperties = ({ TabTitle, property }) => {

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




    const renderPropertyLogo = (item) => {

        console.log(property)
        console.log(JSON.parse(item.propertyObject)?.GalleryDetails)

        return <img src={JSON.parse(item.propertyObject)?.GalleryDetails != undefined ? JSON.parse(item.propertyObject)?.GalleryDetails[0] : ""} alt='widget'
            width={'120'}
            height={'102'}
        />


        //if (property?.category === 'Residential Rent') {
        //    return <img src={JSON.parse(item.propertyObject)?.GalleryDetails != undefined ? JSON.parse(item.propertyObject)?.GalleryDetails[0] : ""} alt='property' 
        //        width={'120px'}
        //        height={'102px'}
        //    />

        //} else if (property?.category === 'Residential Sale') {
        //    return   <img className="d-flex mr-5 rounded" src="/src/assets/brand/resale_logo_1.png" alt="Generic placeholder image" />;
        //} else if (property?.category === 'Commercial Rent') {
        //    return   <img className="d-flex mr-5 rounded" src="/src/assets/brand/resale_logo_1.png" alt="Generic placeholder image" />;
        //} else if (property?.category === 'Commercial Sale') {
        //    return   <img className="d-flex mr-5 rounded" src="/src/assets/brand/resale_logo_1.png" alt="Generic placeholder image" />;
        //} else if (property?.category === 'LandOrPlot Sale') {
        //    return  <img className="d-flex mr-5 rounded" src="/src/assets/brand/landIcon1.svg" alt="Generic placeholder image" />;
        //} else {
        //    return   <img className="d-flex mr-5 rounded" src="/src/assets/brand/resale_logo_1.png" alt="Generic placeholder image" />;
        //}
    };
    const GetPropertyUrl = (Category) => {
        let propertyUrl = "";
        switch (Category) {
            case "Residential Rent":                
                propertyUrl = `/property/residential_rentals`;
                break;
            case "Residential Sale":               
                propertyUrl = `/property/residential_sales`;
                break;
            case "Commercial Rent":              
                propertyUrl = `/property/commercial_rentals`;
                break;
            case "Commercial Sale":                
                propertyUrl = `/property/commercial_sales`;
                break;
            case "LandOrPlot Sale":
                propertyUrl = `/property/plotsales`;
                break;
        }
        return propertyUrl;
    }

    return (<>
        <section className="property-wrap1">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-7 col-sm-7">
                        <div className="item-heading-left">
                            <span className="section-subtitle">Our PROPERTIES</span>
                            <h2 className="section-title">Latest Properties</h2>
                           
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-5 col-sm-5">
                        <div className="heading-button">
                            <a href={GetPropertyUrl(property?.category) } className="heading-btn item-btn2">All Properties</a>
                        </div>
                    </div>
                </div>
                 <div className="row justify-content-center">
                    {filteredData.map((item, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" key={index}  >
                            <div className={`property-box2 wow fadeInUp animated`} data-wow-delay={item.delay}>
                                <div className="item-img">
                                    <a target="_blank" href={"/property/" + item.category.split(" ").join("/").toLowerCase() + "/" + item.propertyTitle + "/" + item.propertyID + "/detail?justpayowners=" + item.category.split(" ").join("_").toLowerCase() + "_list"} >                    
                                       

                                        <img src={JSON.parse(item.propertyObject)?.GalleryDetails != undefined ? JSON.parse(item.propertyObject)?.GalleryDetails[0] : ""} alt='widget'
                                            width={'510'}
                                            height={'340'}
                                        />

                                    </a>
                                    <div className="item-category-box1">
                                        <div className="item-category">

                                            {(item?.category === 'Residential Rent' || item?.category === 'Commercial Rent') && "FOR RENT"}
                                            {(item?.category === 'Residential Sale' || item?.category === 'Commercial Sale' || item?.category === 'LandOrPlot Sale') && "FOR SALE"}


                                            </div>
                                    </div>
                                    <div className="rent-price">
                                        <div className="item-price">
                                            $ {item.expectedRent}
                                            <span><i>/</i>month</span>
                                        </div>
                                    </div>
                                    <div className="react-icon">
                                        <ul>
                                            <li>
                                                <a href="favourite.html" data-bs-toggle="tooltip" data-bs-placement="top" title="Favourites">
                                                    <i className="flaticon-heart"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="compare.html" data-bs-toggle="tooltip" data-bs-placement="top" title="Compare">
                                                    <i className="flaticon-left-and-right-arrows"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item-category10">
                                    <a href="#">{item.propertyType}</a>


                                </div>
                                <div className="item-content">
                                    <div className="verified-area">
                                        <h3 className="item-title">                                           
                                    
                                                <a target="_blank" className="text-color"  href={"/property/" + item.category.split(" ").join("/").toLowerCase() + "/" + item.propertyTitle + "/" + item.propertyID + "/detail?justpayowners=" + item.category.split(" ").join("_").toLowerCase() + "_list"} >                    
                                                {item?.propertyTitle}</a>
                                        </h3>
                                    </div>
                                    <div className="location-area">
                                        <i className="fas fa-map-marker-alt icon"></i>

                                        {JSON.parse(item.propertyObject)?.LocalityDetails?.landmark ? JSON.parse(item.propertyObject)?.LocalityDetails?.landmark + ", " : ""}
                                        {JSON.parse(item.propertyObject)?.LocalityDetails?.street ? JSON.parse(item.propertyObject)?.LocalityDetails?.street + ", " : ""}
                                        {JSON.parse(item.propertyObject)?.LocalityDetails?.locality ? JSON.parse(item.propertyObject)?.LocalityDetails?.locality + ", " : ""}
                                        {JSON.parse(item.propertyObject)?.LocalityDetails?.city ? JSON.parse(item.propertyObject)?.LocalityDetails?.city + ", " : ""}
                                        {JSON.parse(item.propertyObject)?.LocalityDetails?.state ? JSON.parse(item.propertyObject)?.LocalityDetails?.state + ", " : ""}

                                       
                                    </div>
                                    <div className="item-categoery3">
                                        <ul>

                                            {(item?.category === 'Residential Rent' || item?.category === 'Residential Sale') && 
                                                <><li><i className="flaticon-bed"></i>Beds: {item.beds}</li>
                                                <li><i className="flaticon-shower"></i>Baths: {item.baths}</li>
                                                <li><i className="flaticon-two-overlapping-square"></i>Area: {item.sqft}</li>
                                                </>                                        
                                            }
                                            {(item?.category === 'Commercial Rent' || item?.category === 'Commercial Sale') &&
                                                <> <li><i className="flaticon-bed"></i>Beds: {item.beds}</li>
                                                    <li><i className="flaticon-shower"></i>Baths: {item.baths}</li>
                                                    <li><i className="flaticon-two-overlapping-square"></i>Area: {item.sqft}</li>
                                                </>
                                            }
                                            {(item?.category === 'LandOrPlot Sale') &&
                                                <><li><i className="flaticon-bed"></i>Beds: {item.beds}</li>
                                                    <li><i className="flaticon-shower"></i>Baths: {item.baths}</li>
                                                    <li><i className="flaticon-two-overlapping-square"></i>Area: {item.sqft}</li>
                                                </>
                                            }



                                            






                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
               
            </div>
        </section>

    </>
    );
};

export default LatestProperties;



