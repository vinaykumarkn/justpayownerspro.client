
import jsonCount from '../mockdata/totalcount.json'
import React, { useEffect } from 'react';
const WhatWeDoDashboard = () => {

    useEffect(() => {
        console.log(jsonCount)
        console.log('WhatWeDoDashboard component rendered');
      }, []);
    return (
        <div className="widget widget-info-box">
            <h3 className="widget-subtitle">Agency Information</h3>
            <div className="item-contact-2">
                <div className="item-phn-no"><i className="fas fa-phone-alt"></i>Call: <span>+123 699 7700</span></div>
                <div className="item-icon"><i className="far fa-envelope"></i>E-mail : <span>andren@gmail.com</span></div>
                <div className="item-icon"><i className="fas fa-map-marker-alt"></i>Location : <span>New York City</span></div>
                <div className="item-icon"><i className="fas fa-globe-asia"></i>Website : <span>www.radiustheme.com</span></div>
                <div className="item-icon"><i className="far fa-clock"></i>Time : <span>8:00AM - 16:00PM</span></div>
                <div className="item-icon"><i className="far fa-clock"></i>Time : <span>8:00AM - 16:00PM</span></div>
                <div className="item-icon"><i className="far fa-clock"></i>Time : <span>8:00AM - 16:00PM</span></div>
                <div className="item-icon"><i className="far fa-clock"></i>Time : <span>8:00AM - 16:00PM</span></div>
                <div className="item-icon"><i className="fas fa-share-alt"></i>Share :
                    <div className="rt-social-item">
                        <ul className="social-item">
                            <li><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="https://twitter.com/"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="https://vimeo.com/"><i className="fab fa-vimeo-v"></i></a></li>
                            <li><a href="https://web.whatsapp.com/"><i className="fab fa-whatsapp"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WhatWeDoDashboard


// Why Post through us?