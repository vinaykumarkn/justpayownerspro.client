
import { useEffect, useState } from 'react';
import { PropertyPostingTabs, SectionTitle, PropertySubmitButton, CommercialRentDetails, PropertySubHeader, PropertyLandDetails, PropertyLocalityDetails, PropertyAmenitiesDetails, PropertyGalleryUpload, PropertyAdditionalInformation, PropertyScheduleDetails, PropertyResaleDetails } from '../components'
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import fetchAdvartiseData from '../common/property/getPropertyAdvartiseData';
import PropertyControl from '../common/property/propertyControl';
import { setPropertyCatalog } from '../redux/property/propertyCatalog';
function CommercialSale(props) {
    const items = [
        {
            Title: "Property Information", icon:"/svgs/skyscrapers-svgrepo-com.svg", eventKey: "vertical-tab-property-details", isDisabled: false, urlPath: "property", justpayFr: "pyp_property"
        },
        {
            Title: "Location Information", icon:"/svgs/place-marker-svgrepo-com.svg", eventKey: "vertical-tab-locality-details", isDisabled: false, urlPath: "location", justpayFr: "pyp_location"
        },
        {
            Title: "Resale Information", icon:"/svgs/rupee-sign-svgrepo-com.svg", eventKey: "vertical-tab-resale-details", isDisabled: false, urlPath: "resale", justpayFr: "pyp_resale"
        },
        {
            Title: "Amenities Information", icon:"/src/assets/images/demo-real-estate-icon-home.svg", eventKey: "vertical-tab-amenities", isDisabled: false, urlPath: "amenities", justpayFr: "pyp_amenities"
        },
        {
            Title: "Gallery & Photo", icon:"/svgs/gallery-icon.svg", eventKey: "vertical-tab-gallery", isDisabled: false, urlPath: "gallery", justpayFr: "pyp_gallery"
        },
        {
            Title: "Additional Information", icon:"/svgs/info-icon.svg", eventKey: "vertical-tab-additional-info", isDisabled: false, urlPath: "additionalInfo", justpayFr: "pyp_additionalInfo"
        },
        {
            Title: "Schedule Information", icon:"/svgs/info-icon.svg", eventKey: "vertical-tab-schedule-info", isDisabled: false, urlPath: "schedule", justpayFr: "pyp_schedule"
        }
    ];

    const [sideNavTabs, setSideNavTabs] = useState(items);
    const [activeTab, setActiveTab] = useState("vertical-tab-property-details");
    const { tabtitle } = useParams();
    const params = useParams();
    const { userId } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [advertiseData, setAdvertiseData] = useState([]);
    useEffect(() => {
        const currentActiveTab = sideNavTabs.find(item => item.urlPath == tabtitle);
        setActiveTab(currentActiveTab.eventKey);
    }, [tabtitle]);

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
        //enable the tab based on advertiseData 
        if (advertiseData?.data == undefined) return;
        const propertyData = JSON.parse(advertiseData?.data?.PropertyObject);
        let tempSideNavTabs = [...sideNavTabs];
        if (propertyData.PropertyDetails) {
            tempSideNavTabs[0].isDisabled = false;
        }
        if (propertyData.LocalityDetails) {
            tempSideNavTabs[1].isDisabled = false;
        }

        if (propertyData.AmenitiesDetails) {
            tempSideNavTabs[3].isDisabled = false;
        }
        if (propertyData.ReSaleDetails) {
            tempSideNavTabs[2].isDisabled = false;
        }
        if (propertyData.GalleryDetails) {
            tempSideNavTabs[4].isDisabled = false;
        }
        if (propertyData.AdditionalInfo) {
            tempSideNavTabs[5].isDisabled = false;
        }
        if (propertyData.ScheduleInfo) {
            tempSideNavTabs[6].isDisabled = false;
        }
        setSideNavTabs(tempSideNavTabs);
    }, [advertiseData]);
    return (

        <section className="grid-wrap3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-12">
                        <div className="page-content-block">
                            <div className="col-md-12 ">
                                
                                
                                <div id="residential-rent" className="my-1 my-md-1">
                                   
                                        {/* <!-- Page header -->*/}
                                        <div className="col-12">
                                            <SectionTitle title="Commercial Sale" path="Home | Contact" />
                                        </div>
                                        {/*   <!-- Page body -->*/}
                                        <div className="card">
                                            <div className="row g-0">
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="vertical-tab-property-details" activeKey={activeTab}>
                                                    <Row>
                                                        <PropertyPostingTabs tabs={sideNavTabs} id={"tab-section-left"} isSale={true} isCommercial={true} />
                                                        <div id="tab-section-right" className="col-12 col-md-10 d-flex flex-column">
                                                            <Tab.Content>
                                                                <Tab.Pane eventKey="vertical-tab-property-details">
                                                                    <PropertySubHeader Tilte="Property Details" />
                                                                    <CommercialRentDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={true} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-locality-details">
                                                                    <PropertySubHeader Tilte="Locality Details" />
                                                                    <PropertyLocalityDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={true} isCommercial={true} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-resale-details">
                                                                    <PropertySubHeader Tilte="Resale Details" />
                                                                    <PropertyResaleDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={true} isCommercial={true} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-amenities">
                                                                    <PropertySubHeader Tilte="Amenities" />
                                                                    <PropertyAmenitiesDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={true} isCommercial={true} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-gallery">
                                                                    <PropertySubHeader Tilte="Gallery" />
                                                                    <PropertyGalleryUpload tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={true} isCommercial={true} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-additional-info">
                                                                    <PropertySubHeader Tilte="Additional Information" />
                                                                    <PropertyAdditionalInformation tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={true} isCommercial={true} islandorPlot={false}
                                                                        isResidential={false} />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="vertical-tab-schedule-info">
                                                                    <PropertySubHeader Tilte="Schedule" />
                                                                    <PropertyScheduleDetails tabItems={sideNavTabs} setSideNavTabs={setSideNavTabs} isSale={true} isCommercial={true} />
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

export default CommercialSale;
