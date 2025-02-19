import { useEffect, useState } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import formatCurrency from "../../common/property/displayCurrencyFormat";
import JPOapi from "../../common";

const PropertyFilter = ({ handleSubmit, Category, fetchPropertiesByStatus, setPagination, handleFilterChange, parentFilterState }) => {
    const initialFilterState = Category == "Residential Rent" ? ({
        type: "",
        propertytype: "",
        propertyage: "",
        Availability: "",
        rent: "0-60000",
        preferredtenants: "",
        showOnlyLeaseProperty: false,
        bathroom: "",
        furnishing: "",
        parking: "",
    }) : (
        Category == "Residential Sale" ? ({
            type: "",
            rent: "0-60000",
            propertytype: "",
            PropertyStatus: "",
            showNewBuilderProjects: false,
            furnishing: "",
            parking: "",
        }) : (
            Category == "Commercial Rent" ? ({
                propertytype: "",
                rent: "0-600000",
                BuiltUpArea: "0-60000",
                BuildingType: "",
                furnishing: "",
                parking: "",
            }) : (
                Category == "Commercial Sale" ? ({
                    propertytype: "",
                    rent: "0-6000000",
                    BuiltUpArea: "0-60000",
                    BuildingType: "",
                    furnishing: "",
                    parking: "",
                }) : (
                    Category == "LandOrPlot Sale" ? ({
                        rent: "0-6000000",
                        plotArea: "0-60000",
                        KhataCertificate: "",
                        isRERAApproved: false,
                        isVerifiedDocuments: "",
                        showOnlyWithPhotos: false,
                        showOnlyHavingBoundaryWall: false,
                    }) : null
                )
            )
        ));

    const [formState, setFormState] = useState(initialFilterState);
    const [propertyFilterCatalog, setPropertyFilterCatalog] = useState([]);
    let dataFetched = false;

    const fetchPropertyCatalog = async () => {
        try {
            const response = await fetch(JPOapi.propertyCatalog.url);
            const data = await response.json();
            console.log(data);
            setPropertyFilterCatalog(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (dataFetched === true) return;
        dataFetched = true;
        fetchPropertyCatalog();

        console.log("parentFilterState -", parentFilterState);
    }, []);

    useEffect(() => {
        console.log("handle filter change");
        handleFilterChange(formState);
    }, [formState]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    }

    const handleMultiSelect = (e) => {
        const { name, value } = e.target;
        //if check box is checked, then add or else remove
        if (formState[name]?.includes(value)) {
            const updatedValue = formState[name].split(",").filter(item => item !== value).join(",");
            setFormState(prev => ({ ...prev, [name]: updatedValue }));
            return;
        }

        setFormState(prev => ({ ...prev, [name]: prev[name] ? prev[name] + "," + value : value }));
    }

    const handleCheckBox = (e) => {
        const { name, checked } = e.target;
        // should check if checked or not and update the state
        setFormState({ ...formState, [name]: checked });

    }

    const handleRangeDrage = (value, stateName) => {
        console.log(value);
        setFormState({ ...formState, [stateName]: value.join("-") });
    }

    const GetPriceFromRange = () => {
        const range = formState.rent.split("-");
        return `₹ ${range[0]} to ₹ ${range[1]}`
    }

    const handleClearFilter = async () => {
        console.log("Clear Filter");
        setFormState(initialFilterState);
        await fetchPropertiesByStatus(0, true);
    }


    return (<form onSubmit={(e) => handleSubmit(formState, e)}> <>
        {(Category && Category === "Residential Rent" || Category === "Residential Sale") &&
            <>
                <div className="mb-3">
                    <label className="item-bedrooms">BHK Type </label>
                    <div className="form-check-box">
                        {
                            propertyFilterCatalog?.BHKType?.map((item, index) => (
                                <label className="form-check form-check-inline" key={index}>
                                    <input className="form-check-input" type="checkbox" name="type" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.type.indexOf(item) > -1} />
                                    <span className="form-check-label">{item}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label className="item-bedrooms">Property Type</label>
                    <div className="form-check-box">
                        {
                            propertyFilterCatalog?.ApartmentType?.map((item, index) => (
                                <label className="form-check form-check-inline" key={index}>
                                    <input className="form-check-input" type="checkbox" name="propertytype" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.propertytype.indexOf(item) > -1} />
                                    <span className="form-check-label">{item}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label className="item-bedrooms">Range input ({formatCurrency(formState.rent.split("-")[0])} to {formatCurrency(formState.rent.split("-")[1])}) </label>
                    <div className="form-check-box">
                        <RangeSlider
                            step={1000}
                            onInput={(value) => handleRangeDrage(value, "rent")}
                            value={formState.rent.split("-")}
                            min={0}
                            max={100000}
                        />
                    </div>
                </div>
                {(Category && Category === "Residential Rent") &&
                    <>
                        <div className="mb-3">
                            <label className="item-bedrooms">Property Age</label>
                            <div className="form-check-box">
                                {
                                    propertyFilterCatalog?.PropertyAge?.map((item, index) => (
                                        <label className="form-check form-check-inline" key={index}>
                                            <input className="form-check-input" type="checkbox" name="propertyage" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.propertyage.indexOf(item) > -1} />
                                            <span className="form-check-label">{item}</span>
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="item-bedrooms">Availability</label>
                            <div className="form-check-box">
                                {
                                    propertyFilterCatalog?.Availability?.map((item, index) => (
                                        <label className="form-check form-check-inline" key={index}>
                                            <input className="form-check-input" type="radio" name="Availability" value={item} onChange={(e) => handleChange(e)} checked={formState?.Availability == item} />
                                            <span className="form-check-label">{item}</span>
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="item-bedrooms">Preferred Tenants </label>
                            <div className="form-check-box">
                                {
                                    propertyFilterCatalog?.PreferredTenants?.map((item, index) => (
                                        <label className="form-check form-check-inline" key={index}>
                                            <input className="form-check-input" type="checkbox" name="preferredtenants" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.preferredtenants.indexOf(item) > -1} />
                                            <span className="form-check-label">{item}</span>
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-check-box">
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="showOnlyLeaseProperty" value={true} onChange={(e) => handleCheckBox(e)} checked={formState?.showOnlyLeaseProperty == true} />
                                    <span className="form-check-label">Show Only Lease Properties</span>
                                </label>
                            </div>
                        </div>
                    </>

                }
                {(Category && Category === "Residential Sale") &&
                    <>
                        <div className="mb-3">
                            <label className="form-label">Property Status</label>
                            <div className="form-control-plaintext">
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="PropertyStatus" value={"Under Construction"} onChange={(e) => handleMultiSelect(e)} checked={formState?.PropertyStatus.indexOf("Under Construction") > -1} />
                                    <span className="form-check-label">Under Construction</span>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="PropertyStatus" value={"Ready to Move"} onChange={(e) => handleMultiSelect(e)} checked={formState?.PropertyStatus.indexOf("Ready to Move") > -1} />
                                    <span className="form-check-label">Ready to Move</span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Builder Projects </label>
                            <div className="form-control-plaintext">
                                <label className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="showNewBuilderProjects" value={true} onChange={(e) => handleCheckBox(e)} checked={formState?.showNewBuilderProjects == true} />
                                    <span className="form-check-label">New Builder Projects</span>
                                </label>
                            </div>
                        </div>
                    </>
                }
            </>
        }

        {(Category && Category === "Residential Rent" || Category === "Residential Sale" || Category === "Commercial Rent" || Category === "Commercial Sale") &&
            <>
                {(Category && Category === "Commercial Rent" || Category === "Commercial Sale") &&
                    <>
                        <div className="mb-3">
                            <label className="form-label">Property Type</label>
                            <div className="form-control-plaintext">
                                {
                                    propertyFilterCatalog?.PropertyType?.map((item, index) => (item !== "Select" &&
                                        <label className="form-check form-check-inline" key={index}>
                                            <input className="form-check-input" type="checkbox" name="propertytype" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.propertytype.indexOf(item) > -1} />
                                            <span className="form-check-label">{item}</span>
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rent Range: ({formatCurrency(formState.rent.split("-")[0])} to {formatCurrency(formState.rent.split("-")[1])}) </label>
                            <div className="form-control-plaintext">
                                <RangeSlider
                                    step={100000}
                                    onInput={(value) => handleRangeDrage(value, "rent")}
                                    value={formState.rent.split("-")}
                                    min={0}
                                    max={10000000}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Built Up Area(sq. ft.): {formState.BuiltUpArea.split("-")[0]} sq. ft. to {formState.BuiltUpArea.split("-")[1]} sq. ft. </label>
                            <div className="form-control-plaintext">
                                <RangeSlider
                                    step={1000}
                                    onInput={(value) => handleRangeDrage(value, "BuiltUpArea")}
                                    value={formState.BuiltUpArea.split("-")}
                                    min={0}
                                    max={100000}
                                />
                                {/* <input type="range" className="form-range mb-2" value="40" min="0" max="100" step="10" /> */}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Building Type</label>
                            <div className="form-control-plaintext">
                                {
                                    propertyFilterCatalog?.BuildingType?.map((item, index) => (item !== "Select" &&
                                        <label className="form-check form-check-inline" key={index}>
                                            <input className="form-check-input" type="checkbox" name="BuildingType" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.BuildingType.indexOf(item) > -1} />
                                            <span className="form-check-label">{item}</span>
                                        </label>
                                    ))
                                }
                            </div>
                        </div></>
                }


                {(Category && Category === "Residential Rent") &&
                    <div className="mb-3">
                        <label className="form-label">Bathroom</label>
                        <div className="form-control-plaintext">
                            {
                                propertyFilterCatalog?.Bathroom?.map((item, index) => (
                                    <label className="form-check form-check-inline" key={index}>
                                        <input className="form-check-input" type="checkbox" name="bathroom" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.bathroom.indexOf(item) > -1} />
                                        <span className="form-check-label">{item}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                }
                <div className="mb-3">
                    <label className="form-label">Furnishing</label>
                    <div className="form-control-plaintext">
                        {
                            propertyFilterCatalog?.Furnishing?.map((item, index) => (
                                <label className="form-check form-check-inline" key={index}>
                                    <input className="form-check-input" type="checkbox" name="furnishing" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.furnishing.indexOf(item) > -1} />
                                    <span className="form-check-label">{item}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Parking</label>
                    {(Category && Category === "Residential Rent" || Category === "Residential Sale") &&
                        <div className="form-control-plaintext">
                            {
                                propertyFilterCatalog?.Parking?.map((item, index) => (
                                    <label className="form-check form-check-inline" key={index}>
                                        <input className="form-check-input" type="checkbox" name="parking" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.parking.indexOf(item) > -1} />
                                        <span className="form-check-label">{item}</span>
                                    </label>
                                ))
                            }
                        </div>
                    }
                    {(Category && Category === "Commercial Rent" || Category === "Commercial Sale") &&
                        <div className="form-control-plaintext">
                            {
                                propertyFilterCatalog?.CommercialParking?.map((item, index) => (item !== "Select" &&
                                    <label className="form-check form-check-inline" key={index}>
                                        <input className="form-check-input" type="checkbox" name="parking" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.parking.indexOf(item) > -1} />
                                        <span className="form-check-label">{item}</span>
                                    </label>
                                ))
                            }
                        </div>
                    }
                </div>
            </>
        }

        {(Category && Category === "LandOrPlot Sale") &&
            <>
                <div className="mb-3">
                    <label className="form-label">Price Range: ({formatCurrency(formState.rent.split("-")[0])} to {formatCurrency(formState.rent.split("-")[1])}) </label>
                    <div className="form-control-plaintext">
                        <RangeSlider
                            step={1000000}
                            onInput={(value) => handleRangeDrage(value, "rent")}
                            value={formState.rent.split("-")}
                            min={0}
                            max={100000000}
                        />
                        {/* <input type="range" className="form-range mb-2" value="40" min="0" max="100" step="10" /> */}
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Plot Area (sq. ft.): {formState.plotArea.split("-")[0]} to {formState.plotArea.split("-")[1]} sq.ft.  </label>
                    <div className="form-control-plaintext">
                        <RangeSlider
                            step={1000}
                            onInput={(value) => handleRangeDrage(value, "plotArea")}
                            value={formState.plotArea.split("-")}
                            min={0}
                            max={100000}
                        />
                        {/* <input type="range" className="form-range mb-2" value="40" min="0" max="100" step="10" /> */}
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Khata Certificate</label>
                    <div className="form-control-plaintext">
                        {
                            propertyFilterCatalog?.KhataCertificate?.map((item, index) => (
                                <label className="form-check form-check-inline" key={index}>
                                    <input className="form-check-input" type="checkbox" name="KhataCertificate" value={item} onChange={(e) => handleMultiSelect(e)} checked={formState?.KhataCertificate.indexOf(item) > -1} />
                                    <span className="form-check-label">{item}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className="mb-3">

                    <div className="form-control-plaintext">
                        <label className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="isRERAApproved" value={true} onChange={(e) => handleCheckBox(e)} checked={formState?.isRERAApproved == true} />
                            <span className="form-check-label">Is RERA Approved</span>
                        </label>
                    </div>
                    <div className="form-control-plaintext">
                        <label className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="isVerifiedDocuments" value={true} onChange={(e) => handleCheckBox(e)} checked={formState?.isVerifiedDocuments == true} />
                            <span className="form-check-label">Is Verified Documnets</span>
                        </label>
                    </div>
                </div>


                <div className="mb-3">
                    <label className="form-label">Show Only </label>
                    <div className="form-control-plaintext">
                        <label className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="showOnlyWithPhotos" value={true} onChange={(e) => handleCheckBox(e)} checked={formState?.showOnlyWithPhotos == true} />
                            <span className="form-check-label">With Photo</span>
                        </label>
                    </div>
                    <div className="form-control-plaintext">
                        <label className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name="showOnlyHavingBoundaryWall" value={true} onChange={(e) => handleCheckBox(e)} checked={formState?.showOnlyHavingBoundaryWall == true} />
                            <span className="form-check-label">Having boundary wall</span>
                        </label>
                    </div>
                </div>
            </>
        }


        <div className="card-footer text-end">
            <div className="d-flex">
                {/*<button type="button" onClick={handleClearFilter} className="btn btn-primary ms-auto">Clear Filter</button>*/}
                {/*<button type="submit" className="btn btn-primary ms-auto">Search Property</button>*/}
            </div>
        </div>
    </></form>)
}
export default PropertyFilter