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

const PropertyRentDetails = ({ tabItems, setSideNavTabs, isSale, fetchAdvartise }) => {
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
        FloorType: "",
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

    console.log(errors);
    useEffect(() => {
        if (params.tabtitle == "property") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null) {
                    setRentDetails(JSON.parse(data?.data?.propertyObject).property_details);
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
                    isSale ? "/manage/property/residential/sale/:guid/:tabtitle" :
                        "/manage/property/residential/rent/:guid/:tabtitle",
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
        formData.propertyType = isSale ? "Residential Sale" : "Residential Rent";
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
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Apartment Type <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/skyscrapers-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text"
                                            name='ApartmentType'
                                            value={rentDetails?.ApartmentType}
                                            className="form-select"
                                            {...register("ApartmentType", { required: true })}
                                            id="ApartmentType"
                                            onChange={e => optionchanged(e, "ApartmentType")}
                                        >
                                            <option value="">Select Apartment Type</option>
                                            {jsonPropertyControls?.ApartmentType?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>

                                    </div>
                                    {errors.ApartmentType && <span className="formError errorMssg" style={{ color: 'red' }}>Apartment type Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {(rentDetails?.ApartmentType === 'Apartment' || rentDetails?.ApartmentType === 'Gated Community Villa') && (
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="control-label">Apartment Name <span className="form-required">*</span></label>
                                <div className="row gutters-xs">
                                    <div className="col-12">
                                        <div className="input-group mb-0">
                                            <select
                                                name='ApartmentName'
                                                value={rentDetails?.ApartmentName}
                                                className="form-select"
                                                {...register("ApartmentName", { required: true })}
                                                id="ApartmentName"
                                                onChange={e => optionchanged(e, "ApartmentName")}
                                            >
                                                <option value="">Select Apartment Name</option>
                                                {jsonPropertyControls?.ApartmentNames?.map((option, index) => (
                                                    <option key={index} value={option}>{option}</option>
                                                ))}
                                            </select>

                                        </div>
                                        {errors.ApartmentName && <span className="formError errorMssg" style={{ color: 'red' }}>Apartment name Required</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='row'>
                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">BHK Type <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/house-door.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text" name='BHKType' value={rentDetails?.BHKType} className="form-select" {...register("BHKType", { required: true })} id="BHKType"
                                            onChange={e => optionchanged(e, "BHKType")}>
                                            <option value="">Select BHK Type</option>
                                            {jsonPropertyControls?.BHKType?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.BHKType && <span className="formError errorMssg" style={{ color: 'red' }}> BHK type Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Floor <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">

                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/floor-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text" name='Floor'
                                            value={rentDetails?.Floor} className="form-select"
                                            {...register("Floor",
                                                {
                                                    required: true,
                                                    validate: {
                                                        greaterThanMin: (vvv) => {
                                                            const minValu = getValues("TotalFloor");
                                                            if (vvv > minValu) {
                                                                return 'Floor should be less than Total Floor'
                                                            }
                                                            return true;
                                                        }
                                                    }
                                                },
                                            )}
                                            id="Floor"
                                            onChange={e => optionchanged(e, "Floor")}
                                        >
                                            <option value="">Select Floor</option>
                                            {jsonPropertyControls?.Floor?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.Floor && <span className="formError errorMssg" style={{ color: 'red' }}> {errors.Floor?.message != '' ? errors.Floor?.message : "Floor Required"}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">
                                Total Floor <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/bar-chart-steps.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text" name='TotalFloor' value={rentDetails?.TotalFloor} className="form-select"
                                            {...register("TotalFloor", {
                                                required: true, valueAsNumber: true,
                                                validate: {
                                                    greaterThanMin: (vvv) => {
                                                        const minValu = getValues("Floor");
                                                        if (vvv < minValu) {
                                                            return 'Total floor should be greater than Floor'
                                                        }
                                                        return true;
                                                    }
                                                }
                                            }
                                            )}
                                            id="TotalFloor"
                                            onChange={e => optionchanged(e, "TotalFloor")}
                                        >
                                            <option value="">Select Total Floor</option>
                                            {jsonPropertyControls?.TotalFloor?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.TotalFloor && <span className="formError errorMssg" style={{ color: 'red' }}> {errors.TotalFloor?.message != '' ? errors.TotalFloor?.message : "Total floor Required"}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Property Age <span className="form-required">*</span> </label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}

                                            {/*    <img src="/svgs/age-0-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
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
                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Facing <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/four-possible-directions-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text" name='Facing' value={rentDetails?.Facing} className="form-select" {...register("Facing", { required: true })} id="Facing"
                                            onChange={e => optionchanged(e, "Facing")}>
                                            <option value="">Select Facing</option>
                                            {jsonPropertyControls?.Facing?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.Facing && <span className="formError errorMssg" style={{ color: 'red' }}> Facing Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Ownership Type <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/four-possible-directions-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text" name='OwnershipType' value={rentDetails?.OwnershipType} className="form-select"
                                            {...register("OwnershipType", { required: true })} id="OwnershipType"
                                            onChange={e => optionchanged(e, "OwnershipType")}>
                                            <option value="">Select Ownership Type</option>
                                            {jsonPropertyControls?.Ownership?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.OwnershipType && <span className="formError errorMssg" style={{ color: 'red' }}> OwnershipType  Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Built Up Area <span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                <div className="input-group-prepend">
                                    {/*<span className="input-group-text">*/}
                                    {/*    <img src="/svgs/area-floor-size-icon.svg" alt="Logo" width="15" height="15" />*/}
                                    {/*</span>*/}
                                </div>
                                <input type="number" className="form-control" placeholder="Company" id='builtUpArea' name='builtUpArea' value={rentDetails?.builtUpArea}
                                    {...register("builtUpArea",
                                        {
                                            required: true,
                                            valueAsNumber: true,
                                            onChange: e => optionchanged(e, "builtUpArea"),
                                            validate: {
                                                greaterThanMin: (vvv) => {
                                                    const minValu = getValues("CarpetArea");
                                                    if (vvv < minValu) {
                                                        return 'Built Area should be greater than Carpet Area'
                                                    }
                                                    return true;
                                                }
                                            }
                                        }
                                    )}
                                />
                            </div>
                            {errors.builtUpArea && <span className="formError errorMssg" style={{ color: 'red' }}> {errors.builtUpArea?.message != '' ? errors.builtUpArea?.message : "Built up Area required"}</span>}
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Carpet Area <span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                <div className="input-group-prepend">
                                    {/*<span className="input-group-text">*/}
                                    {/*    <img src="/svgs/area-floor-size-icon.svg" alt="Logo" width="15" height="15" />*/}
                                    {/*</span>*/}
                                </div>
                                <input type="number" className="form-control" placeholder="Carpet Area" id='CarpetArea' name='CarpetArea'
                                    value={rentDetails?.CarpetArea}
                                    {...register("CarpetArea",
                                        {
                                            required: true,
                                            valueAsNumber: true,
                                            onChange: e => optionchanged(e, "CarpetArea"),
                                            validate: {
                                                greaterThanMin: (vvv) => {
                                                    const minValu = getValues("builtUpArea");
                                                    if (vvv > minValu) {
                                                        return 'Carpet Area should be less than Builtup Area'
                                                    }
                                                    return true;
                                                }
                                            }
                                        }
                                    )}
                                />
                            </div>
                            {errors.CarpetArea && <span className="formError errorMssg" style={{ color: 'red' }}> {errors.CarpetArea?.message != '' ? errors.CarpetArea?.message : "Carpet Area required"}</span>}
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Floor Type <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/four-possible-directions-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text" name='FloorType' value={rentDetails?.FloorType} className="form-select"
                                            {...register("FloorType", { required: true })} id="FloorType"
                                            onChange={e => optionchanged(e, "FloorType")}>
                                            <option value="">Select Floor Type</option>
                                            {/* {jsonPropertyControls?.FloorType?.map((option, index) => (
                                                <option key={index} value={option} disabled={index == "0" ? true : false}>{option}</option>
                                            ))} */}
                                            <option value="Vitrified">Vitrified</option>
                                            <option value="Marble">Marble</option>
                                            <option value="Granite">Granite</option>
                                            <option value="Wooden">Wooden</option>

                                        </select>
                                    </div>
                                    {errors.FloorType && <span className="formError errorMssg" style={{ color: 'red' }}> FloorType Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Bathroom <span className="form-required">*</span></label>
                            <div className="row gutters-xs">

                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/relax-bathroom-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text" name='Bathroom' value={rentDetails?.Bathroom} className="form-select" {...register("Bathroom", { required: true })} id="Bathroom"
                                            onChange={e => optionchanged(e, "Bathroom")}>
                                            <option value="">Select Bathroom</option>
                                            {jsonPropertyControls?.Bathroom?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>  {errors.Bathroom && <span className="formError errorMssg" style={{ color: 'red' }}> Bathroom Required</span>}  </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Balcony <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">

                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/balcony-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text" name='Balcony' value={rentDetails?.Balcony} className="form-select" {...register("Balcony", { required: true })} id="Balcony"
                                            onChange={e => optionchanged(e, "Balcony")}>
                                            <option value="">Select Balcony</option>
                                            {jsonPropertyControls?.Balcony?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.Balcony && <span className="formError errorMssg" style={{ color: 'red' }}> Balcony Required</span>}

                                </div>  </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">
                                Water Supply <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">

                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            {/*<span className="input-group-text">*/}
                                            {/*    <img src="/svgs/water.svg" alt="Logo" width="15" height="15" />*/}
                                            {/*</span>*/}
                                        </div>
                                        <select type="text" name='WaterSupply' value={rentDetails?.WaterSupply} className="form-select" {...register("WaterSupply", { required: true })} id="WaterSupply"
                                            onChange={e => optionchanged(e, "WaterSupply")}>
                                            <option value="">Select Water Supply</option>
                                            {jsonPropertyControls?.WaterSupply?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.WaterSupply && <span className="formError errorMssg" style={{ color: 'red' }}> Water supply Required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">
                                Non-Veg Allowed<span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">

                                    <div className="selectgroup w-100">
                                        <label className="selectgroup-item">
                                            <input
                                                type="radio"
                                                {...register("NonVegAllowed", { required: "This field is required" })}
                                                value="Yes"
                                                className="selectgroup-input"
                                                onChange={e => optionchanged(e, 'NonVegAllowed')}
                                                checked={rentDetails.NonVegAllowed === "Yes"}
                                            />
                                            <span className="selectgroup-button">Yes</span>
                                        </label>
                                        <label className="selectgroup-item">
                                            <input
                                                type="radio"
                                                {...register("NonVegAllowed", { required: "This field is required" })}
                                                value="No"
                                                className="selectgroup-input"
                                                onChange={e => optionchanged(e, 'NonVegAllowed')}
                                                checked={rentDetails.NonVegAllowed === "No"}
                                            />
                                            <span className="selectgroup-button">No</span>
                                        </label>
                                        
                                       
                                    </div>
                                    {errors.NonVegAllowed && <span className="formError errorMssg" style={{ color: 'red' }}> {errors.NonVegAllowed.message} </span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3">
                        <div className="form-group">
                            <label className="control-label">
                                Gated Security <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="selectgroup w-100">
                                        <label className="selectgroup-item">
                                            <input
                                                type="radio"
                                                {...register("GatedSecurity", { required: "This field is required" })}
                                                value="Yes"
                                                className="selectgroup-input"
                                                onChange={e => optionchanged(e, "GatedSecurity")}
                                                checked={rentDetails.GatedSecurity === "Yes"}
                                            />
                                            <span className="selectgroup-button">Yes</span>
                                        </label>
                                        <label className="selectgroup-item">
                                            <input
                                                type="radio"
                                                {...register("GatedSecurity", { required: "This field is required" })}
                                                value="No"
                                                className="selectgroup-input"
                                                onChange={e => optionchanged(e, "GatedSecurity")}
                                                checked={rentDetails.GatedSecurity === "No"}
                                            />
                                            <span className="selectgroup-button">No</span>
                                        </label>

                                    </div>
                                    {errors.GatedSecurity && <span className="formError errorMssg" style={{ color: 'red' }}> {errors.GatedSecurity.message} </span>}
                                
                                </div>  </div>
                        </div>
                    </div>
                </div>

                <PropertySubmitButton title="Save & Continue" />
            </form>
        </div>
    )
}

export default PropertyRentDetails