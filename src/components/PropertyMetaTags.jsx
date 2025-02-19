import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';


const PropertyMetaTags = () => {

    useEffect(() => {
        // Adding meta tags manually when the component mounts
        document.title = "Bank Auction Property - Vikyath Spring Krishnarajapuram - Without Brokerage Semi-furnished 2 BHK Flat for Sale in Bank Auction Property - Vikyath Spring, Bangalore for Rs. 4,200,000 | NoBroker";

        const metaTags = [
            { name: 'google-play-app', content: 'app-id=com.nobroker.app&referrer=utm_source%3Dnobroker%26utm_medium%3DmobileWeb' },
            { name: 'apple-itunes-app', content: 'app-id=1200507100, app-argument=nobrokerapp://' },
            { name: 'theme-color', content: '#fd3752' },
            { name: 'keywords', content: 'Flat in Bank Auction Property - Vikyath Spring, Krishnarajapuram,  2 BHK flat for sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, house for sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, property for sale in Krishnarajapuram' },
            { property: 'og:title', content: 'Bank Auction Property - Vikyath Spring Krishnarajapuram - Without Brokerage Semi-furnished 2 BHK Flat for Sale in Bank Auction Property - Vikyath Spring, Bangalore for Rs. 4,200,000 | NoBroker' },
            { property: 'og:description', content: 'Get WITHOUT BROKERAGE Semi-furnished 2 BHK flat for Sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, Bangalore . Contact Owners Directly. #NoBroker' },
            { property: 'og:url', content: 'https://www.nobroker.in/property/buy/2-bhk-apartment-for-sale-in-krishnarajapuram-bangalore/8a9f8f8393779856019377a35b2703eb/detail' },
            { property: 'og:image', content: 'https://images.nobroker.in/images/8a9f8f8393779856019377a35b2703eb/8a9f8f8393779856019377a35b2703eb_19587_large.jpg' },
            { name: 'twitter:site', content: '@nobrokercom' },
            { name: 'twitter:title', content: 'Bank Auction Property - Vikyath Spring Krishnarajapuram - Without Brokerage Semi-furnished 2 BHK Flat for Sale in Bank Auction Property - Vikyath Spring, Bangalore for Rs. 4,200,000 | NoBroker' },
            { name: 'twitter:description', content: 'Get WITHOUT BROKERAGE Semi-furnished 2 BHK flat for Sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, Bangalore . Contact Owners Directly. #NoBroker' },
            { name: 'twitter:image', content: 'https://images.nobroker.in/images/8a9f8f8393779856019377a35b2703eb/8a9f8f8393779856019377a35b2703eb_19587_large.jpg' },
            { property: 'og:image:height', content: '360' },
            { property: 'og:image:width', content: '540' },
            { property: 'fb:app_id', content: '289265624583131' },
            { property: 'og:site_name', content: 'NoBroker' },
            { property: 'og:type', content: 'product' },
            { name: 'google', content: 'notranslate' },
            { name: 'google-site-verification', content: 'hLy7ta67b2CS6LQFWI3SrB22XIuKUHlAHGEi-0W0ngI' },
            { name: 'msvalidate.01', content: '81EEED055BF8993A564A4B24AF189813' },
            { name: 'p:domain_verify', content: 'e5c74d79345e920627558faecd28fae5' },
            { name: 'p:domain_verify', content: '084409cababb09e2de24f00eb4048416' },
            { name: 'google-signin-client_id', content: '239876242888-mbq11kse03n78gs2o5549clvlcv3ls24.apps.googleusercontent.com' },
            { name: 'description', content: 'Get WITHOUT BROKERAGE Semi-furnished 2 BHK flat for Sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, Bangalore . Contact Owners Directly. #NoBroker' },
            { name: 'viewport', content: 'width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=1.0' },
            { name: 'X-UA-Compatible', content: 'IE=edge,chrome=1' }
        ];

        // Loop through each meta tag and add it to the head
        metaTags.forEach(tag => {
            const metaTag = document.createElement('meta');
            Object.keys(tag).forEach(key => {
                metaTag.setAttribute(key, tag[key]);
            });
            document.head.appendChild(metaTag);
        });

        // Clean up meta tags when the component unmounts (optional)
        return () => {
            metaTags.forEach(tag => {
                const metaTag = document.querySelector(`meta[${Object.keys(tag)[0]}="${Object.values(tag)[0]}"]`);
                if (metaTag) {
                    document.head.removeChild(metaTag);
                }
            });
        };
    }, []); // Empty dependency array to run only once when the component mounts

    return (<>
        <Helmet>
            <meta charset="UTF-8" />
            <meta name="google-play-app" content="app-id=com.nobroker.app&referrer=utm_source%3Dnobroker%26utm_medium%3DmobileWeb" />
            <meta name="apple-itunes-app" content="app-id=1200507100, app-argument=nobrokerapp://" />
            <meta name="theme-color" content="#fd3752" />
            <meta name="keywords" content="Flat in Bank Auction Property - Vikyath Spring, Krishnarajapuram,  2 BHK flat for sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, house for sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, property for sale in Krishnarajapuram" />
            <meta property="og:title" content="Bank Auction Property - Vikyath Spring Krishnarajapuram - Without Brokerage Semi-furnished 2 BHK Flat for Sale in Bank Auction Property - Vikyath Spring, Bangalore for Rs. 4,200,000 | NoBroker" />
            <meta property="og:description" content="Get WITHOUT BROKERAGE Semi-furnished 2 BHK flat for Sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, Bangalore . Contact Owners Directly. #NoBroker" />
            <meta property="og:url" content="https://www.nobroker.in/property/buy/2-bhk-apartment-for-sale-in-krishnarajapuram-bangalore/8a9f8f8393779856019377a35b2703eb/detail" />
            <meta property="og:image" content="https://images.nobroker.in/images/8a9f8f8393779856019377a35b2703eb/8a9f8f8393779856019377a35b2703eb_19587_large.jpg" />
            <meta name="twitter:site" content="@nobrokercom" />
            <meta name="twitter:title" content="Bank Auction Property - Vikyath Spring Krishnarajapuram - Without Brokerage Semi-furnished 2 BHK Flat for Sale in Bank Auction Property - Vikyath Spring, Bangalore for Rs. 4,200,000 | NoBroker" />
            <meta name="twitter:description" content="Get WITHOUT BROKERAGE Semi-furnished 2 BHK flat for Sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, Bangalore . Contact Owners Directly. #NoBroker" />
            <meta name="twitter:image" content="https://images.nobroker.in/images/8a9f8f8393779856019377a35b2703eb/8a9f8f8393779856019377a35b2703eb_19587_large.jpg" />
            <meta property="og:image:height" content="360" />
            <meta property="og:image:width" content="540" />
            <meta property="fb:app_id" content="289265624583131" />
            <meta property="og:site_name" content="NoBroker" />
            <meta property="og:type" content="product" />
            <meta name="google" content="notranslate" />
            <meta name="google-site-verification" content="hLy7ta67b2CS6LQFWI3SrB22XIuKUHlAHGEi-0W0ngI" />
            <meta name="msvalidate.01" content="81EEED055BF8993A564A4B24AF189813" />
            <meta name="p:domain_verify" content="e5c74d79345e920627558faecd28fae5" />
            <meta name="p:domain_verify" content="084409cababb09e2de24f00eb4048416" />
            <meta name="google-signin-client_id" content="239876242888-mbq11kse03n78gs2o5549clvlcv3ls24.apps.googleusercontent.com" />
            <title>Bank Auction Property - Vikyath Spring Krishnarajapuram - Without Brokerage Semi-furnished 2 BHK Flat for Sale in Bank Auction Property - Vikyath Spring, Bangalore for Rs. 4,200,000 | NoBroker</title>
            <meta name="description" content="Get WITHOUT BROKERAGE Semi-furnished 2 BHK flat for Sale in Bank Auction Property - Vikyath Spring, Krishnarajapuram, Bangalore . Contact Owners Directly. #NoBroker" />
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=1.0" />
            <meta name="X-UA-Compatible" content="IE=edge,chrome=1" />
        </Helmet>
    </>
    );
};
export default PropertyMetaTags;



