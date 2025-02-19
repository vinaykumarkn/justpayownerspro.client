/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "../../assets/css/PropertyPosting.css";
import JPOapi from "../../common";
import { Link } from "react-router-dom";
import { loginUser, logoutUser } from "../../redux/auth/authSlice";
import getUserDetails from "../../common/user/getUserDetail";
import { store } from '../../redux/store';

const PostPropertyForm = () => {
    const [alert, setAlert] = useState({ type: "", message: "", show: false });
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track submissions

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const password = watch("password");

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const [key, setKey] = useState("Residential");
    const [selectedButton, setSelectedButton] = useState("ResidentialRent");

    const navigateTo = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    const { userId } = useSelector((state) => state.auth);

    const handleSelect = (k) => {
        setKey(k);
        const buttonMap = {
            Residential: "ResidentialRent",
            Commercials: "CommercialsRent",
            LandPlot: "LandPlotSale",
        };
        setSelectedButton(buttonMap[k] || "");
    };

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

    const handleSetValue = (newValue) => {
        setSelectedButton(newValue);
    };

    const generateGUID = () => uuidv4();

    const fetchAdvertise = async (xuserId) => {
        try {
            const response = await fetch(JPOapi.GetAdServiceByUser.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${xuserId}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
            return Array.isArray(data) ? data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)) : [];
        } catch (error) {
            console.error("Error fetching advertisements:", error);
            return [];
        }
    };
    const GetUserInfoByMailID = async (email) => {
        try {
            const response = await fetch(JPOapi.GetUserInfoByMailID.url, {
                method: JPOapi.GetUserInfoByMailID.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
            return true;
        } catch (error) {
            console.error("Error fetching advertisements:", error);
            return false;
        }
    };

    function generateTempPassword() {
        const length = Math.floor(Math.random() * (15 - 8 + 1)) + 8; // Random length between 8 and 15
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "!@#$%^&*()_+";
        const allChars = letters + numbers + specialChars;

        let password = "";

        // Ensure at least one special character
        password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

        // Ensure at least one digit
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));

        // Fill the remaining characters randomly
        for (let i = 2; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        // Shuffle the password to avoid predictable placement of special characters
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        return password;
    }

    const onSubmit = async (data) => {

        try {


            console.log("checking user exits or not")
            console.log(data);
            setIsSubmitting(true); // Disable submit button after click
            var xuserId = userId;
            var propertyCount = currentUser?.propertyCount || 0;

            if (!currentUser || currentUser.length === 0) {

                console.log("no sessions found calling api to check user exists")

                 const tempPassword = generateTempPassword();

                const filteredUser = (({ fullName, email, mobileNumber }) => ({
                        fullName,
                        email,
                        mobileNumber,
                        password: tempPassword,
                        confirmPassword: tempPassword,
                        isCheckedTerms: true,
                        userType: 0,
                }))(data);


                const response = await fetch(JPOapi.oneTimeRegister.url, {
                    method: JPOapi.oneTimeRegister.method,
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filteredUser)
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
                    setTimeout(() => setAlert({ ...alert, show: false, }), 50000);
                    setIsSubmitting(false); // Re-enable submit button after completion
                    return;
                }

                //setIsSubmitting(true);

                const result = await response.json();
                localStorage.setItem("sessionToken", result.sessionToken);
                console.log('Success:', result.message);

                await getUserDetails(result.jwtToken);
                localStorage.setItem("token", result.jwtToken);
                store.dispatch(loginUser());     
                xuserId = result.jwtToken;
                propertyCount = result.propertyCount;

            } 

            const ads = await fetchAdvertise(xuserId);
            if (ads.length >= propertyCount) {
                setAlert({ type: "danger", message: "You have reached the maximum property count.", show: true });
                return;
            }

            const guid = generateGUID();
            let path = {
                Residential: "/manage/property/residential/",
                Commercials: "/manage/property/commercial/",
                LandPlot: "/manage/property/landorplot/",
            }[key];

            if (selectedButton) {
                path += `${selectedButton.replace(key, "")}/${guid}`;
            }

            path += `/property?justpayFr=pyp_${selectedButton.replace(key, "")}`;

            navigateTo(path.toLowerCase());


        } catch (error) {
            setAlert({ type: "danger", message: `Error: ${error.message}`, show: true });
        }




        try {
            //console.log("checking user exits or not")
            //if (!currentUser || currentUser.length === 0) {
            //    console.log("no sessions found calling api to check user exists")
            //    const checkUser = await GetUserInfoByMailID(data.email);
            //    setShowLogin(!!checkUser);
            //    setShowRegister(!checkUser);

            //    setAlert({ type: "danger", message: "User not found.", show: true });
            //    return;            
            //}          
           
            //const ads = await fetchAdvertise();
            //if (ads.length >= currentUser.propertyCount) {
            //    setAlert({ type: "danger", message: "You have reached the maximum property count.", show: true });
            //    return;
            //}

            //const guid = generateGUID();
            //let path = {
            //    Residential: "/manage/property/residential/",
            //    Commercials: "/manage/property/commercial/",
            //    LandPlot: "/manage/property/landorplot/",
            //}[key];

            //if (selectedButton) {
            //    path += `${selectedButton.replace(key, "")}/${guid}`;
            //}
            //path += `/property?justpayFr=pyp_${selectedButton.replace(key, "")}`;
            //navigateTo(path.toLowerCase());


        } catch (error) {
            setAlert({ type: "danger", message: `Error: ${error.message}`, show: true });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div id="postPropertyForm">
                {(!currentUser || currentUser.length === 0) && (
                    <div className="postPropertyForm-top-body">
                        <div className="row">
                            <div className="col-sm-6 col-md-6">
                                <div className="form-group">
                                    <label>Full Name <span className="form-required">*</span></label>
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
                                    {errors.fullName && <span className="formError" style={{ color: "red" }}>{errors.fullName.message}</span>}
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                                <div className="form-group">
                                    <label>Email Address <span className="form-required">*</span></label>
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
                            </div>
                            <div className="col-sm-6 col-md-6">
                                <div className="form-group">
                                    <label>Mobile Number <span className="form-required">*</span></label>
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
                                    {errors.mobileNumber && <span className="formError" style={{ color: "red" }}>{errors.mobileNumber.message}</span>}
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                                <div className="form-group">
                                    <label>Select City <span className="form-required">*</span></label>
                                    <select className="form-control" {...register("city", { required: "City is required" })}>
                                        <option value="">Select City</option>
                                        <option value="New York">New York</option>
                                        <option value="Los Angeles">Los Angeles</option>
                                        <option value="Chicago">Chicago</option>
                                        <option value="Houston">Houston</option>
                                    </select>
                                    {errors.city && <span className="formError" style={{ color: "red" }}>{errors.city.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label>
                                        <input type="checkbox" {...register("whatsappUpdates")} /> Get updates on WhatsApp
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="tab-style-1 tab-style-custom">
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={handleSelect} className="nav nav-tabs">
                    {["Residential", "Commercials", "LandPlot"].map((tab) => (
                        <Tab eventKey={tab} title={tab} key={tab} className="nav-item">
                            <div className="row g-2 align-items-center">
                                <div className="col-12 py-3 plans">
                                    {["Rent", "Sale" ].map((option) => {
                                        const value = `${tab}${option}`;
                                        return (
                                            <label
                                                key={value}
                                                className="plan basic-plan"
                                                onClick={() => handleSetValue(value)}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`${tab}Type`}
                                                    checked={selectedButton === value}
                                                    readOnly
                                                />
                                                <div className="plan-content">
                                                    <img
                                                        loading="lazy"
                                                        src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/life-saver-img.svg"
                                                        alt=""
                                                    />
                                                    <div className="plan-details">
                                                        <span>{`${tab} ${option}`}</span>
                                                        <p>Description for {`${tab} ${option}`}</p>
                                                    </div>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </Tab>
                    ))}
                    </Tabs>

                </div>
                {alert.show && <div className={`alert alert-${alert.type} mt-3`}>{alert.message}                    
                    
                    {showLogin && <Link to="/login" >Login</Link>}
                    {showRegister && <Link to="/register" >Register</Link>}

                </div>}

                <div className="form-group col-lg-12">

                    <button type="submit" id="create-account-btn" className="btn btn-primary btn-block" disabled={isSubmitting}>
                        {isSubmitting ? "Posting..." : "Start Posting Your Ad For FREE"}
                    </button>
                    


                </div>
            </div>
        </form>

    );
};

export default PostPropertyForm;
