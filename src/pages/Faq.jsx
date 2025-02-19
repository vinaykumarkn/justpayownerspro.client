import { FAQs } from "../components";
import { useEffect, useState, useRef } from "react";
import fetchFAQs from "../common/FAQ/getFAQs";
import { useSelector } from "react-redux";

const Faq = function () {
    console.log("Faq - Render");

    const { userId } = useSelector((state) => state.auth);
    const [FAQS, setFAQS] = useState([]);
    const hasFetchedFAQs = useRef(false); // Prevent unnecessary API calls

    useEffect(() => {
        const fetchFAQData = async () => {
            try {
                if (!hasFetchedFAQs.current) {
                    const resp = await fetchFAQs(userId);
                    console.log("FAQS - ", resp);
                    setFAQS(resp.data);
                    hasFetchedFAQs.current = true;
                }
            } catch (error) {
                console.error("Error fetching FAQS:", error);
            }
        };

        fetchFAQData();
    }, [userId]);

    return (
        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 rtcl-login-form-wrap">
                                <h4>FAQs</h4>
                                <FAQs data={FAQS} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
