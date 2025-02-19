


const PropertyListingHeader = ({ title, path, isfilterEnable }) => {
    return (<div className="card">
        <div className="row align-items-center ">
            <div className="col-auto">
                <div className="avatar avatar-lg rounded d-block" ></div>
            </div>
            <div className="col">
                <div className="h3 m-0 font-weight-normal"> {title}</div>
            </div>
        </div>

    </div>)
}
export default PropertyListingHeader