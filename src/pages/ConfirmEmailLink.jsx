/* eslint-disable react/no-unknown-property */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import JPOapi from "../common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function ConfirmEmailLink(props) {

    const [alert, setAlert] = useState({ type: "", message: "", show: false });
    const navigate = useNavigate();  
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
 /*   const { register, handleSubmit, watch, formState: { errors } } = useForm();*/

    const handleRedirect = () => {
        window.location.href = "/login";
    };

    useEffect(() => {
        const confirmEmailLink = async () => {
            try {

                // Parse query parameters from the URL
                const params = new URLSearchParams(window.location.search);
                const token = params.get("token");
                const email = params.get("userMail");


                if (!token || !email) {
                    toast.error("Missing token or email in URL.");

                    // On error
                    setAlert({
                        type: "danger",
                        message: "Missing token or email in URL ", 
                        show: true,
                    });

                    // Hide the alert after 3 seconds
                    setTimeout(() => setAlert({ ...alert, show: false }), 20000);

                    return;
                }
                const data = {
                    Email: email,   // Replace with actual email
                    Token: token    // Replace with actual token
                };               
            
                const response = await fetch(JPOapi.confirmEmailLink.url , {
                    method: JPOapi.confirmEmailLink.POSTmethod,
                    referrerPolicy: "unsafe-url",
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(data) 
                });
                if (!response.ok) {
                    const result = await response.json();
                    console.error('Confirm email link error:', result.message);
                    toast.error("Confirm email link failed.");

                    console.log(result.isUserExist)
                    console.log(result.isEmailConfirmed)

                    if (result.isUserExist && result.isEmailConfirmed == false) {
                        setIsVisible(true);
                    }

                    // On error
                    setAlert({
                        type: "danger",
                        message: "Something went wrong - " + result.message,
                        show: true,
                    });

                    // Hide the alert after 3 seconds
                    setTimeout(() => setAlert({ ...alert, show: false }), 20000);

                    return;
                }

                const result = await response.json();
                console.log('Success:', result.message);
                toast.success("Confirm email link successful");

                // On success
                setAlert({
                    type: "success",
                    message: result.message,
                    show: true,
                });
                // Hide the alert after 3 seconds
                setTimeout(() => setAlert({ ...alert, show: false }), 20000);

                Swal.fire({
                    icon: 'success',
                    title: 'Confirmation Successful',
                    text: result.message,
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirect to login page after success
                        //  window.location.href = '/login';  // or use React Router's history.push('/login')
                        navigate("/login");
                    }
                });
            } catch (err) {
                toast.error("Confirm email link failed due to: " + err.message);
                console.error('Confirm email link failed due to:', err.message);
                // On error
                setAlert({
                    type: "danger",
                    message: "Something went wrong - " + err.message,
                    show: true,
                });

                // Hide the alert after 3 seconds
                setTimeout(() => setAlert({ ...alert, show: false }), 20000);
            }
        };

        confirmEmailLink();    


    }, []);

    const handleButtonClick = async () => {
      

        setLoading(true);
        setError(null);
        // Parse query parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const email = params.get("userMail");

        const data = {
            Email: email   // Replace with actual email           
        };


        try {
            // You can handle form submission here, like sending the data to an API
            const response = await fetch(JPOapi.SendActivationUrl.url, {
                method: JPOapi.SendActivationUrl.method,
                referrerPolicy: "unsafe-url",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(data)
            }).catch((err) => {
                toast.error("SendActivationUrl failed due to: " + err.message);
            });
            if (!response.ok) {
                const result = await response.json();
                console.error('Error:', result.errors);
                return;
            } 
            const result = await response.json();
            console.log('Success:', result.message);
            toast.success("SendActivationUrl email link successful");

            // On success
            setAlert({
                type: "success",
                message: result.message,
                show: true,
            });
            // Hide the alert after 3 seconds
            setTimeout(() => setAlert({ ...alert, show: false }), 20000);

            Swal.fire({
                icon: 'success',
                title: 'Send Activation Url Successful',
                text: result.message,
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirect to login page after success
                    //  window.location.href = '/login';  // or use React Router's history.push('/login')
                    navigate("/login");
                }
            });

           
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed: " + error.message);
        }
    };


    return (
        <section className="grid-wrap3 ">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 rtcl-login-form-wrap">
                                <h2>Confirm Email Link</h2>
                                <form
                                    id="rtcl-login-form"
                                    className="form-horizontal"
                                   
                                >
                                    <div className="form-group">                                      

                                        {alert.show && (
                                            <div className={`alert alert-${alert.type} mt-3`} role="alert">
                                                <label className="control-label">
                                                    Confirm Email :    {alert.message}
                                                </label>
                                             
                                            </div>
                                        )}
                                    </div>
                                   
                                </form>
                                <div className="form-group d-flex align-items-center col-lg-6 col-md-6 d-flex justify-content-between">
                                    <button
                                        onClick={handleRedirect}
                                        className="btn btn-primary btn-block"
                                    >
                                        Go to Login
                                    </button>


                                    {isVisible && 
                                        <button type="submit" className="btn btn-primary btn-block" onClick={handleButtonClick} disabled={loading} >
                                        Resend Activation Url
                                        </button>
                                   }

                                </div>     
                                {error && <p>Error: {error}</p>}
                                <div className="form-group">
                                    <p className="rtcl-forgot-password"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ConfirmEmailLink;
