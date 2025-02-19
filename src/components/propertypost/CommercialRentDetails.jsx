import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom'
import { PropertySubmitButton } from '../../components'
import JPOapi from '../../common';
import PropertyModel from '../../common/property/PropertyModel';
import fetchAdvartiseData from '../../common/property/getPropertyAdvartiseData';
import DefaultuserImg from '../../assets/img/DefaultUserImg.jpg';


const CommercialRentDetails = ({ tabItems, setSideNavTabs, isSale, fetchAdvartise }) => {
    const { currentUser } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    const { jsonPropertyControls } = useSelector(state => state.propertyCatalog);
    const [rentDetails, setRentDetails] = useState({
        ApartmentType: "",
        ApartmentName: "",
        BHKType: "",
        Floor: "",
        TotalFloor: "",
        PropertyAge: "",
        Facing: "",
        builtUpArea: "",
        Bathroom: "",
        Balcony: "",
        WaterSupply: "",
        NonVegAllowed: "",
        GatedSecurity: ""
    });
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [propertyData, setPropertyData] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: rentDetails
    });

    useEffect(() => {
        if (params.tabtitle == "property") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null) {
                    setRentDetails(JSON.parse(data?.data?.PropertyObject).property_details);
                }
            });
        }
    }, [params.tabtitle == "property"]);

    useEffect(() => {
        if (rentDetails) {
            reset(rentDetails);
        }
    }, [rentDetails]);

    const optionchanged = (e, id) => {
        setRentDetails(select => ({ ...select, [id]: e.target.value }));
    };

    const handleFormSubmit = async (data) => {
        try {
            console.log(propertyData);
            setFormSubmitLoading(true);
            const postURL = propertyData != null && Object.keys(propertyData).length > 0 ? (JPOapi.Advertises.url + "/" + propertyData?.advertiseID) : (JPOapi.Advertises.url);
            const res = await fetch(postURL, {
                method: (propertyData != null && Object.keys(propertyData).length > 0) ? JPOapi.Advertises.PUTmethod : JPOapi.Advertises.POSTmethod,
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    userRef: currentUser.id
                })
            })
            const serverRes = await res.json();
            if (serverRes.success === true) {
                setFormSubmitLoading(false);
                setSideNavTabs(tabItems.map((item, index) => {
                    if (index === 1) {
                        return { ...item, isDisabled: false }
                    }
                    return item
                }));

                // redirect to next tab
                const path = generatePath(
                    isSale ? "/manage/property/commercial/sale/:guid/:tabtitle" :
                        "/manage/property/commercial/rent/:guid/:tabtitle",
                    {
                        ...params,       // <-- shallow copy in the existing param values
                        tabtitle: "location", // <-- override the specific param values from state/etc
                    },
                );
                navigate(path + "?" + new URLSearchParams({ justpayFr: "pyp_location" }).toString());
            } else {
                toast.error(serverRes.message, {
                    autoClose: 2000,
                })
                setFormSubmitLoading(false)
            }
        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }

    const onSubmit = handleSubmit(async (data, e) => {
        console.log(rentDetails);
        console.log(data);
        //save all the filed values in local storage with key as guid
        // value as object and key is "property details" and value as object
        // save the data in local storage

        const formData = PropertyModel.properties;
        formData.PropertyObject = JSON.stringify({ "property_details": rentDetails });
        formData.userInfo = JSON.stringify({ "name": currentUser?.name, "email": currentUser?.email, "pic": currentUser?.pic != undefined ? currentUser?.pic : DefaultuserImg });
        formData.advertiseID = params.guid;
        formData.adType = isSale ? "Sale" : "Rent";
        formData.propertyType = isSale ? "Commercial Sale" : "Commercial Rent";
        formData.userID = currentUser.id;
        formData.isActive = false;
        formData.status = "Pending";
        formData.listingStatus = "Listed";

        //generate property title based on the property details and title will be like example '2 BHK House For Lease In Krishnarajapura'
        formData.PropertyTitle = `${rentDetails.BHKType} ${rentDetails.ApartmentType} For ${isSale ? "Sale" : "Rent"}`;

        console.log(formData);
        await handleFormSubmit(formData);
        // localStorage.setItem(params.guid, JSON.stringify({ "property_details": rentDetails }));

    });
    return (
        <div className="card-body p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Property Type<span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <select type="text"
                                            name='PropertyType'
                                            value={rentDetails?.PropertyType}
                                            className="form-select"
                                            {...register("PropertyType", { required: true })}
                                            id="PropertyType"
                                            onChange={e => optionchanged(e, "PropertyType")}
                                        >
                                            <option value="">Select Property Type</option>
                                            {jsonPropertyControls?.PropertyType?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.PropertyType && <span className="formError errorMssg" style={{ color: 'red' }}>Property Type  Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Building Type<span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <select
                                            name='BuildingType'
                                            value={rentDetails?.BuildingType}
                                            className="form-select"
                                            {...register("BuildingType", { required: true })}
                                            id="BuildingType"
                                            onChange={e => optionchanged(e, "BuildingType")}
                                        >
                                            <option value="">Select Building Type</option>
                                            {jsonPropertyControls?.BuildingType?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>

                                    </div>
                                    {errors.BuildingType && <span className="formError errorMssg" style={{ color: 'red' }}>BuildingType  Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Ownership Type<span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <select
                                            name='Ownership'
                                            value={rentDetails?.Ownership}
                                            className="form-select"
                                            {...register("Ownership", { required: true })}
                                            id="Ownership"
                                            onChange={e => optionchanged(e, "Ownership")}
                                        >
                                            <option value="">Select Ownership Type</option>
                                            {jsonPropertyControls?.Ownership?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>

                                    </div>
                                    {errors.Ownership && <span className="formError errorMssg" style={{ color: 'red' }}>Ownership  Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Age of Property<span className="form-required">*</span> </label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                       
                                        <select type="text" name='PropertyAge' value={rentDetails?.PropertyAge} className="form-select" {...register("PropertyAge", { required: true })} id="PropertyAge"
                                            onChange={e => optionchanged(e, "PropertyAge")}>
                                            <option value="">Select Property Age</option>
                                            {jsonPropertyControls?.PropertyAge?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {errors.PropertyAge && <span className="formError errorMssg" style={{ color: 'red' }}> Property age Required</span>}
                                </div>  </div>
                        </div>
                    </div>

                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Floor <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">

                                    <div className="input-group mb-0">
                                       
                                        <select type="text" name='Floor' value={rentDetails?.Floor} className="form-select" {...register("Floor", { required: true })} id="Floor"
                                            onChange={e => optionchanged(e, "Floor")}>
                                            <option value="">Select Floor</option>
                                            {jsonPropertyControls?.Floor?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.Floor && <span className="formError errorMssg" style={{ color: 'red' }}> Floor Required</span>}

                                </div>  </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">
                                Total Floor <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        
                                        <select type="text" name='TotalFloor' value={rentDetails?.TotalFloor} className="form-select" {...register("TotalFloor", { required: true })} id="TotalFloor"
                                            onChange={e => optionchanged(e, "TotalFloor")}>
                                            <option value="">Select Total Floor</option>
                                            {jsonPropertyControls?.TotalFloor?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.TotalFloor && <span className="formError errorMssg" style={{ color: 'red' }}> Total floor Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Super Built Up Area <span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                
                                <input type="text" className="form-control" placeholder="Company" id='builtUpArea' name='builtUpArea'
                                    value={rentDetails?.builtUpArea} onChange={e => optionchanged(e, "builtUpArea")} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Carpet Area <span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                
                                <input type="text" className="form-control" placeholder="Carpet Area" id='CarpetArea' name='CarpetArea'
                                    value={rentDetails?.CarpetArea} onChange={e => optionchanged(e, "CarpetArea")} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                            <label className="control-label">Furnishing <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                       
                                        <select type="text" name='Furnishing' value={rentDetails?.Furnishing} className="form-select"
                                            {...register("Furnishing", { required: true })} id="Furnishing"
                                            onChange={e => optionchanged(e, "Furnishing")}>
                                            <option value="">Select Furnishing</option>
                                            {jsonPropertyControls?.Furnishing?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.Furnishing && <span className="formError errorMssg" style={{ color: 'red' }}> Furnishing Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <div className="form-group">
                            <label className="control-label">
                                Other Features<span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="selectgroup w-100">
                                        <label className="selectgroup-item">
                                            <input type="radio" name="OtherFeatures" value="Yes" className="selectgroup-input" id='OtherFeatures'
                                                onChange={e => optionchanged(e, 'OtherFeatures')} checked={rentDetails.OtherFeatures == "Yes"} />
                                            <span className="selectgroup-button">On Main Road</span>
                                        </label>
                                        <label className="selectgroup-item">
                                            <input type="radio" name="OtherFeatures" value="No" className="selectgroup-input" id='OtherFeatures'
                                                onChange={e => optionchanged(e, 'OtherFeatures')} checked={rentDetails.OtherFeatures == "No"} />
                                            <span className="selectgroup-button">Corner Property</span>
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <PropertySubmitButton title="Save & Continue" />
            </form>
        </div>
    )
}

export default CommercialRentDetails