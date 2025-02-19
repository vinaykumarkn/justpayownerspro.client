




const PropertyMap = ({ TabTitle }) => {
    return (<div className="row">
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">{TabTitle}</h3>
                    <div className="card-options">
                        <div className="stamp bg-red">L2</div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="map">
                      <div className="map-content" id="map-world-svg"></div>
                    </div>                    
                  </div>

            </div>

        </div>
        <div className="col-12"></div>
    </div>


    )
}
export default PropertyMap