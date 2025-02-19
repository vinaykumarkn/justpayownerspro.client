import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
           /* navigate("/");*/
        }, 3000); // Redirect after 5 seconds

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigate]);

    return (
        <section className="error-wrap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="error-box">
                            <div className="shape-img1">
                                <img src="/img/figure/error1.png" alt="shape" width="709" height="285" />
                            </div>
                            <h2 className="error-title">Sorry! This Page is Not Available</h2>
                            <div className="error-button">
                                <a href="/" className="item-btn">Go Back To Home Page</a>
                            </div>
                        </div>
                        <div className="error-shape-list">
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ErrorPage;
