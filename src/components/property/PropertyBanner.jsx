import React, { useState, useEffect } from "react";

import { useSelector } from 'react-redux';
import { useImageViewer } from 'react-image-viewer-hook'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
/*import  'jquery/dist/jquery';*/

import $ from 'jquery';


/*import 'jquery-zoom';*/


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { useNavigate } from 'react-router-dom'

const IMAGES = [
    "https://images.pexels.com/photos/374631/pexels-photo-374631.jpeg",
    "https://images.pexels.com/photos/416682/pexels-photo-416682.jpeg",
    "https://images.pexels.com/photos/545580/pexels-photo-545580.jpeg"
];

const PropertyBanner = ({ property }) => {    

    const { getOnClick, ImageViewer } = useImageViewer()

    console.log("PropertyBanner- Render")

    const fallbackImageURL = 'http://justpayownersimages.runasp.net//justpayowners/abf5d9d1-e519-4a32-9748-9d79f0e0b4b1/magic17.jpg'; // Replace with your fallback image URL
    const fallbackImageURL1 = 'https://via.placeholder.com/150';
    const fallbackImageURL2 = 'https://cdn-imgix.headout.com/tour/652/TOUR-IMAGE/cd0fa708-27c2-4145-9fcf-14e84d910456-517-new-york-phantom-of-the-opera-00.jpg';
    const objPhoto = [
        {
            src: fallbackImageURL,
            width: 1600,
            height: 900,
        },
        {
            src: fallbackImageURL1,
            width: 1600,
            height: 900,
        },
        {
            src: fallbackImageURL2,
            width: 1600,
            height: 900,
        },

    ];
    const [photos, setPhotos] = useState(objPhoto);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);



    const URL = window.location.pathname;
    const parts = URL.split('/');
    const PropertyId = parts[parts.length - 1];

    console.log("PropertyId - ", PropertyId)

    useEffect(() => {


        const getPropertyData = JSON.parse(property?.propertyObject || property?.PropertyObject) 

        const getgalleryData = getPropertyData?.GalleryDetails;
        if (getgalleryData != null && getgalleryData.length > 0) {
            objPhoto.length = 0;
            for (let i = 0; i < 3; i++) {
                const newPhoto = {
                    src: getgalleryData[i],
                    width: 4,
                    height: 3
                };
                objPhoto.push(newPhoto);
            }
            setPhotos(objPhoto);
        }
    }, []);

  
    const handleSwiperInit = () => {
       /* $('.zoom-image-hover').zoom();*/
    };

    function BannerSwipper() {
        console.log(JSON.stringify(property))
        return (
            <>
                <div className="featured-thumb-slider-area wow fadeInUp team-box1" data-wow-delay=".4s" id="swiper-container">

                    <div className="feature-box3 swiper-container">
                        <div className="swiper-wrapper">
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                                onAfterInit={handleSwiperInit}
          
                            >
                                {
                                    JSON.parse(property?.propertyObject || property?.PropertyObject)?.GalleryDetails && JSON.parse(property?.propertyObject || property?.PropertyObject)?.GalleryDetails.map((listing, index) => (
                                        <SwiperSlide key={index }>
                                            <div className="feature-img1 zoom-image-hover">
                                                <img
                                                    src={listing}
                                                    alt="feature"
                                                    width="798"
                                                    height="420"
                                                />                                              
                                            </div>
                                        </SwiperSlide>

                                    ))
                                }
                            </Swiper>

                        </div>
                    </div>

                    <div className="featured-thum-slider2 swiper-container">
                        <div className="swiper-wrapper">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={15}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {
                                    JSON.parse(property?.propertyObject || property?.PropertyObject)?.GalleryDetails && JSON.parse(property?.propertyObject || property?.PropertyObject)?.GalleryDetails.map((listing, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="item-img">
                                                <img
                                                    src={listing}
                                                    alt="feature"
                                                    width="154"
                                                    height="100"
                                                />                                               
                                            </div>
                                        </SwiperSlide>

                                    ))
                                }
                                <SwiperSlide>                                    
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    function BannerProperties() {
        console.log(property)
        return (<div
            className="featured-thumb-slider-area wow fadeInUp team-box1"
            data-wow-delay=".4s"
        >
            <div className="feature-box3 swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="feature-img1 zoom-image-hover">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="798"
                                height="420"
                            />
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="feature-img1 zoom-image-hover">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="798"
                                height="420"
                            />
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="feature-img1 zoom-image-hover">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="798"
                                height="420"
                            />
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="feature-img1 zoom-image-hover">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="798"
                                height="420"
                            />
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="feature-img1 zoom-image-hover">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="798"
                                height="420"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="featured-thum-slider2 swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="item-img">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="154"
                                height="100"
                            />
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="item-img">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="154"
                                height="100"
                            />
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="item-img">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="154"
                                height="100"
                            />
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="item-img">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="154"
                                height="100"
                            />
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="item-img">
                            <img
                                src="/img/blog/product1-1.jpg"
                                alt="feature"
                                width="154"
                                height="100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    };



    function BannerPlot() {
        console.log(property)
        return (
            <>

                

                {JSON.parse(property.propertyObject)?.GalleryDetails != undefined ?
                    < div className="single-property-banner">
                        <div className="row gutters-5 team-box1" >
                            <div className="col-lg-6">
                                <div className="single-listing-box2">
                                    <div className="item-img">
                                        {renderPropertyLogo(property, 658, 420 ,1)}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row gutters-5">
                                    <div className="col-lg-6">
                                        <div className="single-listing-box3">
                                            <div className="item-img">
                                                {renderPropertyLogo(property, 295, 209 ,2)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="single-listing-box3">
                                            <div className="item-img">
                                                {renderPropertyLogo(property, 295, 209 ,3)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="single-listing-box4">
                                            <div className="item-img">
                                                {renderPropertyLogo(property, 605, 205 ,4)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    : ""
                }
            </>
        );
    };


    const renderPropertyLogo = (item, width, height) => {
        console.log(JSON.parse(item.propertyObject)?.GalleryDetails)
        return <a key={JSON.parse(item.propertyObject)?.GalleryDetails != undefined ? JSON.parse(item.propertyObject)?.GalleryDetails[0] + "?auto=compress & cs= tinysrgb& w=1200" : ""}  onClick={getOnClick(JSON.parse(item.propertyObject)?.GalleryDetails != undefined ? JSON.parse(item.propertyObject)?.GalleryDetails[0] + "?auto=compress & cs= tinysrgb& w=1200" : "")}
            href={JSON.parse(item.propertyObject)?.GalleryDetails != undefined ? JSON.parse(item.propertyObject)?.GalleryDetails[0] + "?auto=compress & cs= tinysrgb& w=1200" : ""}
           >
            <img src={JSON.parse(item.propertyObject)?.GalleryDetails != undefined ? JSON.parse(item.propertyObject)?.GalleryDetails[0] : ""} alt='widget'
            width={width}
            height={height}
        /></a>
    };

    const renderContent = () => {
        console.log(property)
        if (property?.category === 'Residential Rent' || property?.category === 'Residential Sale' || property?.category === 'Commercial Rent' || property?.category === 'Commercial Sale') {
            return BannerSwipper();
            
        } else if (property?.category === 'LandOrPlot Sale') {
            return BannerPlot();
        } else {
            return <div>no Match</div>;
        }
    };

    return (<>
        {renderContent()}

        
 
        <ImageViewer /> {/* can be rendered wherever you want - like in a portal */}
    </>
    );
};

export default PropertyBanner;
