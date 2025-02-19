import Jsonfooter from "../mockdata/footerData.json";
import { NavLink, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";

const ContactUs = function () {
    console.log("ContactUs - Render");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = useCallback(async (data) => {
        setIsSubmitting(true);
        try {
            console.log("Form Data:", data);
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return (
        <>
            <section className="grid-wrap3">
                <div className="container">
                    <div className="col-lg-12 rtcl-login-form-wrap">
                        <div className="contact-box1">
                            <div className="contact-img">
                                <img
                                    src="https://radiustheme.com/demo/html/homlisti/img/blog/contact1.jpg"
                                    alt="Contact"
                                    height="502"
                                    width="607"
                                    loading="lazy"
                                />
                            </div>
                            <div className="contact-content">
                                <h3 className="contact-title">Office Information</h3>
                                <ul className="contact-list">
                                    <li>JustPayOwners Real Estate Agency</li>
                                    <li>Kr Puram, Bangalore - 560036</li>
                                    <li>(9:30 AM to 6:00 PM IST, Mon to Sat)</li>
                                </ul>
                                <div className="phone-box">
                                    <div className="item-lebel">Email :</div>
                                    <div className="phone-number">
                                        <a href="mailto:support@justpayowners.com">
                                            support@justpayowners.com
                                        </a>
                                    </div>
                                    <div className="item-lebel">Contact :</div>
                                    <div className="phone-number">+91 9900803075</div>
                                </div>
                                <div className="social-box">
                                    <strong>Social Share:</strong>
                                    <ul className="item-social">
                                        <li>
                                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                                                <i className="fab fa-whatsapp"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Map */}
                <div className="container">
                    <div className="col-lg-12 rtcl-login-form-wrap">
                        <div className="contact-box2">
                            <iframe
                                title="Location Map"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31099.803872209053!2d77.70488290468712!3d13.005364603014906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11abc8ffe3e7%3A0xd8368746c98e53bf!2sKrishnarajapuram%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1719839034377!5m2!1sen!2sin"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                            <div className="contact-content">
                                <h3 className="contact-title">Quick Contact</h3>
                                <p>
                                    <strong>Note:</strong> Please drop your message here.
                                </p>
                                <form className="contact-box rt-contact-form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="form-group col-lg-6">
                                            <label htmlFor="fname">Name *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                                                {...register("fname", { required: "Name is required" })}
                                                placeholder="Your Name"
                                            />
                                            {errors.fname && <div className="invalid-feedback">{errors.fname.message}</div>}
                                        </div>

                                        <div className="form-group col-lg-6">
                                            <label htmlFor="phone">Phone *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                                {...register("phone", {
                                                    required: "Phone is required",
                                                    pattern: { value: /^[0-9]+$/, message: "Enter a valid phone number" },
                                                })}
                                                placeholder="Your Phone"
                                            />
                                            {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                        </div>

                                        <div className="form-group col-lg-12">
                                            <label htmlFor="email">Email *</label>
                                            <input
                                                type="email"
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                        message: "Enter a valid email address",
                                                    },
                                                })}
                                                placeholder="Your Email"
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                        </div>

                                        <div className="form-group col-lg-12">
                                            <label htmlFor="message">Message *</label>
                                            <textarea
                                                className={`form-text ${errors.comment ? "is-invalid" : ""}`}
                                                {...register("comment", { required: "Message is required" })}
                                                placeholder="Your Message"
                                                cols="30"
                                                rows="5"
                                            ></textarea>
                                            {errors.comment && <div className="invalid-feedback">{errors.comment.message}</div>}
                                        </div>

                                        <div className="form-group col-lg-12">
                                            <button type="submit" className="item-btn" disabled={isSubmitting}>
                                                {isSubmitting ? "Sending..." : "Send Message"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="action-wrap1 wow zoomIn">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="action-box1">
                                <div className="action-layout">
                                    <div className="item-title">
                                        <i className="fas fa-users"></i>
                                        <h3>Become an Agent</h3>
                                        <p>Join us as an agent and grow your career.</p>
                                    </div>
                                    <div className="call-button">
                                        <NavLink to="/agency-lists1" className="call-btn">
                                            Join Now
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;
