import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import TimeAgo from 'react-timeago';

const ServiceFeedback = ({ data = [] }) => {
    const testimonials = data.slice(0, 2); // Limit to first 2 testimonials

    return (
        <section className="testimonial-wrap2">
            <div className="container">
                <div className="row align-items-center">
                    {/* Testimonials Section */}
                    <div className="col-lg-7 col-md-12">
                        <div className="testimonial-box2 wow fadeInLeft" data-wow-delay=".3s">
                            <div className="testimonial-heading">
                                <span className="section-subtitle">Customer Testimonials</span>
                                <h2 className="section-title">What Our Customers Say</h2>
                            </div>

                            {testimonials.length > 0 ? (
                                <Swiper
                                    modules={[Navigation]}
                                    navigation
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    loop
                                    className="testimonial-layout2"
                                    breakpoints={{
                                        768: { slidesPerView: 1 }, // Adjust for tablets
                                        1024: { slidesPerView: 1 } // Adjust for desktops
                                    }}
                                >
                                    {testimonials.map(({ content, createdAt, rating, fullName, response }, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="single-test">
                                                <div className="item-quotation">
                                                    <i className="fas fa-quote-left"></i>
                                                </div>
                                                <p>{content} (<TimeAgo date={createdAt} />)</p>
                                                <ul className="item-rating">
                                                    {Array.from({ length: rating }, (_, i) => (
                                                        <li key={i}><i className="fas fa-star"></i></li>
                                                    ))}
                                                </ul>
                                                <div className="item-title">
                                                    <h3>{fullName}</h3>
                                                </div>
                                                <div className="item-subtitle">
                                                    <h4>{response}</h4>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="text-center">No Testimonials Available</div>
                            )}
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="col-lg-5 col-md-12 d-flex justify-content-center">
                        <div className="testimonial-img-2 wow fadeInRight" data-wow-delay=".2s">
                            <img
                                src="https://radiustheme.com/demo/html/homlisti/img/blog/testimonial2.jpg"
                                alt="Customer Feedback"
                                className="img-fluid rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceFeedback;
