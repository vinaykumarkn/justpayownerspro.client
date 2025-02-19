import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import JPOapi from "../../common";
import { useParams } from "react-router";
import { useForm } from 'react-hook-form'
import FormUpdate from "../../common/EnquiryandReportAndGetContactForms/UpdateForms"
import ContactModel from '../../common/EnquiryandReportAndGetContactForms/ContactModel'
import EnquiryModel from '../../common/EnquiryandReportAndGetContactForms/EnquiryModel'
import ReportModel from '../../common/EnquiryandReportAndGetContactForms/ReportModel'
import Swal from 'sweetalert2';

const PropertyOwnerDetails = ({ tabTitle, property }) => {
    const getPropertyData = JSON.parse(property?.PropertyObject || "{}") ||
        JSON.parse(property?.propertyData || "{}");

    /* const { id: userId } = useSelector(state => state.user?.currentUser);*/

    const { id: userId } = useSelector(state => state.user?.currentUser || "" );
    
    const pageTitle = document.title; // Get the current page title
    const currentUrl = window.location.href; // Get the current page URL
    const params = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    
    // const { userId } = useSelector(state => state.auth);
    console.log("PropertyId - ", params?.id)

    const { reset, register, handleSubmit, getValues, setError, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const handleFormSubmit = async (data, url, type, props) => {
        try {
            const serverRes = await FormUpdate(userId, data, url)
            console.log("serverRes", serverRes)
            if (serverRes.success === false) {
                toast.error(serverRes.message, {
                    autoClose: 2000,
                })
            }
            else {
                // toast.success(serverRes.message, {
                //     autoClose: 2000,
                // })  
                Swal.fire({
                    title: `${type} Submitted Successfully`,
                    text: `Your ${type} has been Submitted successfully`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    reset()
                    setModalShow(false)
                    //navigate(`/property-detail/${PropertyId}`);
                });
            }
        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
        }
    }


    const onSubmit = handleSubmit(async (props, data, e) => {
        console.log("data", props)
        if (data.Textarea != undefined) {
            let url = JPOapi.PublicCallEnquiry.url
            let type = "Enquiry"
            const EnquiryModelData = EnquiryModel.properties;
            EnquiryModelData.requesterName = data.FullName
            EnquiryModelData.requesterEmail = data.Email
            EnquiryModelData.requesterPhone = data.MobileNumber
            EnquiryModelData.requesterMesg = data.Textarea
            EnquiryModelData.ownerID = "tessting";
            EnquiryModelData.userID = userId || "tessting";
            EnquiryModelData.propertyID = params?.id;
            EnquiryModelData.propertyUrl = location.href;
            EnquiryModelData.remark = "testing remark";
            EnquiryModelData.status = "Published";
            EnquiryModelData.createdAt = new Date().toISOString();
            EnquiryModelData.updatedAt = new Date().toISOString();
            console.log(EnquiryModelData);
            await handleFormSubmit(EnquiryModelData, url, type, props)
        }
        if (data.Textarea == undefined && data.ReportReasons == undefined) {
            let url = JPOapi.UpdateGetContact.url
            let type = "Contact"
            const ContactModelData = ContactModel.properties;
            ContactModelData.firstName = data.FullName
            ContactModelData.email = data.Email
            ContactModelData.phoneNumber = data.MobileNumber
            ContactModelData.AdvertiseID = PropertyId
            ContactModelData.CreatedBy = userId;
            ContactModelData.createdDate = new Date().toISOString();
            ContactModelData.updatedDate = new Date().toISOString();
            ContactModelData.inquiryDate = new Date().toISOString();
            ContactModelData.inquiryStatus = "Submitted"
            await handleFormSubmit(ContactModelData, url, type, props)
        }
        if (data.ReportReasons != undefined) {
            let url = JPOapi.UpdateReport.url
            let type = "Report"
            const ReportModelData = ReportModel.properties;
            ReportModelData.name = data.FullName
            ReportModelData.email = data.Email
            ReportModelData.phone = data.MobileNumber
            ReportModelData.AdvertiseID = PropertyId
            ReportModelData.issueType = data.ReportReasons.join(",")
            ReportModelData.createdDate = new Date().toISOString();
            ReportModelData.updatedDate = new Date().toISOString();
            ReportModelData.status = "Submitted"
            await handleFormSubmit(ReportModelData, url, type, props)
        }

    })

    const handleShow = (title) => {
        setModalTitle(title);
        setModalShow(true);
    };



    function EnquiryAdvertiser(props) {
        const handleClose = () => { reset(); props.onHide() };
        return (
            <Modal
                {...props}
                backdrop="static"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.modaltitle}
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit, props)}>
                    <Modal.Body>
                        <div className="mb-3">


                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-sm-12 col-12">
                                        <div className="page-content-block">


                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" placeholder="Full Name" id="FullName" name="FullName" onChange={e => optionchanged(e, "FullName")}  {...register("FullName", "props.modaltitle", { required: true })} />
                                                <label htmlFor="floating-name">Full Name</label>
                                                {errors.FullName && <span className="formError errorMssg" style={{ color: 'red' }}> FullName Required</span>}
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="Email"
                                                    placeholder="Email address"
                                                    {...register("Email", {
                                                        required: "Email is required",
                                                        // pattern: {
                                                        //     value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                        //     message: "Invalid email address"
                                                        // }
                                                    })}
                                                />
                                                <label htmlFor="Email">Email address</label>
                                                {errors.Email && <span className="formError errorMssg" style={{ color: 'red' }}>{errors.Email.message}</span>}
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="MobileNumber"
                                                    placeholder="Mobile Number"
                                                    {...register("MobileNumber", {
                                                        required: "Mobile Number is required",
                                                        // pattern: {
                                                        //     value: /^[0-9]{10}$/,
                                                        //     message: "Mobile Number must be 10 digits"
                                                        // }
                                                    })}
                                                />
                                                <label htmlFor="MobileNumber">Mobile Number</label>
                                                {errors.MobileNumber && <span className="formError errorMssg" style={{ color: 'red' }}>{errors.MobileNumber.message}</span>}
                                            </div>

                                            {props.modaltitle == "Enquiry" && (
                                                <div className="mb-3">
                                                    <label htmlFor="Textarea" className="form-label">Mesage to Owner</label>
                                                    <textarea
                                                        className="form-control"
                                                        name="Textarea"
                                                        id="Textarea"
                                                        rows="3"
                                                        placeholder="Content.."
                                                        {...register("Textarea", { required: "Content is required" })}
                                                    >
                                                    </textarea>
                                                    {errors.Textarea && <span className="formError errorMssg" style={{ color: 'red' }}>{errors.Textarea.message}</span>}
                                                </div>
                                            )}
                                            {props.modaltitle == "Report" && (
                                                <div className="mb-3">
                                                    <label className="form-label">Simple selectgroup</label>
                                                    <div className="form-selectgroup">
                                                        {["Property Sold/Rented Out", "Incorrect Location/Address", "Wrong Property Details( Price/Location/etc)", "Advertiser not Responding/Not Reachable", "Fake/Incorrect Images", "Other"].map((value, index) => (
                                                            <label className="form-selectgroup-item" key={index}>
                                                                <input
                                                                    type="checkbox"
                                                                    name="ReportReasons"
                                                                    value={value}
                                                                    className="form-selectgroup-input"
                                                                    {...register("ReportReasons")}
                                                                />
                                                                <span className="form-selectgroup-label">{value}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>


                                            )}
                                            <div className="form-group">
                                                <label className="custom-control custom-checkbox">
                                                    <input
                                                        className="custom-control-input"
                                                        type="checkbox"
                                                        name="isCheckedTerms"
                                                        {...register("isCheckedTerms", { required: "You must agree to be contacted" })}
                                                    />
                                                    <span className="custom-control-label">
                                                        I agree to be contacted thru call, WhatsApp,
                                                        sms & e-mail by justpayowners and other advertisers for similar properties.
                                                    </span>
                                                </label>
                                                {errors.isCheckedTerms && <span className="formError errorMssg" style={{ color: 'red' }}>{errors.isCheckedTerms.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-primary btn-space">Get Owner Details</button>
                        {/* <Button onClick={props.onHide}>Close</Button> */}
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }


    return (
        <div className="widget widget-contact-box" id={tabTitle} >



            <h3 className="widget-subtitle">Contact Owner</h3>
            <div className="media d-flex">
                <div className="flex-shrink-0">
                    <div className="item-img">
                        <a href="agent-lists1.html"><img src="https://radiustheme.com/demo/html/homlisti/img/team/team9.png" alt="widget" width="107" height="100" /></a>
                    </div>
                </div>
                <div className="media-body flex-grow-1 ms-3">
                    <h4 className="item-title">RadiusTheme</h4>
                    <div className="item-phn">
                        + 132 899 6XXX
                    </div>
                    <div className="item-mail">agent@radiustheme.com</div>

                </div>
            </div>
            <div className="item-mail">Report what was not correct in this property </div>
            <ul className="wid-contact-button">
                <li>
                    <a
                        href={`https://wa.me/?text=${pageTitle}%20${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                       Sold Out 
                    </a>

                </li>
                <li>
                    <a
                        href={`https://wa.me/?text=${pageTitle}%20${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Wrong Info
                    </a>

                </li>
                <li>
                    <a
                        href={`https://wa.me/?text=${pageTitle}%20${currentUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Listed by Broker
                    </a>

                </li>
               

            </ul>
            <div className="contact-box rt-contact-form" >
                <div className="row">
                    <div className="form-group col-lg-12">
                        <div className="advanced-button">
                            <button type="submit" className="item-btn" onClick={() => handleShow('Enquiry')}>
                                Enquiry Now <i className="fas fa-envelope icon"></i>
                            </button>
                        </div>
                    </div>
                    <div className="form-group col-lg-12">
                        <div className="advanced-button">
                            <button type="submit" className="item-btn" onClick={() => handleShow('Contact')}>
                                Get Owner Number <i className="fas fa-phone"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-response"></div>
            </div>
            <EnquiryAdvertiser modaltitle={modalTitle} show={modalShow} onHide={() => setModalShow(false)} />
        </div>

    )
}
export default PropertyOwnerDetails