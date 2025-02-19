import React from "react";

const OurServices = () => {
    return (
        <section className="about-wrap1 motion-effects-wrap">
            {/* Background Shape */}
            <div className="shape-img1">
                <img
                    src="https://radiustheme.com/demo/html/homlisti/img/svg/video-bg-2.svg"
                    alt="Background Shape"
                    width="455"
                    height="516"
                    className="img-fluid"
                />
            </div>

            <div className="container">
                <div className="row align-items-center">
                    {/* Left Section: Image & Video */}
                    <div className="col-lg-5">
                        <div className="about-box1 wow fadeInLeft">
                            {/* Motion Effects */}
                            <div className="motion-effects">
                                <div className="motion-effects1">
                                    <img
                                        src="https://radiustheme.com/demo/html/homlisti/img/figure/shape7.png"
                                        alt="Shape 1"
                                        width="95"
                                        height="87"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="motion-effects2">
                                    <img
                                        src="https://radiustheme.com/demo/html/homlisti/img/figure/shape8.png"
                                        alt="Shape 2"
                                        width="90"
                                        height="46"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>

                            {/* Image */}
                            <div className="item-img">
                                <a href="single-listing1.html">
                                    <img
                                        src="https://radiustheme.com/demo/html/homlisti/img/blog/about1.jpg"
                                        alt="About Us"
                                        width="626"
                                        height="485"
                                        className="img-fluid w-100"
                                    />
                                </a>
                            </div>

                            {/* Play Button */}
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

                    {/* Right Section: Text & Features */}
                    <div className="col-lg-7">
                        <div className="about-box2 wow fadeInRight">
                            {/* Title */}
                            <div className="item-heading-left mb-4">
                                <span className="section-subtitle">
                                    Why Choose Our Properties
                                </span>
                                <h2 className="section-title">
                                    The Experts in Local and International Property
                                </h2>
                            </div>

                            {/* Description */}
                            <p className="mb-4">
                                An agent took a galley of type and scrambled it to make a
                                type specimen book. It has survived not only five centuries
                                but also the leap into electronic.
                            </p>

                            {/* Features */}
                            <div className="row">
                                {[
                                    "Verified Property",
                                    "Satisfied People",
                                    "24/7 Support",
                                    "Best Price Guarantee",
                                    "Trusted Agents",
                                    "Easy Documentation",
                                ].map((feature, index) => (
                                    <div className="col-6 col-md-4 mb-3" key={index}>
                                        <div className="about-svg-shape text-center">
                                            <img
                                                src="https://radiustheme.com/demo/html/homlisti/img/figure/shape28.svg"
                                                alt="Feature Icon"
                                                width="50"
                                                height="50"
                                                className="img-fluid"
                                            />
                                            <p className="mt-2">{feature}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurServices;
