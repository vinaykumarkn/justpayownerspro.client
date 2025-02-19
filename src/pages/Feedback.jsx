

import Jsonfooter from '../mockdata/footerData.json';
import { NavLink, Link } from 'react-router-dom';
const Feedback = function () {
    console.log("Feedback - Render")
    return (<>
        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="contact-box1">
                            <div className="contact-img">
                                <img src="https://radiustheme.com/demo/html/homlisti/blog/contact1.jpg" alt="contact" height="502" width="607" />
                            </div>
                            <div className="contact-content">
                                <h3 className="contact-title">Office Information</h3>
                                <div className="contact-list">
                                    <ul>
                                        <li>Homlisti Real Estate Agency</li>
                                        <li>(United Estate Of America) Co., Ltd.</li>
                                        <li>Bridge 8, Room 9201,</li>
                                        <li>#25 Jocker Goru Zhong Road,</li>
                                        <li>NYPD 200025 USA</li>
                                    </ul>
                                </div>
                                <div className="phone-box">
                                    <div className="item-lebel">Emergency Call :</div>
                                    <div className="phone-number">+86 21 6137 9292</div>
                                    <div className="item-icon"><i className="fas fa-phone-alt"></i></div>
                                </div>
                                <div className="social-box">
                                    <div className="item-lebel">Social Share :</div>
                                    <ul className="item-social">
                                        <li><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="https://twitter.com/"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="https://vimeo.com/"><i className="fab fa-vimeo-v"></i></a></li>
                                        <li><a href="https://www.pinterest.com/"><i className="fab fa-pinterest-p"></i></a></li>
                                        <li><a href="https://web.whatsapp.com/"><i className="fab fa-whatsapp"></i></a></li>
                                    </ul>
                                    <div className="item-icon"><i className="fas fa-share-alt"></i></div>
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

export default Feedback;
