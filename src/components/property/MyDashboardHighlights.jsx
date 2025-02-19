import { useState, useEffect } from "react";
import noImageRent from '../../assets/img/noImageRent_Sale.svg';
import moment from 'moment'

const MyDashboardHighlights = ({ pickedData }) => {
    const [advertiseData, setAdvertiseData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All"); // Default: 'All'

    useEffect(() => {
        setAdvertiseData(pickedData || []); // Ensure it's an array
    }, [pickedData]);



    // 🔹 Filter data based on selected status
    const filteredData = selectedStatus === "All"
        ? advertiseData
        : advertiseData.filter((item) => item.status === selectedStatus);



    return (
       
            <div className="container">
                <div className="isotope-wrap">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <div className="item-heading-left">                               
                                <h2 className="section-title">My Properties</h2>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                            <div className="isotope-classes-tab text-md-end text-center">
                                {["All", "Draft", "Pending", "Approved", "Rejected"].map((status) => (
                                    <a
                                        key={status}
                                        className={`nav-item cursor-pointer px-3 py-2 ${selectedStatus === status ? "bg-blue-500 text-white" : "bg-gray-200"
                                            }`}
                                        onClick={() => setSelectedStatus(status)}
                                    >
                                        {status}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row featuredContainer">
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => {
                                let galleryImage = "";
                                let city = "";

                                try {
                                    const parsedObject = JSON.parse(item.propertyObject);
                                    galleryImage = parsedObject?.GalleryDetails?.[0] || noImageRent;
                                    city = parsedObject?.LocalityDetails?.city || "";
                                } catch (error) {
                                    console.error("Error parsing JSON:", error);
                                }

                                return (
                                    <>
                                        <div class="col-xl-6 col-sm-12 ">
                                        <div className="main-banner-box4 wow slideInUp p-3 border rounded shadow-sm bg-white" data-wow-delay=".3s">
                                            <div className="banner-style-1 d-flex justify-content-between align-items-center">
                                                <div className="item-category-box1">
                                                        <span className="badge bg-primary"> {item.propertyType}   </span>
                                                </div>
                                                    <div className="item-price fw-bold fs-5 text-dark">
                                                        {JSON.parse(item.propertyObject)?.RentalDetails?.ExpectedRent && (
                                                            <>
                                                                {JSON.parse(item.propertyObject)?.RentalDetails?.ExpectedRent}
                                                                <span className="fs-6 text-muted">/ month</span>
                                                            </>
                                                        )}
                                                        {JSON.parse(item.propertyObject)?.RentalDetails?.ExpectedRent && (
                                                            <>
                                                                {JSON.parse(item.propertyObject)?.RentalDetails?.ExpectedRent}
                                                                <span className="fs-6 text-muted">/ month</span>
                                                            </>
                                                        )}
                                                </div>
                                            </div>
                                                <h3 className="item-title mt-2 fw-bold">
                                                    <a href={`/property/${item.propertyID}`}>{item.propertyTitle}</a>                                                   

                                                </h3>
                                            <div className="location-area text-muted mt-1">
                                                    <i className="flaticon-maps-and-flags text-primary"></i>
                                                    {city}
                                            </div>
                                            <div className="item-categoery3 item-categoery4 mt-3">
                                                <ul className="list-unstyled d-flex justify-content-between text-muted">
                                                    <li>
                                                            
                                                            Posted : <strong>{moment(item.createdDate).format("DD-MMM-YYYY")}</strong>
                                                    </li>
                                                    <li>
                                                            
                                                            Status: <strong>{item.status}</strong>
                                                    </li>
                                                   
                                                </ul>
                                            </div>
                                            </div>
                                        </div>

                                    

                                    </>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 text-center w-full py-4">No records found.</p>
                        )}
                    </div>
                </div>
            </div>
       
    );
};

export default MyDashboardHighlights;
