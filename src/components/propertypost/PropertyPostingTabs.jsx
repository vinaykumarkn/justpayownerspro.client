import Nav from 'react-bootstrap/Nav';
import { generatePath, useNavigate, useParams } from 'react-router';

const PropertyPostingTabs = ({ tabs, id = "", isSale, isCommercial, islandorPlot }) => {
    const navigate = useNavigate();
    const params = useParams();

    const { tabtitle } = useParams();
    const handleClick = (item) => {
        const path = generatePath(
            islandorPlot ? "/manage/property/landorplot/sale/:guid/:tabtitle" :
                isCommercial ? (isSale ? "/manage/property/commercial/sale/:guid/:tabtitle" :
                    "/manage/property/commercial/rent/:guid/:tabtitle") :
                    isSale ? "/manage/property/residential/sale/:guid/:tabtitle" :
                        "/manage/property/residential/rent/:guid/:tabtitle",
            {
                ...params,       // <-- shallow copy in the existing param values
                tabtitle: item.urlPath, // <-- override the specific param values from state/etc
            },
        );
        navigate(path + "?" + new URLSearchParams({ justpayFr: item.justpayFr }).toString());
    }

    return (
        <div id={id} className="col-12 col-md-2 border-end">
            <div className="card-body">
                <div className="list-group list-group-transparent">
                    <Nav variant="pills" className="flex-column">
                        {tabs.map((item, index) => (
                            <Nav.Item key={index} disabled={item.isDisabled}>

                                <Nav.Link eventKey={item.eventKey} active={tabtitle == item.urlPath} disabled={item.isDisabled} onClick={(e) => handleClick(item)}>
                                    <span className='tab-icon'>
                                        <img src={item.icon} alt="" />
                                    </span>
                                    {item.Title}
                                </Nav.Link>
                            </Nav.Item>
                        ))}

                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link eventKey="vertical-tab-locality-details"  >Locality Details</Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link eventKey="vertical-tab-rental-details"  >Rental Details</Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link eventKey="vertical-tab-amenities"  >Amenities</Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link eventKey="vertical-tab-gallery"  >Gallery</Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link eventKey="vertical-tab-additional-info" >Additional Information </Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link eventKey="vertical-tab-schedule-info"> Schedule</Nav.Link>*/}
                        {/*</Nav.Item>*/}
                        {/*<Nav.Item>*/}
                        {/*    <Nav.Link eventKey="second" >Locality Details</Nav.Link>*/}
                        {/*</Nav.Item>*/}
                    </Nav>
                    {/* <a href="./settings.html" className="list-group-item list-group-item-action d-flex align-items-center active"></a>*/}
                </div>

            </div>
        </div>
    )
}

export default PropertyPostingTabs