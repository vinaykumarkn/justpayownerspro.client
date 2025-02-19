import Jsonfooter from "../mockdata/footerData.json";
import { NavLink, Link } from "react-router-dom";
const AboutUs = function () {
    console.log("AboutUs- Render");
    return (
        <>
            <section className="about-wrap2 grid-wrap3">
                <div className="container">
                    <div className="col-md-12 rtcl-login-form-wrap">
                        <div className="row flex-row-reverse flex-lg-row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="about-img">
                                    <img
                                        src="https://radiustheme.com/demo/html/homlisti/img/blog/about8.jpg"
                                        alt="about"
                                        width="746"
                                        height="587"
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div
                                    className="about-box3 wow fadeInUp"
                                    data-wow-delay=".2s"
                                    style={{
                                        visibility: "visible",
                                        animationDelay: "0.2s",
                                        animationName: "fadeInUp",
                                    }}
                                >
                                    <span className="item-subtitle">About Us</span>
                                    <h2 className="item-title">
                                        We're on a Mission to Change View of RealEstate Field.
                                    </h2>
                                    <p>
                                        when an unknown printer took a galley of type and scrambled
                                        it to make type specimen bookt has survived not only five
                                        centuries alsoey jequery the leap into electronic
                                        typesetting.
                                    </p>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="about-layout1">
                                                <div className="item-img">
                                                    <img
                                                        src="https://radiustheme.com/demo/html/homlisti/img/figure/shape14.svg"
                                                        alt="shape"
                                                        width="60"
                                                        height="57"
                                                    />
                                                </div>
                                                <h3 className="item-sm-title">Modern Villa</h3>
                                                <p>
                                                    when unknown printer took galley of type and
                                                    scrambled.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="about-layout1">
                                                <div className="item-img">
                                                    <img
                                                        src="https://radiustheme.com/demo/html/homlisti/img/figure/shape15.svg"
                                                        alt="shape"
                                                        width="62"
                                                        height="57"
                                                    />
                                                </div>
                                                <h3 className="item-sm-title">Secure Payment</h3>
                                                <p>
                                                    when unknown printer took galley of type and
                                                    scrambled.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row flex-row flex-lg-row-reverse">
                            <div className="col-xl-6 col-lg-6">
                                <div className="about-layout3">
                                    <div className="item-img">
                                        <img
                                            src="https://radiustheme.com/demo/html/homlisti/img/blog/about9.jpg"
                                            alt="about"
                                            width="809"
                                            height="587"
                                        />
                                        <div className="play-button">
                                            <div className="item-icon">
                                                <a
                                                    href="http://www.youtube.com/watch?v=1iIZeIy7TqM"
                                                    className="play-btn play-btn-big"
                                                >
                                                    <span className="play-icon style-2">
                                                        <i className="fas fa-play"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="about-layout2">
                                    <span className="item-subtitle">Company Power</span>
                                    <h2 className="item-title">
                                        The Core Company Values Of Our main Goal.
                                    </h2>
                                    <p>
                                        when an unknown printer took a galley of type and scrambled
                                        it to make type specimen bookt has survived.
                                    </p>
                                    <div className="skills-wrap-layout-2 counter-appear">
                                        <div className="single-skill">
                                            <div className="title-bar">
                                                <h4 className="title"> Modern Technology </h4>
                                            </div>
                                            <div className="skill-bar">
                                                <div
                                                    className="skill-per"
                                                    data-per="59%"
                                                    style={{ width: "59%" }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="single-skill">
                                            <div className="title-bar">
                                                <h4 className="title">Tax Solution Area</h4>
                                            </div>
                                            <div className="skill-bar">
                                                <div
                                                    className="skill-per"
                                                    data-per="79%"
                                                    style={{ width: "79%" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="team-wrap1">
                <div className="container">
                    <div className="item-heading-center mb-20">
                        <span className="section-subtitle">Expertise Is Here</span>
                        <h2 className="section-title">Our Exclusive Agetns</h2>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div
                                className="team-box1 wow fadeInUp"
                                data-wow-delay=".6s"
                                style={{
                                    visibility: "visible",
                                    animationDelay: "0.2s",
                                    animationName: "fadeInUp",
                                }}
                            >
                                <div className="item-img">
                                    <a href="agent-lists1.html">
                                        <img
                                            src="https://radiustheme.com/demo/html/homlisti/img/team/team20.png"
                                            alt="team"
                                            width="475"
                                            height="511"
                                        />
                                    </a>
                                    <ul className="team-social-1">
                                        <li className="social-item">
                                            <a
                                                href="https://radiustheme.com/"
                                                target="_blank"
                                                className="social-hover-icon social-link"
                                            >
                                                <i className="fas fa-share-alt"></i>
                                            </a>
                                            <ul className="team-social-dropdown">
                                                <li className="social-item">
                                                    <a
                                                        href="https://www.facebook.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li className="social-item">
                                                    <a
                                                        href="https://twitter.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li className="social-item">
                                                    <a
                                                        href="https://www.linkedin.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div className="category-box">
                                        <div className="item-category">
                                            <a href="agent-lists1.html">08 Listings</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-content">
                                    <div className="item-title">
                                        <h3>
                                            <a href="agent-lists1.html">Andren Willium</a>
                                        </h3>
                                        <h4 className="item-subtitle">
                                            <a href="agency-lists1.html">Sunshine</a>
                                        </h4>
                                    </div>
                                    <div className="item-contact">
                                        <div className="item-icon">
                                            <i className="fas fa-phone-alt"></i>
                                        </div>
                                        <div className="item-phn-no">Call: +123 699 7700</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div
                                className="team-box1 wow fadeInUp"
                                data-wow-delay=".4s"
                                style={{
                                    visibility: "visible",
                                    animationDelay: "0.2s",
                                    animationName: "fadeInUp",
                                }}
                            >
                                <div className="item-img">
                                    <a href="agent-lists1.html">
                                        <img
                                            src="https://radiustheme.com/demo/html/homlisti/img/team/team17.png"
                                            alt="team"
                                            width="475"
                                            height="511"
                                        />
                                    </a>
                                    <ul className="team-social-1">
                                        <li className="social-item">
                                            <a
                                                href="https://radiustheme.com/"
                                                target="_blank"
                                                className="social-hover-icon social-link"
                                            >
                                                <i className="fas fa-share-alt"></i>
                                            </a>
                                            <ul className="team-social-dropdown">
                                                <li className="social-item">
                                                    <a
                                                        href="https://www.facebook.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li className="social-item">
                                                    <a
                                                        href="https://twitter.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li className="social-item">
                                                    <a
                                                        href="https://www.linkedin.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div className="category-box">
                                        <div className="item-category">
                                            <a href="agent-lists1.html">07 Listings</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-content">
                                    <div className="item-title">
                                        <h3>
                                            <a href="agent-lists1.html">Polly Matzinger</a>
                                        </h3>
                                        <h4 className="item-subtitle">
                                            <a href="agency-lists1.html">Sweet Home</a>
                                        </h4>
                                    </div>
                                    <div className="item-contact">
                                        <div className="item-icon">
                                            <i className="fas fa-phone-alt"></i>
                                        </div>
                                        <div className="item-phn-no">Call: +123 699 7700</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div
                                className="team-box1 wow fadeInUp"
                                data-wow-delay=".2s"
                                style={{
                                    visibility: "visible",
                                    animationDelay: "0.2s",
                                    animationName: "fadeInUp",
                                }}
                            >
                                <div className="item-img">
                                    <a href="agent-lists1.html">
                                        <img
                                            src="https://radiustheme.com/demo/html/homlisti/img/team/team18.png"
                                            alt="team"
                                            width="475"
                                            height="511"
                                        />
                                    </a>
                                    <ul className="team-social-1">
                                        <li className="social-item">
                                            <a
                                                href="https://radiustheme.com/"
                                                target="_blank"
                                                className="social-hover-icon social-link"
                                            >
                                                <i className="fas fa-share-alt"></i>
                                            </a>
                                            <ul className="team-social-dropdown">
                                                <li className="social-item">
                                                    <a
                                                        href="https://www.facebook.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li className="social-item">
                                                    <a
                                                        href="https://twitter.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li className="social-item">
                                                    <a
                                                        href="https://www.linkedin.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div className="category-box">
                                        <div className="item-category">
                                            <a href="agent-lists1.html">11 Listings</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-content">
                                    <div className="item-title">
                                        <h3>
                                            <a href="agent-lists1.html">Patty Watson</a>
                                        </h3>
                                        <h4 className="item-subtitle">
                                            <a href="agency-lists1.html">Eco Builders</a>
                                        </h4>
                                    </div>
                                    <div className="item-contact">
                                        <div className="item-icon">
                                            <i className="fas fa-phone-alt"></i>
                                        </div>
                                        <div className="item-phn-no">Call: +123 699 7700</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div
                                className="team-box1 wow fadeInUp"
                                data-wow-delay=".2s"
                                style={{
                                    visibility: "visible",
                                    animationDelay: "0.2s",
                                    animationName: "fadeInUp",
                                }}
                            >
                                <div className="item-img">
                                    <a href="agent-lists1.html">
                                        <img
                                            src="https://radiustheme.com/demo/html/homlisti/img/team/team19.png"
                                            alt="team"
                                            width="475"
                                            height="511"
                                        />
                                    </a>
                                    <ul className="team-social-1">
                                        <li className="social-item">
                                            <a
                                                href="https://radiustheme.com/"
                                                target="_blank"
                                                className="social-hover-icon social-link"
                                            >
                                                <i className="fas fa-share-alt"></i>
                                            </a>
                                            <ul className="team-social-dropdown">
                                                <li className="social-item">
                                                    <a
                                                        href="https://www.facebook.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li className="social-item">
                                                    <a
                                                        href="https://twitter.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li className="social-item">
                                                    <a
                                                        href="https://www.linkedin.com/"
                                                        target="_blank"
                                                        className="social-link"
                                                    >
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div className="category-box">
                                        <div className="item-category">
                                            <a href="agent-lists1.html">06 Listings</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="item-content">
                                    <div className="item-title">
                                        <h3>
                                            <a href="agent-lists1.html">Sarah Boysen</a>
                                        </h3>
                                        <h4 className="item-subtitle">
                                            <a href="agency-lists1.html">Mark Street</a>
                                        </h4>
                                    </div>
                                    <div className="item-contact">
                                        <div className="item-icon">
                                            <i className="fas fa-phone-alt"></i>
                                        </div>
                                        <div className="item-phn-no">Call: +123 699 7700</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="action-wrap1 wow zoomIn"
                data-wow-delay=".2s"
                style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div
                                className="action-box1"
                                data-bg-image="https://radiustheme.com/demo/html/homlisti/img/figure/action1.jpg"
                                style={{
                                    backgroundImage:
                                        'url("https://radiustheme.com/demo/html/homlisti/img/figure/action1.jpg")',
                                }}
                            >
                                <div className="action-layout">
                                    <div className="item-title">
                                        <div className="item-icon">
                                            <i className="fas fa-users"></i>
                                        </div>
                                        <div className="item-head">
                                            <h3>Become an Agent</h3>
                                            <p>Agent hen an unknown printer took a galley scramble</p>
                                        </div>
                                    </div>
                                    <div className="call-button">
                                        <a href="agency-lists1.html" className="call-btn">
                                            Join Now
                                        </a>
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

export default AboutUs;
