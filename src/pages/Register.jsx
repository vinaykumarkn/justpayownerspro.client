import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import JPOapi from "../common";
import Swal from "sweetalert2";
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Register(props) {
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track submissions
    const [alert, setAlert] = useState({ type: "", message: "", show: false });
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const { register, handleSubmit, reset ,watch, formState: { errors } } = useForm();
    const password = watch('password');  // Watching the password field

    // List of disposable email providers (for example)
    const disposableEmailDomains = [
        "tempmail.com",
        "mailinator.com",
        "guerrillamail.com",
        "10minutemail.com",
        "throwawaymail.com",
        "fakeinbox.com",
        "dispostable.com",
        "temp-mail.org",
        "getnada.com",
        "maildrop.cc",
        "mailcatch.com",
        "trashmail.com",
        "yopmail.com",
        "mailnesia.com",
        "boun.cr",
        "discard.email",
        "byom.de",
        "tempmail.net",
        "minuteinbox.com",
        "spamgourmet.com",
        "meltmail.com",
        "dodgit.com",
        "mailetter.com",
        "spambox.us",
        "onetimeemail.com",
        "throwawaymail.net",
        "fakemailgenerator.com",
        "mytemp.email",
        "inboxbear.com",
        "moakt.com",
        "mailfor.io",
        "fake-mail.de",
        "tempemail.co",
        "tempmail.net",
        "emailtemporanea.com",
        "whoremail.com",
        "tempsmails.com",
        "trashyemail.com",
        "spoofmail.de",
        "spambox.xyz",
        "chogmail.com",
        "supermail.com",
        "mailtothis.com",
        "guerrillamail.org",
        "neomailbox.com",
        "pookmail.com",
        "tempe-mail.com",
        "inboxkitten.com",
        "mailquack.com",
        "jetable.org",
        "spambog.com",
        "phreaker.net",
        "nomail.pl",
        "tempmail.us",
        "courrieltemporaire.com",
        "disposableemailaddress.com",
        "emailondeck.com",
        "justemail.in",
        "mail-temporaire.com",
        "tempemailaddress.com",
        "quickinbox.com",
        "send-email.org",
        "tempemail.com",
        "randommail.org",
        "tempbox.in",
        "trashmail.me",
        "mytrashmail.com",
        "mailfake.com",
        "mailcatcher.com",
        "sendfakeemail.com",
        "emailtemp.com"
    ];

    // Function to check if the email is from a disposable email provider
    const isDisposableEmail = (email) => {
        const domain = email.split("@")[1];
        return disposableEmailDomains.includes(domain);
    };

    useEffect(() => {
        // Clears all fields when the component is mounted
        reset({
            fullName: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
            isCheckedTerms: false,
        });
    }, [reset]);

    const onSubmit = async data => {

        console.log(data);
        setIsSubmitting(true); // Disable submit button after click
        try {
            // You can handle form submission here, like sending the data to an API 
            const response = await fetch(JPOapi.signUp.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const result = await response.json();
                console.error('Error:', result.errors);
                setAlert({
                    type: "danger",
                    message: "Something went wrong - " + result.errors,
                    show: true,
                });
                // Hide the alert after 3 seconds
                setTimeout(() => setAlert({ ...alert, show: false , }), 50000);
                setIsSubmitting(false); // Re-enable submit button after completion
                return;
            }
            const result = await response.json();
            console.log('Success:', result.message);
            toast.success("Registration Successful");
            // On success
            setAlert({
                type: "success",
                message: result.message,
                show: true,
            });
            // Reset the form fields after successful submission
            reset();  // This will clear all the form fields
            // Hide the alert after 3 seconds
            setTimeout(() => setAlert({ ...alert, show: false }), 99000);
            setIsSubmitting(false); // Re-enable submit button after completion
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: result.message ,
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
            setAlert({
                type: "danger",
                message: "Something went wrong - " + error.message,
                show: true,
            });
            // Hide the alert after 3 seconds
            setTimeout(() => setAlert({ ...alert, show: false }), 50000);
            setIsSubmitting(false); // Re-enable submit button after completion
        }
    };


    return (
        <section id="register-form" className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 rtcl-login-form-wrap" >
                                <h2 className='mb-3'>Register</h2>
                                <form className="rtcl-login-form" onSubmit={handleSubmit(onSubmit)}>

                                    <div className="col-md-12 row m-0">
                                        <div className="form-group col-md-6">
                                            <label className="control-label">
                                                Full Name <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                className="form-control"
                                                {...register("fullName", {
                                                    required: "Full Name is required",
                                                    minLength: { value: 3, message: "Full Name must be at least 3 characters" },
                                                    maxLength: { value: 30, message: "Full Name cannot exceed 30 characters" },
                                                    pattern: {
                                                        value: /^[^@]+$/,  // Ensures full name does not contain @ (email-like)
                                                        message: "Full Name cannot be an email address"
                                                    }
                                                })}
                                            />
                                            {errors.fullName && <span className="formError errorMssg" style={{ color: 'red' }}>{errors.fullName.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-12 row m-0">
                                        
                                        <div className="form-group col-md-6">
                                            <label className="control-label">
                                                Email Address <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                className="form-control"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                        message: "Enter a valid email address",
                                                    },
                                                    validate: {
                                                        notDisposable: (value) =>
                                                            !isDisposableEmail(value) || "Disposable email addresses are not allowed",
                                                    }
                                                })}
                                            />
                                            {errors.email && <span className="formError errorMssg" style={{ color: 'red' }}>{errors.email.message}</span>}

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="control-label">
                                                Mobile Number <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                className="form-control"
                                                type="tel"
                                                maxLength="10"
                                                {...register("mobileNumber", {
                                                    required: "Mobile number is required",
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: "Enter a valid 10-digit mobile number",
                                                    },
                                                })}
                                                onKeyPress={(e) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault(); // Prevents non-numeric input
                                                    }
                                                }}
                                            />
                                            {errors.mobileNumber && <span className="formError errorMssg" style={{ color: 'red' }}>{errors.mobileNumber.message}</span>}

                                        </div>
                                    </div>
                                    <div className="col-md-12 row m-0">
                                        <div className="form-group col-md-6">
                                            <label className="control-label">
                                                Password <span style={{ color: 'red' }}>*</span>
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
                                            {errors.password && <span className="formError errorMssg" style={{ color: 'red' }}>{errors.password.message}</span>}

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="control-label">
                                                Confirm Password <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                className="form-control"
                                                type="password"
                                                {...register("confirmPassword", {
                                                    required: "Please confirm your password",
                                                    validate: (value) => value === password || "Passwords do not match",
                                                })}
                                            />
                                            {errors.confirmPassword && <span className="formError errorMssg" style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}

                                        </div>
                                    </div>


                                    <div className="form-check ps-0">
                                        <label className="custom-control custom-checkbox d-flex">
                                            <input
                                                className="custom-control-input"
                                                type="checkbox"
                                                {...register("isCheckedTerms", {
                                                    required: "You must accept the terms and conditions",
                                                })}
                                            />

                                            <span className="form-check-label">
                                                Agree to the{" "}
                                                <Link onClick={() => setModalShow(true)}>terms and policy</Link>
                                            </span>

                                        </label>
                                        {errors.isCheckedTerms && <span className="formError errorMssg ms-2" style={{ color: 'red' }}>{errors.isCheckedTerms.message}</span>}

                                        {/* Terms and Conditions Modal */}
                                        {modalShow && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <h4>Terms and Policy</h4>
                                                    <p>Here are the terms and policies...</p>
                                                    <button onClick={() => setModalShow(false)}>Close</button>
                                                </div>
                                            </div>
                                        )}
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </div>
                                    {alert.show && (
                                        <div className={`alert alert-${alert.type} mt-3`} role="alert">
                                            {alert.message}
                                        </div>
                                    )}
                                    <div className="form-footer d-flex justify-content-between">                                     

                                        <button type="submit" id="create-account-btn" className="btn btn-primary btn-block" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting..." : "Create new account"}
                                        </button>

                                        <div id="signin-link" className="text-muted"> Already have account?  <Link to="/login"  >Sign in</Link>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Register;