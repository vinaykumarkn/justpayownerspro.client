
const SimilarProperties = function () {
    return (<>
        <div className="widget widget-listing-box1">
            <h3 className="widget-subtitle">Latest Listing</h3>

            {/* Main Listing */}
            <div className="item-img">
                <a href="#">
                    <img src="/img/blog/widget1.jpg" alt="widget" width="540" height="360" />
                </a>
                <div className="item-category-box1">
                    <div className="item-category">For Rent</div>
                </div>
            </div>
            <div className="widget-content">
                <div className="item-category10">
                    <a href="#">Villa</a>
                </div>
                <h4 className="item-title">
                    <a href="#">Modern Villa for House Highland Ave Los Angeles</a>
                </h4>
                <div className="location-area">
                    <i className="fas fa-map-marker-alt icon"></i>2150 S Jones Blvd, USA
                </div>
                <div className="item-price">$11,000<span>/mo</span></div>
            </div>

            {/* Additional Listings */}
            {[
                {
                    imgSrc: '/img/blog/widget2.jpg',
                    title: 'House Highland Ave Los Angeles',
                    location: 'California',
                    price: '$3,000',
                },
                {
                    imgSrc: '/img/blog/widget4.jpg',
                    title: 'House Highland Ave Los Angeles',
                    location: 'California',
                    price: '$1,900',
                }
            ].map((listing, index) => (
                <div className={`widget-listing ${index === 1 ? 'no-brd' : ''}`} key={index}>
                    <div className="item-img">
                        <a href="#">
                            <img src={listing.imgSrc} alt="widget" width="120" height="102" />
                        </a>
                    </div>
                    <div className="item-content">
                        <h5 className="item-title">
                            <a href="#">{listing.title}</a>
                        </h5>
                        <div className="location-area">
                            <i className="fas fa-map-marker-alt icon"></i>{listing.location}
                        </div>
                        <div className="item-price">{listing.price}<span>/mo</span></div>
                    </div>
                </div>
            ))}
        </div>


    </>
    );
};

export default SimilarProperties;



