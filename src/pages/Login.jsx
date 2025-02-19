
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { store } from '../redux/store';
import { loginUser, logoutUser } from "../redux/auth/authSlice";

import { useForm } from 'react-hook-form';
import { signInSuccess } from "../redux/user/userSlice";
import JPOapi from "../common";
import getUserDetails from "../common/user/getUserDetail";

import Swal from "sweetalert2";
function Login() {
    const [alert, setAlert] = useState({ type: "", message: "", show: false });
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loginState = useSelector((state) => state.auth.isLoggedIn);
	const { register, handleSubmit, watch, formState: { errors } } = useForm();



	useEffect(() => {
		if (loginState) {
			localStorage.clear();
			store.dispatch(logoutUser());
		}
	}, []);

	const onSubmit = async data => {
		console.log(data);
		try {
			// You can handle form submission here, like sending the data to an API
			const response = await fetch(JPOapi.signIn.url, {
				method: JPOapi.signIn.method,
				referrerPolicy: "unsafe-url",
				headers: {
					"Content-Type": 'application/json',
				},
				body: JSON.stringify(data)
			}).catch((err) => {
				toast.error("Login failed due to: " + err.message);
			});
			if (!response.ok) {
				const result = await response.json();
                console.error('Error:', result);
                // On error
                setAlert({
                    type: "danger",
                    message: "Something went wrong - " + result.message,
                    show: true,
                });

                // Hide the alert after 3 seconds
                setTimeout(() => setAlert({ ...alert, show: false }), 50000);

				return;
			}
			const result = await response.json();
			localStorage.setItem("sessionToken", result.sessionToken);
			console.log('Success:', result.message);
           /* await getUserDetails(result.jwtToken);*/

            toast.success("Login successful");

           /* localStorage.setItem("token", result.jwtToken);*/
           /* store.dispatch(loginUser());*/

            // On success
            setAlert({
                type: "success",
                message: result.message,
                show: true,
            });
            // Hide the alert after 3 seconds
            setTimeout(() => setAlert({ ...alert, show: false }), 50000);


            await getUserDetails(result.jwtToken);            
            localStorage.setItem("token", result.jwtToken);
            store.dispatch(loginUser());
            

            // store.dispatch(signInSuccess(result.message));
           // navigate("/profile/mydashboard");
            navigate("/");
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
                    <div className="col-lg-6 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 rtcl-login-form-wrap">
                                <h2>Login</h2>
                                <form
                                    id="rtcl-login-form"
                                    className="form-horizontal"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className="card-body p-6">
                                        {/* Email Field */}
                                        <div className="form-group">
                                            <label className="control-label">
                                                E-mail <strong className="rtcl-required">*</strong>
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
                                                })}
                                            />
                                            {errors.email && (
                                                <span className="formError errorMssg" style={{ color: "red" }}>
                                                    {errors.email.message}
                                                </span>
                                            )}
                                        </div>

                                        {/* Password Field */}
                                        <div className="form-group">
                                            <label className="control-label">Password *</label>
                                            <input
                                                placeholder="Enter your password"
                                                className="form-control"
                                                type="password"
                                                {...register("password", {
                                                    required: "Password is required",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must be at least 8 characters long",
                                                    },
                                                    maxLength: {
                                                        value: 15,
                                                        message: "Password cannot be longer than 15 characters",
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\da-zA-Z])[A-Za-z\d\W]{8,15}$/,
                                                        message:
                                                            "Password must be 8-15 characters long, contain at least one letter, one number, and one special character",
                                                    },
                                                    validate: (value) =>
                                                        !/\s/.test(value) || "Password cannot contain spaces",
                                                })}
                                            />
                                            {errors.password && (
                                                <span className="formError errorMssg" style={{ color: "red" }}>
                                                    {errors.password.message}
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
                                        <div className="form-group d-flex align-items-center">
                                            <button type="submit" className="btn btn-primary btn-block">
                                                Login
                                            </button>
                                        </div>

                                        {/*<div className="form-group d-flex align-items-center">*/}
                                        {/*    <button type="submit" className="btn btn-primary btn-block">*/}
                                        {/*        Resend Activation Url*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}

                                        {/* Forgot Password Link */}
                                        <div className="form-group">
                                            <p className="rtcl-forgot-password">
                                                <Link to="/forgot-password" className="float-right small">
                                                    Forgot Your Password?
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </form>


                                <div className="text-center text-muted">
                                    Dont have account yet?{" "}
                                    <Link to="/register" onClick={() => window.scrollTo(0, 0)}>
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
		);
}

export default Login;
