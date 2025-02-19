import { NavLink } from "react-router-dom";

const PlanPrices = function () {
    console.log("PlanPrices - Render");

    const pricingPlans = [
        {
            title: "BASIC",
            price: "$15",
            features: [
                "All Listing Access",
                "Location Wise Map",
                "Free / Pro Ads",
                "Custom Map Setup",
                "Apps Integrated",
                "Advanced Custom Field",
                "Pro Features",
            ],
            image: "/img/figure/shape16.svg",
        },
        {
            title: "STANDARD",
            price: "$29",
            features: [
                "All Listing Access",
                "Location Wise Map",
                "Free / Pro Ads",
                "Custom Map Setup",
                "Apps Integrated",
                "Advanced Custom Field",
                "Pro Features",
            ],
            image: "/img/figure/shape17.svg",
        },
        {
            title: "PREMIUM",
            price: "$49",
            features: [
                "All Listing Access",
                "Location Wise Map",
                "Free / Pro Ads",
                "Custom Map Setup",
                "Apps Integrated",
                "Advanced Custom Field",
                "Pro Features",
            ],
            image: "/img/figure/shape18.svg",
        },
    ];

    return (
        <section className="grid-wrap3">
            <div className="container">
                <div className="col-md-12 rtcl-login-form-wrap">
                    <div className="item-heading-center mb-20">
                        <span className="section-subtitle">Price Table</span>
                        <h2 className="section-title">Affordable Pricing Plan</h2>
                    </div>
                    <div className="row justify-content-center">
                        {pricingPlans.map((plan, index) => (
                            <div key={index} className="col-xl-4 col-lg-6 col-md-6">
                                <div className="pricing-box1 wow zoomIn" data-wow-delay=".3s">
                                    <div className="heading-title">
                                        <h3 className="item-title">{plan.title}</h3>
                                        <div className="item-price">
                                            {plan.price}<span>/ month</span>
                                        </div>
                                        <p>Shen an unknown printer took a galley of type and scrambled</p>
                                    </div>
                                    <div className="shape-img1">
                                        <img src={plan.image} alt="shape" width="56" height="64" />
                                    </div>
                                    <div className="pricing-list">
                                        <ul>
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="available">
                                                    <i className="fas fa-check-circle"></i> {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pricing-button">
                                        <NavLink to="/subscribe" className="item-btn">
                                            Get Started
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlanPrices;
