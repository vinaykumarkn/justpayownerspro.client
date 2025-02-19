import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { PropertySubmitButton } from '../../components'
import JPOapi from '../../common';
import Swal from 'sweetalert2';
import PropertyModel from '../../common/property/PropertyModel';
import fetchAdvartiseData from '../../common/property/getPropertyAdvartiseData';
import moment from 'moment';
import DefaultuserImg from '../../assets/img/DefaultUserImg.jpg';
// import PropertyModel from '../../common/property/PropertyModel';


const PropertyScheduleDetails = ({ tabItems, setSideNavTabs, isSale, isCommercial, islandorPlot }) => {

    const { currentUser } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    const { jsonPropertyControls } = useSelector(state => state.propertyCatalog);
    const [propertyData, setPropertyData] = useState([]);
    const params = useParams();
    const [scheduleDetails, setScheduleDetails] = useState({
        Availability: [],
        StartTime: "",
        EndTime: "",
        Showproperty: "",
        SecondaryNumber: "",
        AvailableAllDay: false
    });
    const [formSubmitLoading, setFormSubmitLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({});

    const navigate = useNavigate()
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: scheduleDetails
    });


    useEffect(() => {
        if (params.tabtitle == "schedule") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null && JSON.parse(data?.data?.propertyObject).ScheduleInfo) {
                    setScheduleDetails(JSON.parse(data?.data?.propertyObject).ScheduleInfo);
                }
            });
        }
    }, [params.tabtitle == "schedule"]);

    const optionchanged = (e, id) => {
        if (id == "SecondaryNumber") {
            const inputValue = e.target.value;
            const regex = /^[0-9]*$/;
            if (regex.test(inputValue)) {
                setScheduleDetails(select => ({ ...select, [id]: inputValue.replace(/[^0-9]/g, '') }));
            }
        } else if (id == "EndTime") {
            const startTime = moment(scheduleDetails?.StartTime, 'hh:mm A');
            if (startTime && e.target.value) {
                if (moment(startTime, 'hh:mm A').isAfter(moment(e.target.value, 'hh:mm A')) || moment(startTime, 'hh:mm A').isSame(moment(e.target.value, 'hh:mm A'))) {
                    setFieldErrors({ ...fieldErrors, [id]: "End time should be greater than start time" });
                }
                else {
                    setFieldErrors({ ...fieldErrors, [id]: "" });
                    setScheduleDetails(select => ({ ...select, [id]: e.target.value }));
                }
            }
        }
        else {
            setScheduleDetails(select => ({ ...select, [id]: e.target.value }));
        }
    };

    useEffect(() => {
        if (scheduleDetails) {
            reset(scheduleDetails);
        }
    }, [scheduleDetails]);

    const checkBoxClicked = (e, id) => {
        setScheduleDetails((select) => ({ ...select, [id]: e.target.checked }));
        // if checked, then set the start time value as initial value and end time as last value from jsonPropertyControls?.Time
        if (e.target.checked) {
            const timeArray = jsonPropertyControls?.Time;
            setScheduleDetails((select) => ({ ...select, StartTime: timeArray[0], EndTime: timeArray[timeArray.length - 1] }));
        }
    }

    const multiCheckBoxClicked = (e, id) => {
        setScheduleDetails((select) => e.target.checked ? { ...select, [id]: [...select[id], e.target.value] } : { ...select, [id]: select[id].filter(item => item !== e.target.value) });
    }

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
                Swal.fire({
                    title: 'Property Posted Successfully',
                    text: 'Your property has been posted successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    navigate('/profile/myproperties');
                });
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        const resaleObj = { ScheduleInfo: scheduleDetails };
        console.log(resaleObj);

        const propertyDataVal = JSON.parse(propertyData.propertyObject);
        console.log(propertyDataVal);

        const formData = PropertyModel.properties;
        formData.PropertyObject = JSON.stringify({ ...propertyDataVal, ...resaleObj });
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

    const handleBackClick = () => {
        const path = generatePath(
            islandorPlot ? "/manage/property/landorplot/sale/:guid/:tabtitle" :
                isCommercial ? (isSale ? "/manage/property/commercial/sale/:guid/:tabtitle" :
                    "/manage/property/commercial/rent/:guid/:tabtitle") :
                    isSale ? "/manage/property/residential/sale/:guid/:tabtitle" :
                        "/manage/property/residential/rent/:guid/:tabtitle",
            {
                ...params,       // <-- shallow copy in the existing param values
                tabtitle: isSale ? "additionalInfo" : "gallery", // <-- override the specific param values from state/etc
            },
        );

        navigate(path + "?" + new URLSearchParams({ justpayFr: isSale ? "pyp_additionalInfo" : "pyp_gallery" }).toString());
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body p-3">
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Availability</label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <div className="selectgroup selectgroup-pills">
                                            <label className="selectgroup-item">
                                                <input type="checkbox" name="Availability" className="selectgroup-input" value={"Everyday"} onChange={e => multiCheckBoxClicked(e, "Availability")} checked={scheduleDetails?.Availability.includes("Everyday")} id="Everyday" {...register("Availability", { required: false, onChange: e => multiCheckBoxClicked(e, "Availability") })} />
                                                <span className="selectgroup-button">Everyday
                                                    Mon-Sun</span>
                                            </label>
                                            <label className="selectgroup-item">
                                                <input type="checkbox" name="Availability" className="selectgroup-input" disabled={scheduleDetails?.Availability.includes("Everyday")} value={"Weekday"} onChange={e => multiCheckBoxClicked(e, "Availability")} checked={scheduleDetails?.Availability.includes("Weekday")} id="Weekday" {...register("Availability", { required: false, onChange: e => multiCheckBoxClicked(e, "Availability") })} />
                                                <span className="selectgroup-button">Weekday
                                                    Mon-Fri</span>
                                            </label>
                                            <label className="selectgroup-item">
                                                <input type="checkbox" name="Availability" className="selectgroup-input" disabled={scheduleDetails?.Availability.includes("Everyday")} value={"Weekend"} onChange={e => multiCheckBoxClicked(e, "Availability")} checked={scheduleDetails?.Availability.includes("Weekend")} id="Weekend"{...register("Availability", { required: false, onChange: e => multiCheckBoxClicked(e, "Availability") })} />
                                                <span className="selectgroup-button">Weekend
                                                    Sat,Sun</span>
                                            </label>
                                        </div>
                                    </div>
                                    {errors.Availability && <span className="formError errorMssg" style={{ color: 'red' }}> availability required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">

                            <label className="control-label">Select Time Schedule </label>
                            <div className="input-group mb-4 col-sm-6 col-md-6">
                                {/*<div className="input-group-prepend">*/}
                                {/*    <span className="input-group-text">*/}
                                {/*        <img src="/svgs/time-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                                {/* <input type="text" className="form-control" placeholder="Start Time" id="StartTime" 
                                    value={scheduleDetails?.StartTime} name="StartTime" 
                                    {...register("StartTime", { required: false, onChange: e => optionchanged(e, "StartTime") })} /> */}

                                <select type="text" name='StartTime' value={scheduleDetails?.StartTime} className="form-select" {...register("StartTime", { required: true, valueAsDate: true, disabled: scheduleDetails?.AvailableAllDay == true })} id="StartTime"
                                    onChange={e => optionchanged(e, "StartTime")}>
                                    <option value="" disabled >Select Start Time</option>
                                    {jsonPropertyControls?.Time?.map((option, index) => (
                                        <option key={index} value={option}  > {option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group mb-4 col-sm-6 col-md-6">
                                {/*<div className="input-group-prepend">*/}
                                {/*    <span className="input-group-text">*/}
                                {/*        <img src="/svgs/time-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                                {/* <input type="text" className="form-control" placeholder="End Time" id="EndTime" value={scheduleDetails?.EndTime} 
                                    name="EndTime" {...register("EndTime", { required: false, onChange: e => optionchanged(e, "EndTime") })} /> */}

                                <select type="text" name='EndTime' value={scheduleDetails?.EndTime} className="form-select"
                                    {...register("EndTime", {
                                        required: true,
                                        disabled: scheduleDetails?.AvailableAllDay == true,
                                    }
                                    )}
                                    id="EndTime"
                                    onChange={e => optionchanged(e, "EndTime")}
                                >
                                    <option value="" disabled >Select End Time</option>
                                    {jsonPropertyControls?.Time?.map((option, index) => (
                                        <option key={index} value={option}  > {option}</option>
                                    ))}
                                </select>
                            </div>

                            {errors.StartTime && <span className="formError errorMssg" style={{ color: 'red' }}> start time required</span>}
                            {fieldErrors?.EndTime != undefined && fieldErrors?.EndTime != "" && <span className="formError errorMssg" style={{ color: 'red' }}> {fieldErrors?.EndTime}</span>}
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-0">
                                <label className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" name="AvailableAllDay" value={scheduleDetails?.AvailableAllDay} checked={scheduleDetails?.AvailableAllDay == true} onChange={e => checkBoxClicked(e, "AvailableAllDay")} id="AvailableAllDay" />
                                    <span className="custom-control-label">Available All Day</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Who will show the property?</label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        {/*<div className="input-group-prepend">*/}
                                        {/*    <span className="input-group-text">*/}
                                        {/*        <img src="/svgs/propertyowner.svg" alt="Logo" width="15" height="15" />*/}
                                        {/*    </span>*/}
                                        {/*</div>*/}
                                        <select type="text" name='Showproperty' value={scheduleDetails?.Showproperty} className="form-select"
                                            {...register("Showproperty", { required: false })} id="Showproperty" onChange={e => optionchanged(e, "Showproperty")}>
                                            <option value="" disabled >Select</option>
                                            {jsonPropertyControls?.Showproperty?.map((option, index) => (
                                                <option key={index} value={option}  > {option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.Showproperty && <span className="formError errorMssg" style={{ color: 'red' }}> property showing required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Secondary Number</label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        {/*<div className="input-group-prepend">*/}
                                        {/*    <span className="input-group-text">*/}
                                        {/*        <img src="/svgs/cell-phone-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                        {/*    </span>*/}
                                        {/*</div>*/}
                                        <input type="tel" maxLength={10} pattern="[0-9]*" inputMode='numeric' name='SecondaryNumber' className="form-control" value={scheduleDetails?.SecondaryNumber}
                                            placeholder="Eg-9211212010" {...register("SecondaryNumber", { required: false, onChange: e => optionchanged(e, "SecondaryNumber") })}
                                            id="SecondaryNumber" />
                                    </div>
                                    {errors.SecondaryNumber && <span className="formError errorMssg" style={{ color: 'red' }}> secondary number required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PropertySubmitButton title="Finish Property" backClick={handleBackClick} />
        </form>
    )
}

export default PropertyScheduleDetails