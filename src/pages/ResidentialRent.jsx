
import { PropertyPostingTabs, SectionTitle, PropertySubHeader, PropertyDetails, PropertyRentalDetails, PropertyLocalityDetails, PropertyAmenitiesDetails, PropertyGalleryUpload, PropertyAdditionalInformation, PropertyScheduleDetails, PropertyResaleDetails } from '../components'
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import '../../src/assets/css/residentialRent.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropertyControl from '../common/property/propertyControl';
import { setPropertyCatalog } from '../redux/property/propertyCatalog';
import fetchAdvartiseData from '../common/property/getPropertyAdvartiseData';


function ResidentialRent(props) {
    const items = [
        {
            Title: "Property Information",icon:"/svgs/skyscrapers-svgrepo-com.svg", eventKey: "vertical-tab-property-details", isDisabled: false, urlPath: "property", justpayFr: "pyp_property"
        },
        {
            Title: "Location Information", icon:"/svgs/place-marker-svgrepo-com.svg", eventKey: "vertical-tab-locality-details", isDisabled: false, urlPath: "location", justpayFr: "pyp_location"
        },
        {
            Title: "Rental Information", icon:"/svgs/rupee-sign-svgrepo-com.svg", eventKey: "vertical-tab-rental-details", isDisabled: false, urlPath: "rental", justpayFr: "pyp_rental"
        },
        {
            Title: "Amenities Information", icon:"/src/assets/images/demo-real-estate-icon-home.svg", eventKey: "vertical-tab-amenities", isDisabled: false, urlPath: "amenities", justpayFr: "pyp_amenities"
        },
        {
            Title: "Gallery & Photo", icon:"/svgs/gallery-icon.svg", eventKey: "vertical-tab-gallery", isDisabled: false, urlPath: "gallery", justpayFr: "pyp_gallery"
        },
        {
            Title: "Schedule Information", icon:"/svgs/info-icon.svg", eventKey: "vertical-tab-schedule-info", isDisabled: false, urlPath: "schedule", justpayFr: "pyp_schedule"
        }
    ];

    const [sideNavTabs, setSideNavTabs] = useState(items);
    const { tabtitle } = useParams();
    const params = useParams();
    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth);
    const currentActiveTab = sideNavTabs.find(item => item.urlPath == tabtitle);
    const [advertiseData, setAdvertiseData] = useState([]);

    useEffect(() => {
        fetchAdvartiseData(params.guid, userId).then((data) => {
            setAdvertiseData(data);
        });
    }, []);

    useEffect(() => {
        const propertyCatalog = PropertyControl().then((res) => {
            dispatch(setPropertyCatalog(res));
            return res;
        });
    }, []);


    useEffect(() => {
        if (advertiseData?.data == undefined) return;
        const propertyData = JSON.parse(advertiseData.data.propertyObject);
        console.log(propertyData);
        let tempSideNavTabs = [...sideNavTabs];
        if (propertyData.property_details) {
            tempSideNavTabs[0].isDisabled = false;
        }
        if (propertyData.LocalityDetails) {
            tempSideNavTabs[1].isDisabled = false;
        }
        if (propertyData.RentalDetails) {
            tempSideNavTabs[2].isDisabled = false;
        }
        if (propertyData.AmenitiesDetails) {
            tempSideNavTabs[3].isDisabled = false;
        }
        if (propertyData.GalleryDetails) {
            tempSideNavTabs[4].isDisabled = false;
        }
        if (propertyData.ScheduleInfo) {
            tempSideNavTabs[5].isDisabled = false;
        }
        setSideNavTabs(tempSideNavTabs);
    }, [advertiseData]);

    return (

        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12">
                                
                                
                                <div id="residential-rent" className="my-1 my-md-1">
                                   
                                        {/* <!-- Page header -->*/}
                                        <div className="col-12">
                                            <SectionTitle title="Residential Rent" path="" isfilterEnable={false} />
                                        </div>
                                        {/*   <!-- Page body -->*/}
                                        <div className="card">
                                            <div className="row g-0">
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="vertical-tab-property-details" activeKey={currentActiveTab.eventKey}>
                                                    <Row className='m-0'>
                                                        <PropertyPostingTabs tabs={sideNavTabs} id={"tab-section-left"} isSale={false} isCommercial={false} />
                                                        <div id="tab-section-right" className="col-12 col-md-10 d-flex flex-column">
                                                            <Tab.Content>
                                                                <Tab.Pane eventKey="vertical-tab-property-details">
                                                                    <PropertySubHeader Tilte="Property Details" />
                                                                    <PropertyDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={false} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-locality-details">
                                                                    <PropertySubHeader Tilte="Locality Details" />
                                                                    <PropertyLocalityDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={false} isCommercial={false} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-rental-details">
                                                                    <PropertySubHeader Tilte="Rental Details" />
                                                                    <PropertyRentalDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={false} isCommercial={false} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-amenities">
                                                                    <PropertySubHeader Tilte="Amenities" />
                                                                    <PropertyAmenitiesDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={false} isCommercial={false} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-gallery">
                                                                    <PropertySubHeader Tilte="Gallery" />
                                                                    <PropertyGalleryUpload tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={false} isCommercial={false} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-schedule-info">
                                                                    <PropertySubHeader Tilte="Schedule" />
                                                                    <PropertyScheduleDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={false} isCommercial={false} />
                                                                </Tab.Pane>
                                                            </Tab.Content>
                                                        </div>
                                                    </Row>
                                                </Tab.Container>
                                            </div>
                                        </div>
                                    
                                </div>   
                              

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        




    );
}

export default ResidentialRent;


