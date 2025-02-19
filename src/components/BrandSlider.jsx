import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const BrandSlider = () => {
    const brands = [
        { id: 1, src: "https://www.radiustheme.com/demo/html/homlisti/img/brand/brand1.svg", alt: "Brand 1" },
        { id: 2, src: "https://www.radiustheme.com/demo/html/homlisti/img/brand/brand2.svg", alt: "Brand 2" },
        { id: 3, src: "https://www.radiustheme.com/demo/html/homlisti/img/brand/brand3.svg", alt: "Brand 3" },
        { id: 4, src: "https://www.radiustheme.com/demo/html/homlisti/img/brand/brand4.svg", alt: "Brand 4" },
        { id: 5, src: "https://www.radiustheme.com/demo/html/homlisti/img/brand/brand5.svg", alt: "Brand 5" },
        { id: 6, src: "https://www.radiustheme.com/demo/html/homlisti/img/brand/brand6.svg", alt: "Brand 6" },
    ];

    return (
        <div className="brand-wrap1 brand-wrap2">
            <div className="container">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={15}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 10 }, // Mobile
                        480: { slidesPerView: 3, spaceBetween: 15 }, // Small tablets
                        768: { slidesPerView: 4, spaceBetween: 20 }, // Tablets
                        1024: { slidesPerView: 5, spaceBetween: 30 }, // Desktop
                    }}
                    className="brand-layout"
                >
                    {brands.map((brand) => (
                        <SwiperSlide key={brand.id}>
                            <div className="brand-box">
                                <div className="item-img">
                                    <a href="#">
                                        <img src={brand.src} alt={brand.alt} loading="lazy" />
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default BrandSlider;
