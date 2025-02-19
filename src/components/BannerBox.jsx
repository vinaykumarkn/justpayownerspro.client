import { Link, useNavigate } from 'react-router-dom';

const BannerBox = function () {
    const navigate = useNavigate();
    const handleNavClick = (e, path) => {
        e.preventDefault();
        navigate(path);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <section
                className="banner-collection1 motion-effects-wrap"
                data-wow-delay=".2s"
                style={{ minHeight: "252px", display: "flex", alignItems: "center" }} // Maintain the original height
            >
                <div className="shape-img1">
                    <img
                        src="/img/svg/video-bg-2.svg"
                        alt="figure"
                        height="149"
                        width="230"
                    />
                </div>
                <div className="shape-img2">
                    <img
                        src="/img/svg/video-bg-2.svg"
                        alt="figure"
                        height="149"
                        width="230"
                    />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 col-md-7">
                            <div className="banner-box1">
                                <div className="item-content">
                                    <h2 className="heading-title">
                                        Become a JustPayOwners partner
                                    </h2>
                                    <p>
                                        We only conduct surveys and post real estate advertising with clients throughout Karnataka.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5 d-flex justify-content-between">
                            <div className="banner-button mb-3">
                                <Link to="/iConnect" className="banner-btn" onClick={(e) => handleNavClick(e, "/iConnect")}>
                                    More Details
                                </Link>
                            </div>
                            <div className="banner-button">
                                <Link to="/contact-us" className="banner-btn" onClick={(e) => handleNavClick(e, "/contact-us")}>
                                    Contact us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BannerBox;
