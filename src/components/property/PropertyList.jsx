import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clearSavedListing, handleLisingRemove, handleSave } from '../../redux/saveListing/saveListingSlice';
import DefaultuserImg from '../../assets/img/DefaultUserImg.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import moment from 'moment'
import noImageRent from '../../assets/img/noImageRent_Sale.svg';
const slides = [
    {
        image: 'https://www.radiustheme.com/demo/wordpress/themes/homlisti/wp-content/uploads/classified-listing/2022/03/daziy_millar3-1-400x240.jpg',
        link: 'https://www.radiustheme.com/demo/wordpress/themes/homlisti/property/northwest-office-space/'
    },
    {
        image: 'https://www.radiustheme.com/demo/wordpress/themes/homlisti/wp-content/uploads/classified-listing/2022/03/daziy_millar4-1-400x240.jpg',
        link: 'https://www.radiustheme.com/demo/wordpress/themes/homlisti/property/northwest-office-space/'
    },
    {
        image: 'https://www.radiustheme.com/demo/wordpress/themes/homlisti/wp-content/uploads/classified-listing/2022/03/daziy_millar5-1-400x240.jpg',
        link: 'https://www.radiustheme.com/demo/wordpress/themes/homlisti/property/northwest-office-space/'
    },
    {
        image: 'https://www.radiustheme.com/demo/wordpress/themes/homlisti/wp-content/uploads/classified-listing/2022/03/daziy_millar2-2-400x240.jpg',
        link: 'https://www.radiustheme.com/demo/wordpress/themes/homlisti/property/northwest-office-space/'
    }
];




