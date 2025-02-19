/* eslint-disable react/jsx-key */
import { SectionTitle, MyDashboardNav, PropertyList } from "../components";
import myprofile from '../mockdata/myprofile.json';
import { NavLink, Link, useNavigate } from 'react-router-dom';
/*import '../../src/assets/css/MyProfile.css'*/
import { useEffect, useMemo, useState } from "react";
import JPOapi from "../common";
import { useSelector } from "react-redux";
import noImageRent from '../assets/img/noImageRent_Sale.svg';
import 'bootstrap';
import PropertyFavourite from '../components/propertypost/PropertyFavouriteButton';

const MyProperties = function () {
    const [advertiseData, setAdvertiseData] = useState([]);
    const [option, setOption] = useState("All");
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
        const response = await fetch(JPOapi.GetAdServiceByUser.url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userId
            }
        });
        const { data } = await response.json();
        // order by created date in descending order
        data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        console.log(data);
        return data;
    }

    const handleOptionChange = (optVal) => {
        setOption(optVal);

    }

    const filteredData = useMemo(() => {
        if (option === 'All') {
            return advertiseData;
        } else {
            return advertiseData.filter(item => item.adType === option || item.propertyType === option);
        }
    }, [advertiseData, option]);

    const handleEditBtn = (item) => {
        const propertyDetails = JSON.parse(item.propertyObject);

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

    const handleActiveBtn = (item) => {
        const propertyDetails = JSON.parse(item.propertyObject);
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

    const renderPropertyImage = (item) => {
        const galleryDetails = JSON.parse(item.propertyObject).GalleryDetails;
        if (galleryDetails && galleryDetails.length > 0) {
            return galleryDetails[0];
        } else {
            return noImageRent;
        }
    }

    return (<>





        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 ">


                                <div className="container">
                                    {/*<SectionTitle title="Advertise With Us" path="/AdvertiseWithUs" type="breadcrumb" />*/}
                                    <div className="row row-cards">
                                        <MyDashboardNav />
                                        <div className="col-lg-10" id="tab-section-right">
                                            <div className="card m-0 p-1">
                                                <div className="card-body row">
                                                    <h3 className="widget-subtitle">You have already posted {advertiseData.length} properties on Justpayowners</h3>

                                                    <div className="widget widget-taglist" >
                                                        <ul className="tag-list">
                                                            <li><Link onClick={(e) => handleOptionChange("All")} className={option == "All" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>All</Link></li>
                                                            <li><Link onClick={(e) => handleOptionChange("Residential Rent")} className={option == "Rent" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Residential-Rent</Link></li>
                                                            <li><Link onClick={(e) => handleOptionChange("Residential Sale")} className={option == "Sale" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Residential-Sale</Link></li>
                                                            <li><Link onClick={(e) => handleOptionChange("Commercial Rent")} className={option == "Commercial Rent" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Commercial-Rent</Link></li>
                                                            <li><Link onClick={(e) => handleOptionChange("Commercial Sale")} className={option == "Commercial Sale" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Commercial-Sale</Link></li>
                                                            <li><Link onClick={(e) => handleOptionChange("LandOrPlot Sale")} className={option == "LandOrPlot Sale" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Plot-Sale  </Link></li>

                                                        </ul>
                                                    </div>

                                                    
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="property-wrap-9">
                                                    <div className="tab-style-1 tab-style-3">
                                                        <div className="tab-content" id="myTabContent">
                                                            <div className="tab-pane fade show active" id="mylisting" role="tabpanel">
                                                                <div className="row">


                                                                    <>

                                                                        {advertiseData.length === 0 ? (
                                                                            <div>No properties found at the moment.</div>
                                                                        ) : (filteredData.length > 0 ? (
                                                                            filteredData.map((item, index) => (

                                                                                <article key={index} id={"article" + index}>
                                                                                    <PropertyList listing={item} Category={item.propertyType} AdType={item.AdType} isUSer={userId} />
                                                                                </article>

                                                                            ))
                                                                        ) : (
                                                                            <div>No data found</div>
                                                                        )
                                                                        )}

                                                                    </>






                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                        </div>
                                    </div>
                                </div >


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    </>
    );
};

export default MyProperties;
