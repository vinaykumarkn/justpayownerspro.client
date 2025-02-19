import { SectionTitle, MyDashboardNav } from "../components";
import myprofile from '../mockdata/myprofile.json';
import { NavLink, Link, useNavigate } from 'react-router-dom';
/*import '../../src/assets/css/MyProfile.css'*/
import { useEffect, useMemo, useState } from "react";
import JPOapi from "../common";
import { useSelector } from "react-redux";

/*import noImageRent from '../assets/images/noImageRent_Sale.svg';*/

const MyFavorites = function () {
    const [advertiseData, setAdvertiseData] = useState([]);
    const [option, setOption] = useState("All");
    const { id: userId } = useSelector(state => state.user?.currentUser);
    console.log(userId);

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
        const _url = JPOapi.GetFavoriteByUserID.url + "?userID=" + userId
        const response = await fetch(_url, {
            method: JPOapi.GetFavoriteByUserID.method,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const { data } = await response.json();
        console.log(data);
        // order by created date in descending order
        // data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        // console.log(data);
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
        const propertyDetails = JSON.parse(item.PropertyObject);

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
        // const galleryDetails = JSON.parse(item?.propertyData)?.GalleryDetails;
        // if (galleryDetails && galleryDetails.length > 0) {
        //     return galleryDetails[0];
        // } else {
        //     return noImageRent;
        // }
        return "";
    }

    return (<>

        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12">



                                <div className="container">
                                    {/* <SectionTitle title="Advertise With Us" path="/AdvertiseWithUs" type="breadcrumb" />*/}
                                    <div className="row row-cards">
                                        <MyDashboardNav />
                                        <div className="col-lg-10" id="tab-section-right">
                                            <div className="card m-0 p-1">
                                                <div className="card-body row">
                                                    <h3 className="widget-subtitle">You have already posted {advertiseData.length} properties on Justpayowners</h3>



                                                    <div className="widget widget-taglist" >


                                                        <ul className="tag-list">
                                                            <li><Link onClick={(e) => handleOptionChange("All")} className={option == "All" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>All</Link></li>
                                                            <li>  <Link onClick={(e) => handleOptionChange("Rent")} className={option == "Rent" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Residential-Rent</Link></li>
                                                            <li><Link onClick={(e) => handleOptionChange("Sale")} className={option == "Sale" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Residential-Sale</Link></li>
                                                            <li>  <Link onClick={(e) => handleOptionChange("Commercial Rent")} className={option == "Commercial Rent" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Commercial-Rent</Link></li>
                                                            <li><Link onClick={(e) => handleOptionChange("Commercial Sale")} className={option == "Commercial Sale" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Commercial-Sale</Link></li>
                                                            <li><Link onClick={(e) => handleOptionChange("LandOrPlot Sale")} className={option == "LandOrPlot Sale" ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary"}>Plot-Sale  </Link></li>

                                                        </ul>





                                                    </div>

                                                    
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                <div id="property-listing" className="row ">
                                                    {advertiseData.length === 0 ? (
                                                        <div>No properties found at the moment.</div>
                                                    ) : (filteredData.length > 0 ? (
                                                        filteredData.map((item, index) => (
                                                            <div className="col-md-6 property-item" key={index}>
                                                                <div className="row p-2 bg-white border rounded">
                                                                    <div className="property-type-tag"><p>{item?.adType}</p></div>
                                                                    <div className="property-status">{item?.status}</div>
                                                                    <div className="col-md-4 mt-1"><img className="img-fluid img-responsive rounded product-image" src={renderPropertyImage(item)} /></div>
                                                                    <div className="col-md-8 mt-1">
                                                                        <div className="d-flex flex-row">
                                                                            <div className="media-body">
                                                                                {item.propertyTitle != null && item.propertyTitle != "" && <h5 className="mb-2">
                                                                                    <a target="_blank" href={"/property-detail/" + item.advertiseID} className="text-color">{item.propertyTitle}<i className="fa fa-external-link"></i></a></h5>}

                                                                                <small className="text-muted">{item.city}, {item.state}</small>
                                                                                <p className="text-muted mb-1"><small>price:</small><small><b> 31.00 Lakh - Banglore</b></small></p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                                                            <button type="button" className="btn btn-outline-primary btn-sm mr-4 px-4" onClick={() => handleEditBtn(item)}>
                                                                                Edit
                                                                            </button>
                                                                            <select name="Request Action" className="form-control custom-select request-action"><option value="">Request Action</option><option value="activate">Activate Property</option><option value="deactive">Dectivate Property</option></select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-footer text-right mt-3">
                                                                        <button type="submit" className="btn btn-primary">Make request</button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div>No data found</div>
                                                    )
                                                    )}
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

export default MyFavorites;