const PropertyList = ({ listing, Category, AdType, isUSer }) => {


    const [propertyObject, setPropertyObject] = useState({});  // Default state is an empty object

    const [heart, setHeart] = useState(false);
    const { saveListings } = useSelector(state => state.savedListing);
    const { currentUser } = useSelector(state => state.user);
       

    const dispatch = useDispatch();
    const navigate = useNavigate();
   

   // console.log("-----------");
   // console.log(listing);

    //const propertyData = listing.propertyObject;

   // const propertyObject = useState(JSON.parse(propertyData));


    //console.log(propertyObject);



    useEffect(() => {
        console.log("-----------");
        console.log(listing);
        try {
            const propertyData = listing.PropertyObject || listing.propertyObject;
            if (propertyData) {
                console.log(propertyData);
                setPropertyObject(JSON.parse(propertyData));
            } else {
                setPropertyObject({});  // Fallback to empty object if both are null or undefined
            }
        } catch (error) {
            console.error("Error parsing property object:", error);
            setPropertyObject({});  // Fallback to empty object in case of a parse error
        }

        if (currentUser) {
            const isSaved = saveListings.some(saveListing => saveListing._id === _id);
            if (isSaved) {
                setHeart(true);
            } else {
                setHeart(false);
            }
        }
        else {
            dispatch(clearSavedListing())
        }
    }, [listing]);


    const handleSaveListings = (id) => {
        if (currentUser && currentUser.email) {
            const isSaved = saveListings.some(saveListing => saveListing._id === id);
            if (isSaved) {
                const restListings = saveListings.filter(savedListing => savedListing._id !== id);
                dispatch(handleLisingRemove(restListings));
                setHeart(false);
            } else {
                const listingToAdd = listing
                dispatch(handleSave(listingToAdd));
                setHeart(true);
            }
        }
        else {
            navigate('/login');
        }
    };
   


    const GetPropertyTitleUser = (propertyObject) => {
        let propertyTitle = `/property-detail/` & propertyObject;      
      
        return propertyTitle;
    }

    const renderPropertyImage = (propertyObject) => {
        const galleryDetails = propertyObject?.GalleryDetails;

        /*const galleryDetails = JSON.parse(item?.propertyData)?.GalleryDetails;*/
        if (galleryDetails && galleryDetails.length > 0) {
            return galleryDetails[0];
        } else {
            return noImageRent;
        }
    }

    const GetPropertyTitle = (propertyObject) => {
        let propertyTitle = "";
        switch (Category) {
            case "Residential Rent":
                const rentDetails = propertyObject?.property_details;
                propertyTitle = `${rentDetails?.BHKType} ${rentDetails?.ApartmentType.replace("/", " or ")} For Rent in ${propertyObject?.LocalityDetails?.city}`;
                break;
            case "Residential Sale":
                const saleDetails = propertyObject?.property_details;
                propertyTitle = `${saleDetails?.BHKType} ${saleDetails?.ApartmentType.replace("/", "-")} For Sale in ${propertyObject?.LocalityDetails?.city}`;
                break;
            case "Commercial Rent":
                const commercialRentDetails = propertyObject?.property_details;
                propertyTitle = `${commercialRentDetails?.PropertyType} For Rent in ${propertyObject?.LocalityDetails?.city}`;
                break;
            case "Commercial Sale":
                const commercialSaleDetails = propertyObject?.property_details;
                propertyTitle = `${commercialSaleDetails?.PropertyType} For Sale in ${propertyObject?.LocalityDetails?.city}`;
                break;
            case "LandOrPlot Sale":
                propertyTitle = `Plot For Sale in ${propertyObject?.LocalityDetails?.city}`;
                break;
        }
        return propertyTitle;
    }

    const handleClick = () => {
        let _url = "/property/" + Category.split(" ").join("/").toLowerCase() + "/" + GetPropertyTitle(propertyObject) + "/" + listing.propertyID + "/detail?justpayowners=" + Category.split(" ").join("_").toLowerCase() + "_list";

        if (isUSer && isUSer != "") {
            _url = "/property-detail/" + listing.advertiseID
        }
        window.open(_url, '_blank');
    }

    const renderContent = () => {
        console.log(Category)
        if (Category === 'Residential Rent') {
            return residentialRent();
        } else if (Category === 'Residential Sale') {
            return residentialSell();
        } else if (Category === 'Commercial Rent') {
            return commercialRent();
        } else if (Category === 'Commercial Sale') {
            return commercialSell();
        } else if (Category === 'LandOrPlot Sale') {
            return PlotSell();
        } else {
            return <div>no Match</div>;
        }
    };

    const handleEditBtn = (item) => {
        console.log(item)      

        // generate path based on adType, propertyType and advertiseID and navigate to that path
        let path = '';
        switch (item.propertyType) {
            case 'Residential Rent':
                path = '/manage/property/residential/';
                break;
            case 'Residential Sale':
                path = '/manage/property/residential/';
                break;
            case 'Commercial Rent':
                path = '/manage/property/commercial/';
                break;
            case 'Commercial Sale':
                path = '/manage/property/commercial/';
                break;
            case 'LandOrPlot Sale':
                path = '/manage/property/landorplot/';
                break;
            default:
                path = '/';
        }
        path += `${item.adType.replace(/\s/g, "")}` + `/${item.advertiseID}/property?justpayFr=pyp_${item.adType.replace(/\s/g, "")}`;
        console.log(path);
        navigate(path.toLowerCase());
    }

    function residentialRent() {
        return (<div className="col-lg-12" onClick={isUSer && isUSer != "" ? undefined :   handleClick }  >
            <div className="property-box2 property-box4 wow  fadeInUp animated" data-wow-delay=".6s" style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
            }}>

                <div className="item-img">
                    <a href="#">
                        <img src={renderPropertyImage(propertyObject)} alt="blog" width="250" height="200" />
                    </a>
                    <div className="item-category-box1">
                        <div className="item-category">For Rent</div>
                    </div>                

                    <div className="form-group col-lg-12" id="getOwner">
                        {isUSer && isUSer != "" ?
                            <button type="button" className="form-button" onClick={() => handleActiveBtn(listing)}>
                                View 10 Contact
                            </button>
                            :
                            <button className="form-button">Get Owner Number</button>
                        }
                    </div>
                </div>

                <div className="item-content item-content-property">
                    <div className="item-category10">
                        {propertyObject?.property_details?.ApartmentType}
                    </div>
                    <div className="react-icon react-icon-2">

                        {isUSer && isUSer != "" ?
                            <ul>
                                <li>
                                    <button type="button" className="btn btn-outline-primary btn-sm mr-4 px-4" onClick={() => handleEditBtn(listing)}>
                                        Edit
                                    </button>                                   
                                </li>
                                <li>
                                <select name="Request Action" className="form-control custom-select request-action"><option value="">Request Action</option><option value="activate">Activate Property</option><option value="deactive">Dectivate Property</option></select>
                                </li>
                            </ul>
                            :
                            <ul>
                                <li>                                   
                                    <a href="favourite.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Favourites">
                                        <i className="flaticon-heart"></i>
                                    </a>
                                </li>
                            </ul>
                        }
                       
                    </div>
                    <div className="verified-area" onClick={handleClick} >
                        <h3 className="item-title"><a href="#">{GetPropertyTitle(propertyObject)}</a>
                            <i className="fa fa-external-link"></i>
                        </h3>
                    </div>
                    <div className="listing-badge-wrap">
                        <span className="badge rtcl-badge-popular popular-badge badge-success"> {listing.propertyType}</span>
                        <span className="badge rtcl-badge-popular popular-badge badge-success">Verified</span>
                        <span className="badge rtcl-badge-_top">Posted : {moment(listing.createdDate).format("DD-MMM-YYYY")}</span>
                        <span className="badge rtcl-badge-_top">Builtup Area: {propertyObject?.property_details?.builtUpArea} sqft</span>

                    </div>
                    <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>{propertyObject?.LocalityDetails?.city},{propertyObject?.LocalityDetails?.state}</div>
                    <div className="item-categoery3">
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-building"></i> <div><p className="heading-7"> {propertyObject?.property_details?.BHKType} </p><p className="heading-6" >Apartment Type</p></div></li>
                            <li><i className="fas fa-users icon"></i>   <div><p className="heading-7"> {propertyObject?.RentalDetails?.PreferredTenants} </p><p className="heading-6">Preferred Tenant</p></div> </li>
                            <li><i className="fas fa-hourglass-half"></i> <div><p className="heading-7"> {propertyObject?.property_details?.PropertyAge} </p><p className="heading-6">Property Age</p></div> </li>

                        </ul>
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-compass icon"></i>   <div><p className="heading-7"> {propertyObject?.property_details?.Facing} </p><p className="heading-6">Facing</p></div> </li>
                            {/*<li><i className="fas fa-calendar-alt"></i> <div><p className="heading-7">  {moment(propertyObject?.RentalDetails?.AvailableFrom).format("DD-MMM-YYYY")} </p><p className="heading-6" >Available From</p></div></li>*/}
                            <li><i className="fas fa-couch"></i>   <div><p className="heading-7"> {propertyObject?.RentalDetails?.Furnishing} </p><p className="heading-6">Furnishing</p></div> </li>
                            <li><i className="fas fa-parking" ></i> <div><p className="heading-7"> {propertyObject?.RentalDetails?.Parking} </p><p className="heading-6">Parking</p></div> </li>

                        </ul>

                    </div>
                    <div className="product-bottom-content"><div className="item-author">
                        <div className="media">
                            <img loading="lazy" width="150" height="150" src={listing?.userInfo?.pic != undefined ? listing?.userInfo?.pic : DefaultuserImg} className="attachment-150x150 size-150x150" alt="" decoding="async" title="" />
                            <div className="media-body">
                                <div className="item-title">
                                    <a className="author-link" href="#">
                                        {isUSer && isUSer != "" ?
                                            currentUser.name
                                            :
                                            currentUser.name
                                        }
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="item-price">₹
                            {propertyObject?.RentalDetails?.PropertyAvailable == "Only rent" ? propertyObject?.RentalDetails?.ExpectedRent : propertyObject?.RentalDetails?.LeaseAmount}
                            <i>/</i><span>Month</span>
                        </div>
                    </div>

                </div>



            </div>
        </div>)
    }

    function residentialSell() {
        return (<div className="col-lg-12" onClick={handleClick}>
            <div className="property-box2 property-box4 wow  fadeInUp animated" data-wow-delay=".6s" style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
            }}>

                <div className="item-img">
                    <a href="#">
                        <img src={renderPropertyImage(propertyObject)} alt="blog" width="250" height="200" />
                    </a>
                    <div className="item-category-box1">
                        <div className="item-category">For Sale</div>
                    </div>

                    <div className="form-group col-lg-12" id="getOwner">

                        {isUSer && isUSer != "" ?
                            <button type="button" className="form-button" onClick={() => handleActiveBtn(listing)}>
                                View 10 Contact
                            </button>
                            :
                            <button className="form-button">Get Owner Number</button>
                        }
                    </div>
                </div>

                <div className="item-content item-content-property">
                    <div className="item-category10">{propertyObject?.property_details?.ApartmentType}</div>
                    <div className="react-icon react-icon-2">
                        {isUSer && isUSer != "" ?
                            <ul>
                                <li>
                                    <button type="button" className="btn btn-outline-primary btn-sm mr-4 px-4" onClick={() => handleEditBtn(listing)}>
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <select name="Request Action" className="form-control custom-select request-action"><option value="">Request Action</option><option value="activate">Activate Property</option><option value="deactive">Dectivate Property</option></select>
                                </li>
                            </ul>
                            :
                            <ul>
                                <li>
                                    <a href="favourite.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Favourites">
                                        <i className="flaticon-heart"></i>
                                    </a>
                                </li>
                            </ul>
                        }
                    </div>
                    <div className="verified-area">
                        <h3 className="item-title"><a href="#">{GetPropertyTitle(propertyObject)}</a></h3>
                    </div>
                    <div className="listing-badge-wrap">
                        <span className="badge rtcl-badge-popular popular-badge badge-success"> {listing.propertyType}</span>
                        <span className="badge rtcl-badge-popular popular-badge badge-success">Verified</span>
                        <span className="badge rtcl-badge-_top">Posted : {moment(listing.createdDate).format("DD-MMM-YYYY")}</span>
                        <span className="badge rtcl-badge-_top">Builtup Area : {propertyObject?.property_details?.builtUpArea} sqft</span>
                    </div>
                    <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>{propertyObject?.LocalityDetails?.city},{propertyObject?.LocalityDetails?.state}</div>
                    <div className="item-categoery3">
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-building"></i> <div><p className="heading-7"> {propertyObject?.property_details?.BHKType} </p><p className="heading-6" >Apartment Type</p></div></li>
                            <li><i className="fas fa-compass icon"></i>   <div><p className="heading-7"> {propertyObject?.property_details?.Facing} </p><p className="heading-6">Facing</p></div> </li>
                            <li><i className="fas fa-hourglass-half"></i> <div><p className="heading-7"> {propertyObject?.property_details?.PropertyAge} </p><p className="heading-6">Property Age</p></div> </li>

                        </ul>
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-calendar-alt"></i> <div><p className="heading-7">  {moment(propertyObject?.ReSaleDetails?.AvailableFromResale).format("DD-MMM-YYYY")} </p><p className="heading-6" >Available From</p></div></li>
                            <li><i className="fas fa-couch"></i>   <div><p className="heading-7"> {propertyObject?.ReSaleDetails?.Furnishing} </p><p className="heading-6">Furnishing</p></div> </li>
                            <li><i className="fas fa-parking" ></i> <div><p className="heading-7"> {propertyObject?.ReSaleDetails?.Parking} </p><p className="heading-6">Parking</p></div> </li>

                        </ul>
                    </div>
                    <div className="product-bottom-content"><div className="item-author">
                        <div className="media">
                            <img loading="lazy" width="150" height="150" src={listing?.userInfo?.pic != undefined ? listing?.userInfo?.pic : DefaultuserImg} className="attachment-150x150 size-150x150" alt="" decoding="async" title="" />
                            <div className="media-body">
                                <div className="item-title">
                                    <a className="author-link" href="#">
                                        {isUSer && isUSer != "" ?
                                            currentUser.name
                                            :
                                            currentUser.name
                                        }
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="item-price">₹
                            {propertyObject?.ReSaleDetails?.PriceNegotiable == "Yes" ? propertyObject?.ReSaleDetails?.ExpectedPrice : propertyObject?.ReSaleDetails?.ExpectedPrice}
                            <i>/</i><span>Price <br /> (₹6,000 per sq.ft. )</span></div>
                    </div>

                </div>



            </div>
        </div>)
    }

    function commercialRent() {
        return (<div className="col-lg-12" onClick={handleClick}>
            <div className="property-box2 property-box4 wow  fadeInUp animated" data-wow-delay=".6s" style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
            }}>

                <div className="item-img">
                    <a href="#">
                        <img src={renderPropertyImage(propertyObject)} alt="blog" width="250" height="200" />
                    </a>
                    <div className="item-category-box1">
                        <div className="item-category">For Rent</div>
                    </div>
                    <div className="form-group col-lg-12" id="getOwner">

                        {isUSer && isUSer != "" ?
                            <button type="button" className="form-button" onClick={() => handleActiveBtn(listing)}>
                                View 10 Contact
                            </button>
                            :
                            <button className="form-button">Get Owner Number</button>
                        }
                    </div>
                </div>

                <div className="item-content item-content-property">
                    <div className="item-category10">

                        {propertyObject?.property_details?.PropertyType}

                    </div>

                    <div className="react-icon react-icon-2">

                        {isUSer && isUSer != "" ?
                            <ul>
                                <li>
                                    <button type="button" className="btn btn-outline-primary btn-sm mr-4 px-4" onClick={() => handleEditBtn(listing)}>
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <select name="Request Action" className="form-control custom-select request-action"><option value="">Request Action</option><option value="activate">Activate Property</option><option value="deactive">Dectivate Property</option></select>
                                </li>
                            </ul>
                            :
                            <ul>
                                <li>
                                    <a href="favourite.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Favourites">
                                        <i className="flaticon-heart"></i>
                                    </a>
                                </li>
                            </ul>
                        }
                      
                    </div>
                    <div className="verified-area">
                        <h3 className="item-title"><a href="#">{GetPropertyTitle(propertyObject)}</a></h3>
                    </div>
                    <div className="listing-badge-wrap">
                        <span className="badge rtcl-badge-popular popular-badge badge-success"> {listing.propertyType}</span>
                        <span className="badge rtcl-badge-popular popular-badge badge-success">Verified</span>
                        <span className="badge rtcl-badge-_top">Posted : {moment(listing.createdDate).format("DD-MMM-YYYY")}</span>
                        <span className="badge rtcl-badge-_top">Builtup Area : {propertyObject?.property_details?.builtUpArea} sqft</span>
                    </div>
                    <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>{propertyObject?.LocalityDetails?.city},{propertyObject?.LocalityDetails?.state}</div>
                    <div className="item-categoery3">
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-building"></i> <div><p className="heading-7"> {propertyObject?.property_details?.PropertyType} </p><p className="heading-6" >Property Type</p></div></li>
                            <li><i className="fas fa-layer-group icon"></i> <div><p className="heading-7"> {propertyObject?.property_details?.Floor + "/" + propertyObject?.property_details?.TotalFloor} </p><p className="heading-6">Floors</p></div> </li>
                            <li><i className="fas fa-vector-square"></i>   <div><p className="heading-7"> {propertyObject?.property_details?.builtUpArea}  </p><p className="heading-6">Buitup</p></div> </li>


                        </ul>
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-couch"></i>   <div><p className="heading-7"> {propertyObject?.property_details?.Furnishing} </p><p className="heading-6">Furnishing</p></div> </li>
                            <li><i className="fas fa-parking" ></i> <div><p className="heading-7"> {propertyObject?.AmenitiesDetails?.CommercialParking} </p><p className="heading-6">Parking</p></div> </li>


                            <li><i className="fas fa-calendar-alt"></i> <div><p className="heading-7">  {moment(propertyObject?.RentalDetails?.AvailableFrom).format("DD-MMM-YYYY")} </p><p className="heading-6" >Available From</p></div></li>

                        </ul>
                    </div>
                    <div className="product-bottom-content"><div className="item-author">
                        <div className="media">
                            <img loading="lazy" width="150" height="150" src={listing?.userInfo?.pic != undefined ? listing?.userInfo?.pic : DefaultuserImg} className="attachment-150x150 size-150x150" alt="" decoding="async" title="" />
                            <div className="media-body">
                                <div className="item-title">
                                    <a className="author-link" href="#">
                                        {isUSer && isUSer != "" ?
                                            currentUser.name
                                            :
                                            currentUser.name
                                        }
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="item-price">₹
                            {propertyObject?.RentalDetails?.PropertyAvailable == "Only rent" ? propertyObject?.RentalDetails?.ExpectedRent : propertyObject?.RentalDetails?.LeaseAmount}
                            <i>/</i><span>Month</span></div>
                    </div>

                </div>



            </div>
        </div>)
    }


    function commercialSell() {
        return (<div className="col-lg-12" onClick={handleClick}>
            <div className="property-box2 property-box4 wow  fadeInUp animated" data-wow-delay=".6s" style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
            }}>

                <div className="item-img">
                    <a href="#">
                        <img src={renderPropertyImage(propertyObject)} alt="blog" width="250" height="200" />
                    </a>
                    <div className="item-category-box1">
                        <div className="item-category">For Sale</div>
                    </div>

                    <div className="form-group col-lg-12" id="getOwner">

                        {isUSer && isUSer != "" ?
                            <button type="button" className="form-button" onClick={() => handleActiveBtn(listing)}>
                                View 10 Contact
                            </button>
                            :
                            <button className="form-button">Get Owner Number</button>
                        }
                    </div>
                </div>

                <div className="item-content item-content-property">
                    <div className="item-category10">
                        {propertyObject?.property_details?.PropertyType}
                    </div>
                    <div className="react-icon react-icon-2">
                        {isUSer && isUSer != "" ?
                            <ul>
                                <li>
                                    <button type="button" className="btn btn-outline-primary btn-sm mr-4 px-4" onClick={() => handleEditBtn(listing)}>
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <select name="Request Action" className="form-control custom-select request-action"><option value="">Request Action</option><option value="activate">Activate Property</option><option value="deactive">Dectivate Property</option></select>
                                </li>
                            </ul>
                            :
                            <ul>
                                <li>
                                    <a href="favourite.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Favourites">
                                        <i className="flaticon-heart"></i>
                                    </a>
                                </li>
                            </ul>
                        }
                    </div>
                    <div className="verified-area">
                        <h3 className="item-title"><a href="#">{GetPropertyTitle(propertyObject)}</a></h3>
                    </div>
                    <div className="listing-badge-wrap">
                        <span className="badge rtcl-badge-popular popular-badge badge-success"> {listing.propertyType}</span>
                        <span className="badge rtcl-badge-popular popular-badge badge-success">Verified</span>
                        <span className="badge rtcl-badge-_top">Posted : {moment(listing.createdDate).format("DD-MMM-YYYY")}</span>
                        <span className="badge rtcl-badge-_top">Builtup Area : {propertyObject?.property_details?.builtUpArea} sqft</span>
                    </div>
                    <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>{propertyObject?.LocalityDetails?.city},{propertyObject?.LocalityDetails?.state}</div>
                    <div className="item-categoery3">
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-building"></i> <div><p className="heading-7"> {propertyObject?.property_details?.PropertyType} </p><p className="heading-6" >Property Type</p></div></li>
                            <li><i className="fas fa-layer-group icon"></i> <div><p className="heading-7"> {propertyObject?.property_details?.Floor + "/" + propertyObject?.property_details?.TotalFloor} </p><p className="heading-6">Floors</p></div> </li>
                            <li><i className="fas fa-vector-square"></i>   <div><p className="heading-7"> {propertyObject?.property_details?.builtUpArea}  </p><p className="heading-6">Buitup</p></div> </li>


                        </ul>
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-couch"></i>   <div><p className="heading-7"> {propertyObject?.property_details?.Furnishing} </p><p className="heading-6">Furnishing</p></div> </li>
                            <li><i className="fas fa-parking" ></i> <div><p className="heading-7"> {propertyObject?.AmenitiesDetails?.CommercialParking} </p><p className="heading-6">Parking</p></div> </li>


                            <li><i className="fas fa-calendar-alt"></i> <div><p className="heading-7">  {moment(propertyObject?.ReSaleDetails?.AvailableFromResale).format("DD-MMM-YYYY")} </p><p className="heading-6" >Available From</p></div></li>

                        </ul>
                    </div>
                    <div className="product-bottom-content"><div className="item-author">
                        <div className="media">
                            <img loading="lazy" width="150" height="150" src={listing?.userInfo?.pic != undefined ? listing?.userInfo?.pic : DefaultuserImg} className="attachment-150x150 size-150x150" alt="" decoding="async" title="" />
                            <div className="media-body">
                                <div className="item-title">
                                    <a className="author-link" href="#">
                                        {isUSer && isUSer != "" ?
                                            currentUser.name
                                            :
                                            currentUser.name
                                        }
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="item-price">₹
                            {propertyObject?.ReSaleDetails?.PriceNegotiable == "Yes" ? propertyObject?.ReSaleDetails?.ExpectedPrice : propertyObject?.ReSaleDetails?.ExpectedPrice}
                            <i>/</i><span>Price</span></div>
                    </div>

                </div>



            </div>
        </div>)
    }


    function PlotSell() {
        return (<div className="col-lg-12" onClick={handleClick}>
            <div className="property-box2 property-box4 wow  fadeInUp animated" data-wow-delay=".6s" style={{
                visibility: "visible",
                animationDelay: "0.6s",
                animationName: "fadeInUp",
            }}>

                <div className="item-img">
                    <a href="#">
                        <img src={renderPropertyImage(propertyObject)} alt="blog" width="250" height="200" />
                    </a>
                    <div className="item-category-box1">
                        <div className="item-category">For Sale</div>
                    </div>

                    <div className="form-group col-lg-12" id="getOwner">

                        {isUSer && isUSer != "" ?
                            <button type="button" className="form-button" onClick={() => handleActiveBtn(listing)}>
                                View 10 Contact
                            </button>
                            :
                            <button className="form-button">Get Owner Number</button>
                        }
                    </div>
                </div>

                <div className="item-content item-content-property">
                    <div className="item-category10">

                        {propertyObject?.LandDetails?.PropertyType}
                    </div>
                    <div className="react-icon react-icon-2">
                        {isUSer && isUSer != "" ?
                            <ul>
                                <li>
                                    <button type="button" className="btn btn-outline-primary btn-sm mr-4 px-4" onClick={() => handleEditBtn(listing)}>
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <select name="Request Action" className="form-control custom-select request-action"><option value="">Request Action</option><option value="activate">Activate Property</option><option value="deactive">Dectivate Property</option></select>
                                </li>
                            </ul>
                            :
                            <ul>
                                <li>
                                    <a href="favourite.html" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Favourites">
                                        <i className="flaticon-heart"></i>
                                    </a>
                                </li>
                            </ul>
                        }
                    </div>
                    <div className="verified-area">
                        <h3 className="item-title"><a href="#">{GetPropertyTitle(propertyObject)}</a></h3>
                    </div>
                    <div className="listing-badge-wrap">
                        <span className="badge rtcl-badge-popular popular-badge badge-success"> {listing.propertyType}</span>
                        <span className="badge rtcl-badge-popular popular-badge badge-success">Verified</span>
                        <span className="badge rtcl-badge-_top">Posted : {moment(listing.createdDate).format("DD-MMM-YYYY")}</span>
                        <span className="badge rtcl-badge-_top">Builtup Area : {propertyObject?.LandDetails?.PlotArea} sqft</span>
                    </div>
                    <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>{propertyObject?.LocalityDetails?.city},{propertyObject?.LocalityDetails?.state}</div>
                    <div className="item-categoery3">
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-home"></i> <div><p className="heading-7"> {propertyObject?.LandDetails?.PropertyType} </p><p className="heading-6" >Property Type</p></div></li>
                            <li><i className="fas fa-ruler-combined"></i>   <div><p className="heading-7"> {propertyObject?.LandDetails?.PlotLength + "*" + propertyObject?.LandDetails?.PlotWidth + "  " + propertyObject?.LandDetails?.LandUnits} </p><p className="heading-6">Dimension (L x B)</p></div> </li>
                            <li><i className="fas fa-vector-square"></i>   <div><p className="heading-7"> {propertyObject?.LandDetails?.PlotArea + "  " + propertyObject?.LandDetails?.LandUnits}  </p><p className="heading-6">Plot Area</p></div> </li>
                        </ul>
                        <ul className="mb-2 propCategory">
                            <li><i className="fas fa-calendar-alt"></i> <div><p className="heading-7">  {moment(propertyObject?.ReSaleDetails?.AvailableFromResale).format("DD-MMM-YYYY")} </p><p className="heading-6" >Available From</p></div></li>
                            <li><i className="fas fa-calendar-alt"></i>   <div><p className="heading-7"> {moment(listing?.createdDate).format("DD-MMM-YYYY")}  </p><p className="heading-6">Posted On</p></div> </li>

                            <li><i className="fas fa-border-all"></i> <div><p className="heading-7"> {propertyObject?.LandDetails?.BoundaryWall} </p><p className="heading-6">Boundary Wall</p></div> </li>

                        </ul>
                    </div>
                    <div className="product-bottom-content"><div className="item-author">
                        <div className="media">
                            <img loading="lazy" width="150" height="150" src={listing?.userInfo?.pic != undefined ? listing?.userInfo?.pic : DefaultuserImg} className="attachment-150x150 size-150x150" alt="" decoding="async" title="" />
                            <div className="media-body">
                                <div className="item-title">
                                    <a className="author-link" href="#">
                                        {isUSer && isUSer != "" ?
                                            currentUser.name
                                            :
                                            currentUser.name
                                        }
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="item-price">₹
                            {propertyObject?.ReSaleDetails?.PriceNegotiable == "Yes" ? propertyObject?.ReSaleDetails?.ExpectedPrice : propertyObject?.ReSaleDetails?.ExpectedPrice}
                            <i>/</i><span>Price</span></div>
                    </div>

                </div>



            </div>
        </div>)
    }


    return (

        <>{renderContent()}</>


    )
}
export default PropertyList