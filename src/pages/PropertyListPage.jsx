import React, { useEffect, useRef, useState } from 'react'
import { PropertyFilter, PropertyHeader, PropertyList } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTermState } from '../redux/search/searchSlice';
import JPOapi from '../common';
import InfinitScroll from 'react-infinite-scroll-component';
import { store } from '../redux/store';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import $ from "jquery";



const PropertyListDetails = ({ Category, AdType }) => {
    const [listings, setListings] = useState([]);
    const { selectedCity } = useSelector(state => state.propertyByCity);
    const [loading, setLoading] = useState(false);
    const [filterState, setFilterState] = useState({});
    const dataFetchedRef = useRef(false);
    const scrollerRef = useRef();
    const [pagination, setPagination] = useState({
        CurrentPage: 1,
        pageSize: 4,
        TotalItemCount: 0,
        TotalPageCount: 0,
    });
    const length = 20;
    const { city, category } = useParams();

    const fetchPropertiesByStatus = async (page, isResetFilter = false) => {
        try {
            setLoading(true);

            console.log(filterState);

            console.log(isResetFilter);
            let _url = GenerateURLBasedonCategory();
            _url += `&Category=${Category}`;


            if (isResetFilter) {
                _url += `&pageNumber=${1}&pageSize=${pagination.pageSize}`;
                setPagination(prev => ({ ...prev, CurrentPage: 1 }));
            } else {
                if (Object.keys(filterState).length > 0) {
                    const params = new URLSearchParams(filterState);
                    _url += `&` + params;
                }
                _url += `&pageNumber=${pagination.CurrentPage}&pageSize=${pagination.pageSize}`;
            }
            const response = await fetch(_url);
            const responseHeader = JSON.parse(response.headers.get('X-Pagination'));
            setPagination(prev => ({ ...prev, CurrentPage: responseHeader.CurrentPage + 1, TotalItemCount: responseHeader.TotalItemCount, TotalPageCount: responseHeader.TotalPageCount }));
            const data = await response.json();
            console.log(data);
            if (data.data) {
                setListings([...listings, ...data.data]);
            } else {
                setListings([...listings, ...data]);
            }
            console.log(data);
            setListings([...listings, ...data]);
            setLoading(false);
            //setPageNumber(prev => prev + 1);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFilterChange = async (filterState) => {
        console.log(filterState);
        setFilterState(filterState);
        await filterAPICall(filterState);
    }

    const filterAPICall = async (filterState) => {
        setPagination(prev => ({ ...prev, CurrentPage: 1 }));
        console.log(pagination.CurrentPage);
        const params = new URLSearchParams(filterState);
        let _url = GenerateURLBasedonCategory();
        _url += `&Category=${Category}&` + params;
        _url += `&pageNumber=${1}&pageSize=${pagination.pageSize}`;
        console.log(_url);

        try {
            setLoading(true);
            const response = await fetch(_url);
            const data = await response.json();
            const responseHeader = JSON.parse(response.headers.get('X-Pagination'));
            setPagination(prev => ({ ...prev, CurrentPage: responseHeader.CurrentPage + 1, TotalItemCount: responseHeader.TotalItemCount, TotalPageCount: responseHeader.TotalPageCount }));
            console.log(data);
            if (data.data) {
                setListings([...data.data]);
            } else {
                setListings([...data]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchPropertiesByStatus(0);
       
    }, []);

    const handleSubmit = async (filterState, e) => {
        e.preventDefault();
        setFilterState(filterState);
        filterAPICall(filterState);
    }

    const filteredValues = () => {
        if (!filterState || typeof filterState !== 'object') {
            return []; // Return an empty array if filterState is null, undefined, or not an object
        }
        let filteredVsl =  Object.keys(filterState).map(key => ({ key, value: filterState[key] })).filter(item => item.value)
        console.log(filteredVsl);
        return filteredVsl;
    }

    const GenerateURLBasedonCategory = () => {
        let _url = "";
        switch (Category) {
            case "Residential Rent":
                _url = `${JPOapi.GetPropertyResidentialRentals.url}?cityName=${selectedCity == "All India" ? '' : selectedCity}`;
                break;
            case "Residential Sale":
                _url = `${JPOapi.GetPropertyResidentialSales.url}?cityName=${selectedCity == "All India" ? "" : selectedCity}`;
                break;
            case "Commercial Rent":
                _url = `${JPOapi.GetPropertyCommercialRentals.url}?cityName=${selectedCity == "All India" ? "" : selectedCity}`;
                break;
            case "Commercial Sale":
                _url = `${JPOapi.GetPropertyCommercialSales.url}?cityName=${selectedCity == "All India" ? "" : selectedCity}`;
                break;
            case "LandOrPlot Sale":
                _url = `${JPOapi.GetPropertyPlotSales.url}?cityName=${selectedCity == "All India" ? "" : selectedCity}`;
                break;
            case "New Project":
                let defaultfunction = JPOapi.GetPropertyResidentialSales.url;
                if (category === "residential-land-and-plot-projects") { defaultfunction = JPOapi.GetPropertyPlotSales.url }
                if (category === "commercial-office-projects") { defaultfunction = JPOapi.GetPropertyCommercialSales.url }
                _url = `${defaultfunction}?cityName=${city}`;
                break;           
            case "Location":
                _url = `${JPOapi.GetPropertyPlotSales.url}?cityName=${city}`;
                break;
            case "ALL":
                _url = `${JPOapi.GetPropertyPlotSales.url}?cityName=${selectedCity == "All India" ? "" : selectedCity}`;
                break;
            default:
                break;
        }
        return _url;
    }
    return (
        <>
            <section className="grid-wrap3">
                <div className="mx-4">
                    <div className="row gutters-40">
                        <div className="col-lg-4 widget-break-lg sidebar-widget">
                            <div className="widget widget-advanced-search">
                                <PropertyFilter
                                    handleSubmit={handleSubmit}
                                    parentFilterState={filterState}
                                    Category={Category}
                                    fetchPropertiesByStatus={fetchPropertiesByStatus}
                                    setPagination={setPagination}
                                    handleFilterChange={handleFilterChange}
                                />
                            </div>

                            <div className="widget widget-listing-box1">
                                <h3 className="widget-subtitle">Latest Listing</h3>
                                <div className="item-img">
                                    <a href="#"><img src="/img/blog/widget6.jpg" alt="widget" width="630" height="400" /></a>
                                    <div className="item-category-box1">
                                        <div className="item-category">For Rent</div>
                                    </div>
                                </div>
                                <div className="widget-content">
                                    <div className="item-category10"><a href="#">Villa</a></div>
                                    <h4 className="item-title"><a href="#">Modern Villa for House Highland  Ave Los Angeles</a></h4>
                                    <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>Downey, California</div>
                                    <div className="item-price">$11,000<span>/mo</span></div>
                                </div>
                                <div className="widget-listing">
                                    <div className="item-img">
                                        <a href="#"><img src="/img/blog/widget2.jpg" alt="widget" width="120" height="102" /></a>
                                    </div>
                                    <div className="item-content">
                                        <h5 className="item-title"><a href="#">House Highland Ave  Los Angeles</a></h5>
                                        <div className="location-area"><i className="fas fa-map-marker-alt icon"></i>California</div>
                                        <div className="item-price">$3,000<span>/mo</span></div>
                                    </div>
                                </div>


                            </div>
                            <div className="widget widget-post">
                                <div className="item-img">
                                    <img src="/img/blog/widget5.jpg" alt="widget" width="690" height="850" />
                                    <div className="circle-shape">
                                        <span className="item-shape"></span>
                                    </div>
                                </div>
                                <div className="item-content">
                                    <h4 className="item-title">Find Your  Dream House</h4>
                                    <div className="item-price">$2,999</div>
                                    <div className="post-button"><a href="#" className="item-btn">Shop Now</a></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="row justify-content-center">
                                <div className="col-lg-12 col-md-12">
                                    <div className="item-shorting-box">
                                        <div className="item-shorting-box-2">
                                            <div className="by-shorting">
                                                <div className="shorting">Sort by:</div>
                                                {/*<select className="select single-select mr-0" style={{ display: "none" }}>                                                   */}
                                                {/*    <option value="1">Posted On (Newest First)</option>*/}
                                                {/*    <option value="2">Posted On (Oldest First)</option>                                                    <*/}
                                                {/*    <option value="3">High Price</option>*/}
                                                {/*    <option value="4">Low Price</option>*/}
                                                {/*</select>*/}
                                                <div className="dropdown">
                                                    <select className="select single-select mr-0  " name="propertyType">
                                                        <option className="Posted On (Newest First)" value="">Posted On (Newest First)</option>
                                                        <option value="Posted On (Oldest First)">Posted On (Oldest First)</option>
                                                        <option value="High Price">High Price</option>
                                                        <option value="Low Price">Low Price</option>
                                                    </select>
                                                  
                                                </div>
                                                {/*<div className="nice-select select single-select mr-0" tabIndex="0">*/}
                                                {/*    <span className="current">Posted On (Newest First)</span>*/}
                                                {/*    <ul className="list">*/}
                                                {/*        <li data-value="1" className="option selected">Posted On (Newest First)</li>*/}
                                                {/*        <li data-value="2" className="option">Posted On (Oldest First)</li>*/}
                                                {/*        <li data-value="3" className="option">High Price</li>*/}
                                                {/*        <li data-value="4" className="option">Low Price</li>*/}
                                                {/*    </ul>*/}
                                                {/*</div>*/}
                                            </div>
                                            {/*<div className="grid-button">*/}
                                            {/*    <ul className="nav nav-tabs" role="tablist">*/}
                                            {/*        <li className="nav-item">*/}
                                            {/*            1 bhk ,*/}
                                            {/*        </li>*/}
                                            {/*        */}{/*<li className="nav-item">*/}
                                            {/*        */}{/*    <a className="nav-link" data-bs-toggle="tab" href="#mylisting"><i className="fas fa-th"></i></a>s*/}
                                            {/*        */}{/*    <a className="nav-link active" data-bs-toggle="tab" href="#reviews"><i className="fas fa-list-ul"></i></a>*/}
                                            {/*        */}{/*</li>*/}
                                            {/*    </ul>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className="shorting-title" id="shorting-title">
                                        {filteredValues && typeof filteredValues === 'function' && filteredValues()?.map(function (item, index) {
                                            return (
                                                <button type='button' className='closeTag' key={index}>{item.value}</button>
                                            )
                                        }
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="tab-style-1 tab-style-3">
                                <div className="tab-content" id="myTabContent">

                                    <div className="tab-pane fade show active" id="reviews" role="tabpanel">
                                        <div className='row' id='scrollableID' style={{ overflow: 'auto' }} ref={scrollerRef}>
                                            <InfinitScroll
                                                dataLength={listings.length}
                                                next={fetchPropertiesByStatus}
                                                hasMore={listings.length < pagination.TotalItemCount}
                                                loader={<h4>Loading ... </h4>}
                                            // scrollableTarget="scrollableID"
                                            >
                                                <div >
                                                    {
                                                        loading
                                                            ?
                                                            <div className="loading_container mt-40 flex items-center justify-center flex-col">
                                                                <p className='font-heading text-lg text-center text-brand-blue '>Searching...</p>
                                                            </div>
                                                            :
                                                            <>
                                                                {
                                                                    listings.length !== 0 ?
                                                                        <>
                                                                            {
                                                                                listings && listings.map((listing, index) => <article key={index} id={"article" + index}><PropertyList listing={listing} Category={Category} AdType={AdType} /></article>)
                                                                            }
                                                                        </>
                                                                        :
                                                                        <div className=" mt-40 flex items-center justify-center flex-col">
                                                                            <p className='font-heading text-lg text-center text-brand-blue '>Sorry, Listings not found</p>
                                                                        </div>
                                                                }
                                                            </>

                                                    }
                                                </div>

                                            </InfinitScroll>




                                        </div>

                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PropertyListDetails