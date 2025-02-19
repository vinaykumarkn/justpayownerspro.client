import { SectionTitle, MyDashboardNav, PostPropertyForm } from "../components";
import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

function MyNewProperty() {

    useEffect(() => {
        // Some side effect logic
        console.log('MyNewProperty rendered');

        return () => {
            // Cleanup if necessary
        };
    }, []); // Make sure dependencies are correctly set
    return (<>

        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12">
                                
                                    <div className="container">
                                        {/*  <SectionTitle title="Advertise With Us" path="/AdvertiseWithUs" type="breadcrumb" />*/}
                                        <div className="row row-cards">
                                            <MyDashboardNav />
                                            <div className="col-lg-10" id="tab-section-right">
                                                <div className="card m-0 p-1">
                                                    <div className="card-body row">
                                                        <PostPropertyForm />
                                                    </div>
                                                </div>
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

export default MyNewProperty;

