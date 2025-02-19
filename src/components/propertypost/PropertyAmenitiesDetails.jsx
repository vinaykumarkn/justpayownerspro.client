import { useSelector } from 'react-redux';
import { PropertySubmitButton } from '../../components'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { generatePath, useNavigate, useParams } from 'react-router';
import PropertyModel from '../../common/property/PropertyModel';
import { toast } from 'react-toastify';
import JPOapi from '../../common';
import fetchAdvartiseData from '../../common/property/getPropertyAdvartiseData';
import DefaultuserImg from '../../assets/img/DefaultUserImg.jpg';

const PropertyAmenitiesDetails = ({ tabItems, setSideNavTabs, isSale, isCommercial, islandorPlot }) => {
    const { currentUser } = useSelector(state => state.user);
    const { jsonPropertyControls } = useSelector(state => state.propertyCatalog);
    const [propertyData, setPropertyData] = useState([]);

    const initialState = (!islandorPlot && !isCommercial) ? [] :
        (isCommercial ? {
            PowerBackup: "",
            Lift: "",
            CommercialParking: "",
            Washroom: "",
            WaterStorageFacility: "",
            Security: "",
            Wifi: "",
            SimilarUnits: "",
            DirectionsDescription: ""
        } :
            (islandorPlot ? {
                WaterSupply: "",
                ElectricityConnection: "",
                SewageConnection: "",
                RoadWidth: "",
                DirectionsDescription: ""
            } :
                {}
            )
        );

    const [amenities, setAmenities] = useState(initialState);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false)
    const { userId } = useSelector(state => state.auth);
    const params = useParams();
    const navigate = useNavigate()
    const { register, handleSubmit, getValues, reset, formState: { errors }, control } = useForm({
        mode: "onChange",
        defaultValues: amenities
    });

    useEffect(() => {
        if (params.tabtitle == "amenities") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null && JSON.parse(data?.data?.propertyObject).AmenitiesDetails) {
                    setAmenities(JSON.parse(data?.data?.propertyObject).AmenitiesDetails);
                }
            });
        }
    }, [params.tabtitle == "amenities"]);

    useEffect(() => {
        // if (amenities.length > 0) {
        reset(amenities);
        // }
    }, [amenities]);

    const handleFormSubmit = async (data) => {
        try {
            setFormSubmitLoading(true);
            const postURL = propertyData != null && Object.keys(propertyData).length > 0 ? (JPOapi.Advertises.url + "/" + propertyData?.advertiseID) : (JPOapi.Advertises.url);
            const res = await fetch(postURL, {
                method: propertyData != null && Object.keys(propertyData).length > 0 ? JPOapi.Advertises.PUTmethod : JPOapi.Advertises.POSTmethod,
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    userRef: currentUser.id
                })
            })
            const serverRes = await res.json();
            if (serverRes.success === false) {
                toast.error(serverRes.message, {
                    autoClose: 2000,
                })
                setFormSubmitLoading(false)
            }
            else {
                setFormSubmitLoading(false);
                setSideNavTabs(tabItems.map((item, index) => {
                    if (index === 4) {
                        return { ...item, isDisabled: false }
                    }
                    return item
                }));

                const path = generatePath(
                    islandorPlot ? "/manage/property/landorplot/sale/:guid/:tabtitle" :
                        isCommercial ? (isSale ? "/manage/property/commercial/sale/:guid/:tabtitle" :
                            "/manage/property/commercial/rent/:guid/:tabtitle") :
                            isSale ? "/manage/property/residential/sale/:guid/:tabtitle" :
                                "/manage/property/residential/rent/:guid/:tabtitle",
                    {
                        ...params,       // <-- shallow copy in the existing param values
                        tabtitle: "gallery", // <-- override the specific param values from state/etc
                    },
                );
                navigate(path + "?" + new URLSearchParams({ justpayFr: "pyp_gallery" }).toString());
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }


    const optionchanged = (e, id, item) => {
        const { checked, value } = e.currentTarget;
        if (!islandorPlot && !isCommercial) {
            // add selected values to the amenities state variable and if not selected remove it from the state variable
            setAmenities((c) => e.target.checked ? [...c, item] : c.filter(_item => _item !== item));
        } else if (isCommercial || islandorPlot) {
            setAmenities((c) => ({ ...c, [id]: e.target.value }));
        }
        console.log(amenities);
    };
    const onSubmit = handleSubmit(async (data) => {
        console.log(propertyData);
        const propertyDataVal = JSON.parse(propertyData.propertyObject);
        console.log(propertyDataVal);


        // create new object with key as "LocalityDetails" and value as locationDetails
        const localityObj = { AmenitiesDetails: amenities };
        console.log(localityObj);

        const formData = PropertyModel.properties;
        formData.PropertyObject = JSON.stringify({ ...propertyDataVal, ...localityObj });
        formData.userInfo = JSON.stringify({ "name": currentUser?.name, "email": currentUser?.email, "pic": currentUser?.pic != undefined ? currentUser?.pic : DefaultuserImg });
        formData.advertiseID = params.guid;
        formData.adType = isSale ? "Sale" : "Rent";
        formData.propertyType = islandorPlot ? "LandOrPlot Sale" : isCommercial ? (isSale ? "Commercial Sale" : "Commercial Rent") : isSale ? "Residential Sale" : "Residential Rent";
        formData.userID = currentUser.id;
        formData.isActive = false;
        formData.status = "Pending";
        formData.listingStatus = "Listed";
        formData.PropertyTitle = propertyData.propertyTitle;

        console.log(formData);
        await handleFormSubmit(formData);
    });

    const handleBackButton = () => {
        const path = generatePath(
            islandorPlot ? "/manage/property/landorplot/sale/:guid/:tabtitle" :
                isCommercial ? (isSale ? "/manage/property/commercial/sale/:guid/:tabtitle" :
                    "/manage/property/commercial/rent/:guid/:tabtitle") :
                    isSale ? "/manage/property/residential/sale/:guid/:tabtitle" :
                        "/manage/property/residential/rent/:guid/:tabtitle",
            {
                ...params,       // <-- shallow copy in the existing param values
                tabtitle: isSale ? "resale" : "rental", // <-- override the specific param values from state/etc
            },
        );
        navigate(path + "?" + new URLSearchParams({ justpayFr: isSale ? "pyp_resale" : "pyp_rental" }).toString());
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body p-3">
                <div className="row">
                    {/* for residential */}
                    {!islandorPlot && !isCommercial && jsonPropertyControls?.Amenities?.map((item, index) => {
                        <label className="control-label">Select the available amenities</label>
                        return (
                            <div className="col-sm-6 col-lg-3" key={index}>
                                <div className="p-1">
                                    <div>
                                        <label className="pl-0 custom-control custom-checkbox custom-control-inline">
                                            <input {...register("Amenities", { required: true })} type="checkbox" className="custom-control-input"
                                                name="amenities" value={item} onChange={e => optionchanged(e, "amenities", item)} checked={amenities?.includes(item)} />

                                            <span className="input-group-text custom-control-label pr-5">
                                                <img className='mr-2' src={'/svgs/' + JSON.parse(item).iconClass + ".svg"} alt="Logo" width="30" height="30" />

                                                {JSON.parse(item).name}
                                            </span>
                                        </label>

                                    </div>
                                    {errors.Amenities && <span className="formError errorMssg" style={{ color: 'red' }}> Check any one Amenities</span>}
                                </div>
                            </div>

                        );
                    })}

                    {/* for land / plot */}
                    {islandorPlot &&
                        <div className="row">
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">Water Supply<span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                              
                                                <select type="text" name='WaterSupply' value={amenities?.WaterSupply} className="form-select"
                                                    {...register("WaterSupply", { required: true })} id="WaterSupply"
                                                    onChange={e => optionchanged(e, "WaterSupply")}>
                                                    <option value="" disabled>Select Water Supply</option>
                                                    {jsonPropertyControls?.WaterSupply?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.WaterSupply && <span className="formError errorMssg" style={{ color: 'red' }}> WaterSupply  required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">Electricity Connection <span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">

                                            <div className="input-group mb-0">
                                              
                                                <select type="text" name='ElectricityConnection' value={amenities?.ElectricityConnection} className="form-select" {...register("ElectricityConnection", { required: true })} id="ElectricityConnection"
                                                    onChange={e => optionchanged(e, "ElectricityConnection")}>
                                                    <option value="" disabled>Select Electricity Connection</option>
                                                    {jsonPropertyControls?.ElectricityConnection?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.ElectricityConnection && <span className="formError errorMssg" style={{ color: 'red' }}> Electricity Connection  required</span>}

                                        </div>  </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">
                                        Sewage Connection <span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                               
                                                <select type="text" name='SewageConnection' value={amenities?.SewageConnection} className="form-select" {...register("SewageConnection", { required: true })} id="SewageConnection"
                                                    onChange={e => optionchanged(e, "SewageConnection")}>
                                                    <option value="" disabled>Select Sewage Connection</option>
                                                    {jsonPropertyControls?.SewageConnection?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.SewageConnection && <span className="formError errorMssg" style={{ color: 'red' }}> SewageConnection  required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">Width of Facing Road (ft.)<span className="form-required">*</span></label>
                                    <div className="input-group mb-0">
                                       
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="RoadWidth"
                                            id="RoadWidth"
                                            name='RoadWidth'
                                            value={amenities?.RoadWidth}
                                            onChange={e => optionchanged(e, "RoadWidth")}
                                            {...register("RoadWidth", { required: true, onChange: (e) => optionchanged(e, "RoadWidth") })}
                                        />
                                    </div>
                                    {errors.RoadWidth && <span className="formError errorMssg" style={{ color: 'red' }}> Road Width  Required</span>}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <label className="control-label">Add Directions Tip for your buyers<span className="form-required">*</span></label>
                                    <textarea rows="8" className="form-control" placeholder="Here can be your description" id="DirectionsDescription" name='DirectionsDescription'
                                        value={amenities?.DirectionsDescription} {...register("DirectionsDescription", { required: true, onChange: (e) => optionchanged(e, "DirectionsDescription") })} ></textarea>
                                </div>
                                {errors.DirectionsDescription && <span className="formError errorMssg" style={{ color: 'red' }}> Directions  Description Required</span>}
                            </div>
                        </div>
                    }

                    {/*  for commercial */}
                    {isCommercial &&
                        <div className="row">
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">Power Backup<span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                              
                                                <select type="text" name='PowerBackup' value={amenities?.PowerBackup} className="form-select"
                                                    {...register("PowerBackup", { required: true })} id="PowerBackup"
                                                    onChange={e => optionchanged(e, "PowerBackup")}>
                                                    <option value="" disabled>Select Power Backup</option>
                                                    {jsonPropertyControls?.PowerBackup?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.PowerBackup && <span className="formError errorMssg" style={{ color: 'red' }}> PowerBackup  required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">Lift<span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">

                                            <div className="input-group mb-0">
                                               
                                                <select type="text" name='Lift' value={amenities?.Lift} className="form-select"
                                                    {...register("Lift", { required: true })} id="Lift"
                                                    onChange={e => optionchanged(e, "Lift")}>
                                                    <option value="" disabled>Select Lift</option>
                                                    {jsonPropertyControls?.Lift?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.Lift && <span className="formError errorMssg" style={{ color: 'red' }}> Lift   required</span>}

                                        </div>  </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">
                                        Parking  <span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                               
                                                <select type="text" name='CommercialParking' value={amenities?.CommercialParking} className="form-select"
                                                    {...register("CommercialParking", { required: true })} id="CommercialParking"
                                                    onChange={e => optionchanged(e, "CommercialParking")}>
                                                    <option value="" disabled>Select Parking</option>
                                                    {jsonPropertyControls?.CommercialParking?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.CommercialParking && <span className="formError errorMssg" style={{ color: 'red' }}> Parking  required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">
                                        Washroom  <span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                               
                                                <select type="text" name='Washroom' value={amenities?.Washroom} className="form-select"
                                                    {...register("Washroom", { required: true })} id="Washroom"
                                                    onChange={e => optionchanged(e, "Washroom")}>
                                                    <option value="" disabled>Select Washroom</option>
                                                    {jsonPropertyControls?.Washroom?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.Washroom && <span className="formError errorMssg" style={{ color: 'red' }}> Washroom  required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">
                                        Water Storage Facility  <span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                              
                                                <select type="text" name='WaterStorageFacility' value={amenities?.WaterStorageFacility} className="form-select"
                                                    {...register("WaterStorageFacility", { required: true })} id="WaterStorageFacility"
                                                    onChange={e => optionchanged(e, "WaterStorageFacility")}>
                                                    <option value="" disabled>Select Water Storage Facility</option>
                                                    {jsonPropertyControls?.WaterStorageFacility?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.WaterStorageFacility && <span className="formError errorMssg" style={{ color: 'red' }}> Water Storage Facility  required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">
                                        Security  <span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                               
                                                <select type="text" name='Security' value={amenities?.Security} className="form-select"
                                                    {...register("Security", { required: true })} id="Security"
                                                    onChange={e => optionchanged(e, "Security")}>
                                                    <option value="" disabled>Select Security</option>
                                                    {jsonPropertyControls?.Security?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.Security && <span className="formError errorMssg" style={{ color: 'red' }}> Security  required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-3">
                                <div className="form-group">
                                    <label className="control-label">
                                        Wifi  <span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                                
                                                <select type="text" name='Wifi' value={amenities?.Wifi} className="form-select"
                                                    {...register("Wifi", { required: true })} id="Wifi"
                                                    onChange={e => optionchanged(e, "Wifi")}>
                                                    <option value="" disabled>Select Wifi</option>
                                                    {jsonPropertyControls?.Wifi?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.Wifi && <span className="formError errorMssg" style={{ color: 'red' }}> Wifi  required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Do you have more similar units/properties availaible ?<span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">

                                            <div className="selectgroup w-100">
                                                <label className="selectgroup-item">
                                                    <input type="radio" name="SimilarUnits" value="Yes" className="selectgroup-input" id='SimilarUnits'
                                                        onChange={e => optionchanged(e, 'SimilarUnits')} checked={amenities?.SimilarUnits == "Yes"} />
                                                    <span className="selectgroup-button">Yes</span>
                                                </label>
                                                <label className="selectgroup-item">
                                                    <input type="radio" name="SimilarUnits" value="No" className="selectgroup-input" id='SimilarUnits'
                                                        onChange={e => optionchanged(e, 'SimilarUnits')} checked={amenities?.SimilarUnits == "No"} />
                                                    <span className="selectgroup-button">No</span>
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <label className="control-label">Add Directions Tip for your buyers<span className="form-required">*</span></label>
                                    <textarea rows="5" className="form-control" placeholder="Here can be your description" id="DirectionsDescription" name='DirectionsDescription'
                                        value={amenities?.DirectionsDescription} {...register("DirectionsDescription", { required: true, onChange: (e) => optionchanged(e, "DirectionsDescription") })} ></textarea>
                                </div>
                                {errors.DirectionsDescription && <span className="formError errorMssg" style={{ color: 'red' }}> Directions  Description Required</span>}
                            </div>
                        </div>
                    }


                </div>
            </div>
            <PropertySubmitButton title="Save & Continue" backClick={handleBackButton} />
        </form>
    )
}

export default PropertyAmenitiesDetails