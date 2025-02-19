/* eslint-disable react/no-unknown-property */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import JPOapi from "../common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function ResetPassword(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [alert, setAlert] = useState({ type: "", message: "", show: false });
    const navigate = useNavigate();   
    const password = watch('password');  // Watching the password field
    useEffect(() => {
       
    }, []);


    const onSubmit = async data => {
        console.log(data);

        // Parse query parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const email = params.get("userMail");

        const xdata = {
            Email: email,   // Replace with actual email
            Token: token,   // Replace with actual token
            NewPassword: data.password,   // Replace with actual token
        };   

        try {
            // You can handle form submission here, like sending the data to an API
            const response = await fetch(JPOapi.resetPassword.url, {
                method: JPOapi.resetPassword.method,
                referrerPolicy: "unsafe-url",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(xdata)
            }).catch((err) => {
                toast.error("Reset password failed due to: " + err.message);

                // On error
                setAlert({
                    type: "danger",
                    message: "Something went wrong - " + err.message,
                    show: true,
                });

                // Hide the alert after 3 seconds
                setTimeout(() => setAlert({ ...alert, show: false }), 50000);


            });
            if (!response.ok) {
                const result = await response.json();
                console.error('Error:', result.errors);
                setAlert({
                    type: "danger",
                    message: "Something went wrong - " + result.errors,
                    show: true,
                });
                setTimeout(() => setAlert({ ...alert, show: false }), 50000);

                return;
            }

            const result = await response.json();
            localStorage.setItem("sessionToken", result.sessionToken);
            console.log('Success:', result.message);
            toast.success("Login successful");

            // On success
            setAlert({
                type: "success",
                message: result.message,
                show: true,
            });
            // Hide the alert after 3 seconds
            setTimeout(() => setAlert({ ...alert, show: false }), 50000);
            //navigate("/");

            Swal.fire({
                icon: 'success',
                title: 'Reset Password Successful',
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
            // On error
            setAlert({
                type: "danger",
                message: "Something went wrong - " + error.errors,
                show: true,
            });

            // Hide the alert after 3 seconds
            setTimeout(() => setAlert({ ...alert, show: false }), 50000);
        }
    };


    return (
        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 rtcl-login-form-wrap">
                                <h2>Reset Password</h2>
                                <form id="rtcl-login-form" className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                    {/* New Password Field */}
                                    <div className="form-group">
                                        <label className="control-label">
                                            New Password <strong className="rtcl-required">*</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: { value: 8, message: "Password must be at least 8 characters long" },
                                                maxLength: { value: 15, message: "Password cannot be longer than 15 characters" },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                                                    message: "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                                                },
                                            })}
                                        />
                                        {errors.password && (
                                            <span className="formError errorMssg" style={{ color: "red" }}>
                                                {errors.password.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="form-group">
                                        <label className="control-label">
                                            Confirm Password <strong className="rtcl-required">*</strong>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            {...register("confirmPassword", {
                                                required: "Please confirm your password",
                                                validate: (value) => value === password || "Passwords do not match",
                                            })}
                                        />
                                        {errors.confirmPassword && (
                                            <span className="formError errorMssg" style={{ color: "red" }}>
                                                {errors.confirmPassword.message}
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
                                        <div className="form-group d-flex align-items-center">
                                            <button type="submit" className="btn btn-primary btn-block"> Reset Password </button>
                                        </div>                                       
                                    </div>
                                </form>

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

export default ResetPassword;
