
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PropertyMetaTags, PropertyInformation, LatestProperties, PropertyOverview, PropertyAmenities, PropertyMap, PropertyDescriptionTabs, PropertyBanner, PropertyOwnerDetails, PropertySimilartags } from "../components";
import JPOapi from "../common";
import { useParams } from "react-router";
import moment from 'moment'
import PropertyFavourite from "../components/propertypost/PropertyFavouriteButton";
import $ from "jquery";
/*import FavoritesModel from '../../common/Favorites/FavoritesModel';*/

const PropertyDetails = ({ AdvertisementCategory, AdvertisementType }) => {
    const params = useParams();
    const [property, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);

    useEffect(() => {
        if (AdvertisementType != "Draft") {
            fetchAdvartisePublished()
                .then(data => {
                    console.log(data);
                    setProperties(data);
                    const propertyData = JSON.parse(data.PropertyObject || data.propertyObject);
                    console.log(propertyData);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            fetchAdvartiseDraft()
                .then(data => {
                    console.log(JSON.stringify(data));
                    data.category = data.propertyType;
                    setProperties(data);

                    const propertyData = JSON.parse(data.propertyObject || data.PropertyObject);
                    /* propertyData.category = "Residential Rent"*/
                    console.log(propertyData);

                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    const fetchAdvartisePublished = async () => {


        var geturl = JPOapi.GetPropertyResidentialRentalsById.url;
        if (AdvertisementCategory === 'Residential_Rentals' || AdvertisementCategory === 'Commercial_Rentals') geturl = JPOapi.GetPropertyResidentialRentalsById.url + "/" + params?.id + "?RentalID=" + params?.id;
        if (AdvertisementCategory === 'Residential_Sales' || AdvertisementCategory === 'Commercial_Sales' || AdvertisementCategory === 'PlotSales') geturl = JPOapi.GetPropertyResidentialSalesById.url + "/" + params?.id + "?SalelID=" + params?.id;
        //if (property?.category === 'Commercial Rent') geturl = JPOapi.GetPropertyCommercialRentals.url;
        //if (property?.category === 'Commercial Sale') geturl = JPOapi.GetPropertyCommercialSales.url;
        // if (property?.category === 'LandOrPlot Sal') geturl = JPOapi.GetPropertyPlotSales.url;
        console.log("AdvertisementCategory-" + geturl)


        const response = await fetch(geturl, {
            method: JPOapi.Advertises.GETmethod,
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + userId,
            },
        });
        const { data } = await response.json();
        console.log(data);
        return data;
    }

    const fetchAdvartiseDraft = async () => {
        const response = await fetch(JPOapi.Advertises.url + "/" + params?.id + "?AdServiceId=" + params?.id, {
            method: JPOapi.Advertises.GETmethod,
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + userId,
            },
        });
        const { data } = await response.json();
        console.log(data);
        return data;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const getPropertyData = JSON.parse(property?.propertyObject)

    const handleFavorites = () => {
        //let url = JPOapi.FavoritesModel.url
        //let type = "Favorite"
        //const FavoriteModelData = FavoritesModel.properties;
        //FavoriteModelData.PropertyID = data.FullName
        //FavoriteModelData.UserID = data.Email
        //FavoriteModelData.Note = data.MobileNumber
        //FavoriteModelData.Remark = PropertyId
        //FavoriteModelData.Status = userId;
        //FavoriteModelData.CreatedAt = new Date().toISOString();
        //FavoriteModelData.UpdatedAt = new Date().toISOString();     


    };


    return (
        <>
            <section className="single-listing-wrap1">
                <div className="container">
                    <div className="single-property">
                        <div className="content-wrapper">
                            {/* <PropertyDetailsHeader property={property} />*/}
                            <PropertyMetaTags />
                            <div className="property-heading">
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <div className="single-list-cate">
                                            <div className="item-categoery">
                                                {(property?.category === 'Residential Rent' || property?.category === 'Commercial Rent') && "FOR RENT"}
                                                {(property?.category === 'Residential Sale' || property?.category === 'Commercial Sale' || property?.category === 'LandOrPlot Sale') && "FOR SALE"}
                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <div className="single-list-price">{"₹" + getPropertyData?.RentalDetails?.ExpectedRent + "/month"}</div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-lg-8 col-md-12">
                                        <div className="single-verified-area">
                                            <div className="item-title">
                                                <h3>
                                                    <a href="#">{property?.propertyTitle}</a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="single-item-address">
                                            <ul>
                                                <li>
                                                    <i className="fas fa-map-marker-alt icon"></i>
                                                    {getPropertyData?.LocalityDetails?.landmark + ", "}
                                                    {getPropertyData?.LocalityDetails?.street + ", "}
                                                    {getPropertyData?.LocalityDetails?.locality + ", "}
                                                    {getPropertyData?.LocalityDetails?.city + ", "}
                                                    {getPropertyData?.LocalityDetails?.state + "."}
                                                </li>
                                                <li><i className="fas fa-calendar-alt"></i>Posted On - {moment(getPropertyData?.createdDate).format("DD-MMM-YYYY")}</li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12">
                                        <div className="side-button">
                                            <ul>
                                                <li>
                                                    <a href="#" className="side-btn mr-3"><i className="flaticon-share"></i></a>
                                                </li>
                                                <li>
                                                    <PropertyFavourite property={property} className="side-btn" />
                                                    {/* <a href="#" onClick={() => handleFavorites()} className="side-btn"><i className="flaticon-heart"></i></a> */}
                                                </li>
                                                <li>
                                                    <a href="with-sidebar2.html" className="side-btn"><i className="flaticon-left-and-right-arrows"></i></a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {property?.category === 'LandOrPlot Sale' &&
                                <>
                                    <PropertyBanner tabTitle="Overview" tabSection={"Overview"} property={property} />

                                </>

                            }
                            <div className="row">
                                <div className="col-lg-8">


                                    <div className="single-listing-box1">

                                        {property?.category != 'LandOrPlot Sale' &&
                                            <PropertyBanner tabTitle="Overview" tabSection={"Overview"} property={property} />
                                        }

                                        <PropertyInformation tabTitle="Overview" tabSection={"Overview"} property={property} />

                                        <PropertyInformation tabTitle="About This Property" tabSection={"AboutProperty"} property={property} />

                                        <PropertyInformation tabTitle="Details" tabSection={"Details"} property={property} />

                                        {(property?.category == 'Commercial Sale' || property?.category == 'LandOrPlot Sale' || property?.category == 'Residential Sale') &&
                                            <PropertyInformation tabTitle="Additional Information" tabSection={"AdditionalInformation"} property={property} />}


                                        <PropertyInformation tabTitle="Features & Amenities" tabSection={"Amenities"} property={property} />

                                        <PropertyInformation tabTitle="Our Service's" tabSection={"OurService"} property={property} />

                                        <PropertyInformation tabTitle="Map Location" tabSection={"MapLocation"} property={property} />

                                        <PropertyInformation tabTitle="Property Video" tabSection={"PropertyVideo"} property={property} />

                                        <PropertyInformation tabTitle="Disclaimer" tabSection={"Disclaimer"} property={property} />

                                    </div>


                                </div>
                                <div className="col-lg-4 widget-break-lg sidebar-widget">

                                    <PropertyOwnerDetails TabTitle="About Owner Details" property={property} />

                                    {AdvertisementType != 'Draft' &&
                                        <PropertySimilartags TabTitle="Similar Properties" property={property} />
                                    }


                                    {/* <PropertyGlobalViews TabTitle="Activity On This Property" property={property} />*/}

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

            {AdvertisementType != 'Draft' &&
                <LatestProperties TabTitle="Similar Properties" property={property} />
            }



        </>
    );
};

export default PropertyDetails;
