import { SectionTitle, MyDashboardNav } from "../components";
import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

function MyComplaint() {

    useEffect(() => {
        // Some side effect logic
        console.log('MyComplaint rendered');

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
                                                <div className="card m-0 p-4">
                                                <div className="card-body row">
                                                    <h3 className="widget-subtitle">My Complaint</h3> 
                                                       
                                                    
                                                    <div className="card-body row">
                                                        <table className="table card-table table-vcenter text-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th className="w-1">No.</th>
                                                                    <th>Title</th>
                                                                    <th>Complaint Date</th>
                                                                    <th>Status</th>
                                                                    <th></th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td><span className="text-muted">001406</span></td>
                                                                    <td><a href="invoice.html" className="text-inherit">Sales Presentation</a></td>
                                                                    <td>
                                                                        4 Feb 2018
                                                                    </td>
                                                                    <td>
                                                                        <span className="status-icon bg-secondary"></span>
                                                                        Pending
                                                                    </td>

                                                                    <td className="text-right">
                                                                        <a href="javascript:void(0)" className="btn btn-secondary btn-sm">Manage</a>
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-secondary btn-sm dropdown-toggle" data-toggle="dropdown">Actions</button>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <a className="icon" href="javascript:void(0)">
                                                                            <i className="fe fe-edit"></i>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

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
            </div>
        </section>

        
    </>
    );
}

export default MyComplaint;

