import { NavLink, Link } from "react-router-dom";

const PrivacyPolicy = () => {
    console.log("PrivacyPolicy - Render");

    const lastUpdated = "29 May, 2023";
    const policyText =
        "When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the leap into electronic typesetting.";

    return (
        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-content-block">
                            <div className="col-md-12 rtcl-login-form-wrap">
                                <h1 className="page-title">Privacy Policy</h1>
                                <div className="row flex-row-reverse flex-lg-row">
                                    <div className="about-box1 wow fadeInUp" data-wow-delay=".2s">
                                        <span className="item-subtitle">
                                            Last Updated on {lastUpdated}
                                        </span>
                                        <p>{policyText}</p>
                                    </div>
                                </div>
                                <div className="back-home">
                                    <NavLink to="/" className="item-btn">
                                        Back to Home
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
