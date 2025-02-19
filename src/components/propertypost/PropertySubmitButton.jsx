

const PropertySubmitButton = ({ title, backClick }) => {
    return (
        <div className="card-footer text-right">
            {backClick != undefined && <button type="button" onClick={backClick} className="btn btn-primary mr-4">Back</button>}
            <button type="submit" className="btn btn-primary">{title}</button>
        </div>
    )
}

export default PropertySubmitButton