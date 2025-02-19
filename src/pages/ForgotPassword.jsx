/* eslint-disable react/no-unknown-property */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import JPOapi from "../common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ForgotPassword(props) {

    const [alert, setAlert] = useState({ type: "", message: "", show: false });
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {


    }, []);

    const onSubmit = async data => {
        console.log(data);
        try {
            // You can handle form submission here, like sending the data to an API
            const response = await fetch(JPOapi.forgotPassword.url, {
                method: JPOapi.forgotPassword.method,
                referrerPolicy: "unsafe-url",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(data)
            }).catch((err) => {
                toast.error("Forgot password failed due to: " + err.message);

                // On error
                setAlert({
                    type: "danger",
                    message: "Something went wrong - " + err.message,
                    show: true,
                });

                // Hide the alert after 3 seconds
                setTimeout(() => setAlert({ ...alert, show: false }), 20000);

              

            });
            if (!response.ok) {
                const result = await response.json();
                console.error('Error:', result.errors);
                return;
            }
            const result = await response.json();
            console.log('Success:', result.message);
            toast.success("Forgot successful");
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
                title: 'Forgot password',
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
            console.error('Forgot error:', error);
            toast.error("Failed: " + error.message);
            // On error
            setAlert({
                type: "danger",
                message: "Something went wrong - " + error.message,
                show: true,
            });

            // Hide the alert after 3 seconds
            setTimeout(() => setAlert({ ...alert, show: false }), 20000);
        }
    };


    return (


        <section id="forgot-password-form" className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 rtcl-login-form-wrap">
                                <h2>Forgot password</h2>
                                <form id="rtcl-login-form" className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                    <p className="text-muted">
                                        Enter your email address, and your password reset link will be sent to you.
                                    </p>

                                    {/* Email Field */}
                                    <div className="form-group">
                                        <label className="control-label">
                                            Email Address <strong className="rtcl-required">*</strong>
                                        </label>
                                        <input
                                            placeholder="Enter your email"
                                            className="form-control"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                    message: "Enter a valid email address",
                                                },
                                                validate: (value) => value.trim() !== "" || "Email cannot be empty",
                                            })}
                                        />
                                        {errors.email && (
                                            <span className="formError errorMssg" style={{ color: "red" }}>
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Alert Message */}
                                    {alert.show && (
                                        <div className={`alert alert-${alert.type} mt-3`} role="alert">
                                            {alert.message}
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="form-footer">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Submit
                                        </button>
                                    </div>
                                </form>


                                <div className="form-group">
                                    <p className="rtcl-forgot-password">
                                        Forget it, <Link to="/login"  >send me back</Link>    to the sign in screen.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default ForgotPassword;