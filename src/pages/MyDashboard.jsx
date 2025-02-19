import { MyDashboardNav } from "../components";

import { NavLink, Link, useNavigate } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";
import JPOapi from "../common";
import { useSelector } from "react-redux";

import {
    MyDashboardHighlights   
} from "../components";

function MyDashboard() {

    const [advertiseData, setAdvertiseData] = useState([]);
    const [pendingAds, setPendingAds] = useState([]);
    const [draftAds, setDraftAds] = useState([]);
    const [approvedAds, setApprovedAds] = useState([]);
    const [rejectedAds, setRejectAds] = useState([]);
    const [publicEnquiries, setPublicEnquiries] = useState([]);

    const { currentUser } = useSelector((state) => state.user);
    const { userId } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("MyDashboard");
        console.log(currentUser);
        fetchAdvartise()
            .then((data) => {
                setAdvertiseData(data);
                console.log(data);
                // Filtering based on status
                setPendingAds(data.filter(ad => ad.status === "Pending"));
                setDraftAds(data.filter(ad => ad.status === "Draft"));
                setApprovedAds(data.filter(ad => ad.status === "Approved"));
                setRejectAds(data.filter(ad => ad.status === "Rejected"));
                

                
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const fetchAdvartise = async () => {
        const response = await fetch(JPOapi.GetAdServiceByUser.url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId,
            },
        });
        const { data } = await response.json();
        // order by created date in descending order
        data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        console.log(data);
        return data;
    };

    return (
        <>
            <section className="grid-wrap3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-12">
                            <div className="page-content-block">
                                <div className="col-md-12">
                                    <div className="container">
                                        <div className="row row-cards">
                                            <MyDashboardNav />
                                            <div className="col-lg-10" id="tab-section-right">
                                                <div className="card m-0 p-1">
                                                    <div className="card-body row">
                                                        <h3 className="widget-subtitle">My Dashboard</h3>

                                                        <div className="card-body row ">
                                                            <div className="row justify-content-center">
                                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                                    <div
                                                                        className="pricing-box1 wow zoomIn"
                                                                        data-wow-delay=".3s"
                                                                        style={{
                                                                            visibility: "visible",
                                                                            animationDelay: "0.3s",
                                                                            animationName: "zoomIn",
                                                                        }}
                                                                    >
                                                                        <div className="heading-title">
                                                                            <h3 className="item-title">
                                                                                Your Free listing
                                                                            </h3>
                                                                            <div className="item-price">
                                                                                {advertiseData?.length}  <span>/ {currentUser?.propertyCount} remaining</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="shape-img1">
                                                                            <img
                                                                                src="/img/figure/shape16.svg"
                                                                                alt="shape"
                                                                                width="56"
                                                                                height="64"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                                    <div
                                                                        className="pricing-box1 wow zoomIn"
                                                                        data-wow-delay=".3s"
                                                                        style={{
                                                                            visibility: "visible",
                                                                            animationDelay: "0.3s",
                                                                            animationName: "zoomIn",
                                                                        }}
                                                                    >
                                                                        <div className="heading-title">
                                                                            <h3 className="item-title">
                                                                                Draft 
                                                                            </h3>
                                                                            <div className="item-price">
                                                                                {draftAds?.length} <span>/ {currentUser?.propertyCount} listing</span>
                                                                            </div>
                                                                            {/* <p>Shen an unknown printer took a galley  of type and scrambled</p>*/}
                                                                        </div>
                                                                        <div className="shape-img1">
                                                                            <img
                                                                                src="/img/figure/shape17.svg"
                                                                                alt="shape"
                                                                                width="56"
                                                                                height="64"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                                    <div
                                                                        className="pricing-box1 wow zoomIn"
                                                                        data-wow-delay=".3s"
                                                                        style={{
                                                                            visibility: "visible",
                                                                            animationDelay: "0.3s",
                                                                            animationName: "zoomIn",
                                                                        }}
                                                                    >
                                                                        <div className="heading-title">
                                                                            <h3 className="item-title">
                                                                                Pending 
                                                                            </h3>
                                                                            <div className="item-price">
                                                                                {pendingAds?.length}  <span>/ {currentUser?.propertyCount} listing</span>
                                                                            </div>
                                                                            {/* <p>Shen an unknown printer took a galley  of type and scrambled</p>*/}
                                                                        </div>
                                                                        <div className="shape-img1">
                                                                            <img
                                                                                src="/img/figure/shape17.svg"
                                                                                alt="shape"
                                                                                width="56"
                                                                                height="64"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                                    <div
                                                                        className="pricing-box1 wow zoomIn"
                                                                        data-wow-delay=".3s"
                                                                        style={{
                                                                            visibility: "visible",
                                                                            animationDelay: "0.3s",
                                                                            animationName: "zoomIn",
                                                                        }}
                                                                    >
                                                                        <div className="heading-title">
                                                                            <h3 className="item-title">
                                                                                Approved
                                                                            </h3>
                                                                            <div className="item-price">
                                                                                {approvedAds?.length}  <span>/ {currentUser?.propertyCount} listing</span>
                                                                            </div>
                                                                            {/* <p>Shen an unknown printer took a galley  of type and scrambled</p>*/}
                                                                        </div>
                                                                        <div className="shape-img1">
                                                                            <img
                                                                                src="/img/figure/shape17.svg"
                                                                                alt="shape"
                                                                                width="56"
                                                                                height="64"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                                    <div
                                                                        className="pricing-box1 wow zoomIn"
                                                                        data-wow-delay=".3s"
                                                                        style={{
                                                                            visibility: "visible",
                                                                            animationDelay: "0.3s",
                                                                            animationName: "zoomIn",
                                                                        }}
                                                                    >
                                                                        <div className="heading-title">
                                                                            <h3 className="item-title">
                                                                                Rejected
                                                                            </h3>
                                                                            <div className="item-price">
                                                                                {rejectedAds?.length}  <span>/ {currentUser?.propertyCount} listing</span>
                                                                            </div>
                                                                            {/* <p>Shen an unknown printer took a galley  of type and scrambled</p>*/}
                                                                        </div>
                                                                        <div className="shape-img1">
                                                                            <img
                                                                                src="/img/figure/shape17.svg"
                                                                                alt="shape"
                                                                                width="56"
                                                                                height="64"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                                    <div
                                                                        className="pricing-box1 wow zoomIn"
                                                                        data-wow-delay=".3s"
                                                                        style={{
                                                                            visibility: "visible",
                                                                            animationDelay: "0.3s",
                                                                            animationName: "zoomIn",
                                                                        }}
                                                                    >
                                                                        <div className="heading-title">
                                                                            <h3 className="item-title">
                                                                                Public Enquiries
                                                                            </h3>
                                                                            <div className="item-price">
                                                                                {publicEnquiries?.length}  <span>/ {currentUser?.propertyCount} listing</span>
                                                                            </div>
                                                                            {/* <p>Shen an unknown printer took a galley  of type and scrambled</p>*/}
                                                                        </div>
                                                                        <div className="shape-img1">
                                                                            <img
                                                                                src="/img/figure/shape17.svg"
                                                                                alt="shape"
                                                                                width="56"
                                                                                height="64"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <MyDashboardHighlights
                                                    pickedData={advertiseData}
                                                    user={currentUser}                                              
                                                    template="MyDashboard"
                                                />


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyDashboard;
