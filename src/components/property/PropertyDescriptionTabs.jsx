




const PropertyDescriptionTabs = ({ TabTitle }) => {
    return (<div className="row">
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">{TabTitle}</h3>
                    <div className="card-options">
                        <div className="stamp bg-red">L2</div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-3 mx-0">
                        <div className="d-flex align-items-center">
                            <span className="stamp stamp-md bg-blue mr-3"><i className="fe fe-dollar-sign"></i></span>
                            <div>
                                <h4 className="m-0"><a href="javascript:void(0)">ID No : </a></h4>
                                <small className="text-muted">98560</small>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div className="col-12"></div>
    </div>


    )
}
export default PropertyDescriptionTabs