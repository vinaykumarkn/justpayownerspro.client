import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { PropertySubmitButton } from '../../components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import JPOapi from '../../common';
import PropertyModel from '../../common/property/PropertyModel';
import fetchAdvartiseData from '../../common/property/getPropertyAdvartiseData';
import DefaultuserImg from '../../assets/img/DefaultUserImg.jpg';
import { FaCalendarAlt } from "react-icons/fa";


const PropertyRentalDetails = ({ tabItems, setSideNavTabs, isSale, isCommercial }) => {

    const { currentUser } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    const { jsonPropertyControls } = useSelector(state => state.propertyCatalog);
    const [propertyData, setPropertyData] = useState([]);

    const initialState = !isCommercial ? {
        PropertyAvailable: "",
        RentNegotiable: "",
        LeaseAmount: "",
        ExpectedRent: "",
        ExpectedDeposit: "",
        PreferredTenants: "",
        MonthlyMaintenance: "",
        MaintenanceAmount: "",
        AvailableFrom: "",
        Furnishing: "",
        Parking: "",
        Description: ""
    } : {
        PropertyAvailable: "",
        ExpectedRent: "",
        LeaseAmount: "",
        RentNegotiable: "",
        ExpectedDeposit: "",
        DepositNegotiable: "",
        MonthlyMaintenance: "",
        MaintenanceAmount: "",
        AvailableFrom: "",
        LockinPeriod: "",
        Description: ""
    }

    const [rentalDetails, setRentalDetails] = useState(initialState);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false)
    const params = useParams();
    const navigate = useNavigate()
    const { register, handleSubmit, getValues, reset, formState: { errors }, control } = useForm({
        mode: "onChange",
        defaultValues: rentalDetails
    });


    useEffect(() => {
        if (params.tabtitle == "rental") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null) {
                    setRentalDetails(JSON.parse(data?.data?.propertyObject).RentalDetails);
                }
            });
        }
    }, [params.tabtitle == "rental"]);

    useEffect(() => {
        if (rentalDetails) {
            reset(rentalDetails);
        }
    }, [rentalDetails]);

    const optionchanged = (e, id) => {
        setRentalDetails(select => ({ ...select, [id]: e.target.value }));
    };

    const optionCheckboxchanged = (e, id) => {
        setRentalDetails(select => e.target.checked ? ({ ...select, [id]: true }) : ({ ...select, [id]: false }));
    };

    const onChangeDate = (date, e, id) => {
        setRentalDetails(select => ({ ...select, [id]: date }));
    }

    const handleFormSubmit = async (data) => {
        try {
            setFormSubmitLoading(true)
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
                    if (index === 3) {
                        return { ...item, isDisabled: false }
                    }
                    return item
                }));

                const path = generatePath(
                    isCommercial ? "/manage/property/commercial/rent/:guid/:tabtitle" :
                        "/manage/property/residential/rent/:guid/:tabtitle",
                    {
                        ...params,       // <-- shallow copy in the existing param values
                        tabtitle: "amenities", // <-- override the specific param values from state/etc
                    },
                );
                navigate(path + "?" + new URLSearchParams({ justpayFr: "pyp_amenities" }).toString());
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }

    // Function to mask email
    const maskEmail = (email) => {
        const emailParts = email.split('@');
        const localPart = emailParts[0];
        const domainPart = emailParts[1];

        // Mask the local part (show only first letter and last 2 letters)
        const maskedLocal = localPart.length > 3
            ? `${localPart[0]}xxx${localPart[localPart.length - 1]}`
            : "xxx";

        return `${maskedLocal}@${domainPart}`;
    };

    // Function to mask mobile number
    const maskMobileNumber = (mobileNumber) => {
        // Remove spaces, dashes, or any unwanted characters
        const cleanNumber = mobileNumber.replace(/\D/g, ''); // Remove all non-digit characters (if any)

        // Check if the mobile number is valid and has 10 digits
        if (cleanNumber.length === 10) {
            // Mask the middle part of the number (e.g., 9876543210 becomes 987******10)
            return `${cleanNumber.slice(0, 3)}******${cleanNumber.slice(7)}`;
        } else {
            return 'Invalid mobile number format';
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log(propertyData);
        const propertyDataVal = JSON.parse(propertyData.propertyObject);
        console.log(propertyDataVal);

        const rentalObj = { RentalDetails: rentalDetails };
        console.log(rentalObj);

        const formData = PropertyModel.properties;
        //formData.PropertyObject = JSON.stringify({ ...propertyDataVal, ...rentalObj });
        //formData.userInfo = JSON.stringify({ "name": currentUser?.name, "email": currentUser?.email, "pic": currentUser?.pic != undefined ? currentUser?.pic : DefaultuserImg });

        formData.PropertyObject = JSON.stringify({
            ...propertyDataVal,
            ...rentalObj,
            userInfo: {
                "name": currentUser?.name,
                "mobileNumber": maskMobileNumber(currentUser?.mobileNumber),
                "email": maskEmail(currentUser?.email),
                "pic": currentUser?.pic !== undefined ? currentUser?.pic : DefaultuserImg
            }
        });


        formData.advertiseID = params.guid;
        formData.adType = isSale ? "Sale" : "Rent";
        formData.propertyType = isCommercial ? (isSale ? "Commercial Sale" : "Commercial Rent") : isSale ? "Residential Sale" : "Residential Rent";
        formData.userID = currentUser.id;
        formData.isActive = false;
        formData.status = "Draft";
        formData.listingStatus = "Listed";
        formData.PropertyTitle = propertyData.propertyTitle;

        console.log(formData);
        console.log(propertyData);
        await handleFormSubmit(formData);
    });

    const handleBackButton = () => {
        const path = generatePath(
            "/manage/property/residential/rent/:guid/:tabtitle",
            {
                ...params,       // <-- shallow copy in the existing param values
                tabtitle: "location", // <-- override the specific param values from state/etc
            },
        );
        navigate(path + "?" + new URLSearchParams({ justpayFr: "pyp_location" }).toString());
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body p-3">

                <div className="row">
                    <div className="col-sm-6 col-md-12">
                        <div className="form-group">
                            <label className="control-label">Property available for<span className="form-required">*</span></label>
                            <div className="custom-controls-stacked">
                                <label className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="Onlyrent" name='PropertyAvailable' value={"Only rent"} checked={rentalDetails?.PropertyAvailable == "Only rent"} {...register("PropertyAvailable", { required: true, onChange: (e) => optionchanged(e, "PropertyAvailable") })} />
                                    <span className="custom-control-label">Only rent</span>
                                </label>
                                <label className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="Onlylease" name='PropertyAvailable' value={"Only lease"} checked={rentalDetails?.PropertyAvailable == "Only lease"} {...register("PropertyAvailable", { required: true, onChange: (e) => optionchanged(e, "PropertyAvailable") })} />
                                    <span className="custom-control-label">Only lease</span>
                                </label>

                            </div>
                            {errors.PropertyAvailable && <span className="formError errorMssg" style={{ color: 'red' }}> PropertyAvailable  Required</span>}
                        </div>
                    </div>
                    {rentalDetails?.PropertyAvailable == "Only lease" &&<div className="col-sm-6 col-md-4">
                            <div className="form-group">
                            <label className="control-label">Expected Lease Amount<span className="form-required">*</span></label>
                                <div className="input-group mb-0">
                                    <input type="number" className="form-control" placeholder="Expected Lease Amount" id="LeaseAmount" name='LeaseAmount'
                                        value={rentalDetails?.LeaseAmount} {...register("LeaseAmount", { required: true, onChange: (e) => optionchanged(e, "LeaseAmount") })} />
                                    {/*<div className="input-group-append">*/}
                                    {/*    <span className="input-group-text">*/}
                                    {/*        <img src="/svgs/rupee-sign-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                    {/*    </span>*/}
                                    {/*</div>*/}

                                </div>
                                {errors.LeaseAmount && <span className="formError errorMssg" style={{ color: 'red' }}> LeaseAmount  Required</span>}
                            </div>
                    </div>}
                    {rentalDetails?.PropertyAvailable == "Only rent" &&<>
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                                <label className="control-label">Expected Rent  <span className="form-required">*</span></label>
                            <div className="input-group mb-0">

                                <input type="number" className="form-control" placeholder="Expected Rent" id="ExpectedRent" name='ExpectedRent' value={rentalDetails?.ExpectedRent} {...register("ExpectedRent", { required: true, onChange: (e) => optionchanged(e, "ExpectedRent") })} />
                                {/*<div className="input-group-append">*/}
                                {/*    <span className="input-group-text">*/}
                                {/*        <img src="/svgs/rupee-sign-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                                <label className="custom-control custom-checkbox mb-0 ml-3">
                                    <input type="checkbox" className="custom-control-input" name="RentNegotiable" id='RentNegotiable'
                                        checked={rentalDetails?.RentNegotiable} onChange={(e) => optionCheckboxchanged(e, "RentNegotiable")} />
                                    <span className="custom-control-label">Rent Negotiable</span>
                                </label>

                            </div>
                            {errors.ExpectedRent && <span className="formError errorMssg" style={{ color: 'red' }}> Expected Rent  Required</span>}
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                                <label className="control-label">Expected Deposit<span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                <input type="number" id="ExpectedDeposit" className="form-control" placeholder="Expected Deposit" name='ExpectedDeposit' value={rentalDetails?.ExpectedDeposit} {...register("ExpectedDeposit", { required: true, onChange: (e) => optionchanged(e, "ExpectedDeposit") })} />
                                {/*<div className="input-group-append">*/}
                                {/*    <span className="input-group-text">*/}
                                {/*        <img src="/svgs/rupee-sign-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                                <label className="custom-control custom-checkbox mb-0 ml-3">
                                    <input type="checkbox" className="custom-control-input" name="DepositNegotiable" id='DepositNegotiable'
                                        checked={rentalDetails?.DepositNegotiable} onChange={(e) => optionCheckboxchanged(e, "DepositNegotiable")} />
                                    <span className="custom-control-label">Deposit Negotiable</span>
                                </label>
                            </div>
                            {errors.ExpectedDeposit && <span className="formError errorMssg" style={{ color: 'red' }}> Expected Deposit Required</span>}
                        </div>
                    </div>
                    </>
                    }
                    <div className="col-sm-6 col-md-4">
                            <div className="form-group">
                            <label className="control-label">Lockin Period (Years)<span className="form-required">*</span></label>
                                <div className="input-group mb-0">
                                    {/*<div className="input-group-prepend">*/}
                                    {/*    <span className="input-group-text">*/}
                                    {/*        <img src="/svgs/furniture-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                    {/*    </span>*/}
                                    {/*</div>*/}
                                    <select type="text" name='LockinPeriod' value={rentalDetails?.LockinPeriod} className="form-select"
                                        {...register("LockinPeriod", { required: true })} id="LockinPeriod"
                                        onChange={e => optionchanged(e, "LockinPeriod")}>
                                        <option value="" disabled>Select</option>
                                        {jsonPropertyControls?.LockinPeriod?.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.LockinPeriod && <span className="formError errorMssg" style={{ color: 'red' }}> LockinPeriod  Required</span>}
                            </div>
                        </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Monthly Maintenance<span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                {/*<div className="input-group-prepend">*/}
                                {/*    <span className="input-group-text">*/}
                                {/*        <img src="/svgs/furniture-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                                <select type="number" name='MonthlyMaintenance' value={rentalDetails?.MonthlyMaintenance} className="form-select"
                                    {...register("MonthlyMaintenance", { required: true })} id="MonthlyMaintenance"
                                    onChange={e => optionchanged(e, "MonthlyMaintenance")}>
                                    <option value="" disabled>Select</option>
                                    {jsonPropertyControls?.MonthlyMaintenance?.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.MonthlyMaintenance && <span className="formError errorMssg" style={{ color: 'red' }}> MonthlyMaintenance  Required</span>}
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Maintenance Amount <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        {/*<div className="input-group-prepend">*/}
                                        {/*    <span className="input-group-text"></span>*/}
                                        {/*</div>*/}
                                        <input type="number" className="form-control" placeholder="Maintenance Amount" id="MaintenanceAmount"
                                            value={rentalDetails?.MaintenanceAmount} onChange={(e) => optionchanged(e, "MaintenanceAmount")} name='MaintenanceAmount'
                                            {...register("MaintenanceAmount", { required: true, onChange: e => optionchanged(e, "MaintenanceAmount") })} />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <img src="/svgs/rupee-sign-svgrepo-com.svg" alt="Logo" width="15" height="15" />
                                            </span>
                                        </div>
                                    </div>

                                    {errors.MaintenanceAmount && <span className="formError errorMssg" style={{ color: 'red' }}> Maintenance Amount  required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Available From<span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                {/*<div className="input-group-prepend">*/}
                                {/*    <span className="input-group-text">*/}
                                {/*        <img src="/svgs/monthly-calendar-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                {/*    </span>*/}
                                {/*</div>*/}

                                <Controller className="form-control" control={control} name="AvailableFrom" render={({ field }) => (
                                    //<DatePicker onSelect={(val, e) => onChangeDate(val, e, "AvailableFrom")} minDate={new Date()}
                                    //    value={rentalDetails?.AvailableFrom} {...field} selected={rentalDetails?.AvailableFrom} name='AvailableFrom' id='AvailableFrom' />

                                         <DatePicker onSelect={(val, e) => onChangeDate(val, e, "AvailableFrom")} minDate={new Date()}
                                        value={rentalDetails?.AvailableFrom} {...field} selected={rentalDetails?.AvailableFrom} name='AvailableFrom' customInput={
                                            <div className="custom-input">
                                              <input {...field} value={rentalDetails?.AvailableFrom} readOnly />
                                              <FaCalendarAlt className="calendar-icon" />
                                            </div>
                                          } id='AvailableFrom' />
                                )} />

                               {/* )} />*/}
                                {/* <DatePicker onSelect={(val, e) => onChangeDate(val, e, "AvailableFrom")} value={select.AvailableFrom} {...register("AvailableFrom", { required: true })} selected={select.AvailableFrom} name='AvailableFrom' id='AvailableFrom' /> */}
                            </div>
                            {errors.AvailableFrom && <span className="formError errorMssg" style={{ color: 'red' }}> AvailableFrom   Required</span>}
                        </div>
                    </div>

                    
                    {!isCommercial && <>
                       

                        <div className="col-sm-6 col-md-4">
                            <div className="form-group">
                                <label className="control-label">Furnishing<span className="form-required">*</span></label>
                                <div className="input-group mb-0">
                                    {/*<div className="input-group-prepend">*/}
                                    {/*    <span className="input-group-text">*/}
                                    {/*        <img src="/svgs/furniture-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                    {/*    </span>*/}
                                    {/*</div>*/}
                                    <select type="text" name='Furnishing' value={rentalDetails?.Furnishing} className="form-select" {...register("Furnishing", { required: true })} id="Furnishing"
                                        onChange={e => optionchanged(e, "Furnishing")}>
                                        <option value="" disabled>Select</option>
                                        {jsonPropertyControls?.Furnishing?.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.Furnishing && <span className="formError errorMssg" style={{ color: 'red' }}> Furnishing  Required</span>}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-group">
                                <label className="control-label">Parking<span className="form-required">*</span></label>
                                <div className="input-group mb-0">
                                    {/*<div className="input-group-prepend">*/}
                                    {/*    <span className="input-group-text">*/}
                                    {/*        <img src="/svgs/Parking.svg" alt="Logo" width="15" height="15" />*/}
                                    {/*    </span>*/}
                                    {/*</div>*/}
                                    <select type="text" name='Parking' value={rentalDetails?.Parking} className="form-select" {...register("Parking", { required: true })} id="Parking"
                                        onChange={e => optionchanged(e, "Parking")}>
                                        <option value="" disabled>Select</option>
                                        {jsonPropertyControls?.Parking?.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.Parking && <span className="formError errorMssg" style={{ color: 'red' }}> Parking Required</span>}
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="form-group">
                                <label className="control-label">Preferred Tenants<span className="form-required">*</span></label>
                                <div id="prefered-tenents" className="input-group mb-0">
                                    <div className="custom-controls-stacked">
                                        {jsonPropertyControls?.PreferredTenants?.map((option, index) => (
                                            <label className="custom-control custom-checkbox" key={index}  >
                                                <input type="checkbox" className="custom-control-input" name="PreferredTenants" value={option}
                                                    checked={rentalDetails?.PreferredTenants == option}
                                                    {...register("PreferredTenants", { required: true, onChange: (e) => optionchanged(e, "PreferredTenants") })} />
                                                <span className="custom-control-label">{option}</span>
                                            </label>
                                        ))}

                                        {/* <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" name="PreferredTenants" value="option4" checked={rentalDetails?.PreferredTenants == "option4"} {...register("PreferredTenants", { required: true, onChange: (e) => optionchanged(e, "PreferredTenants") })} />
                                            <span className="custom-control-label">Option Disabled Checked</span>
                                        </label> */}


                                    </div>
                                </div>
                                {errors.ExpectedDeposit && <span className="formError errorMssg" style={{ color: 'red' }}> ExpectedDeposit   Required</span>}
                            </div>
                        </div>



                    </>
                    }
                    {isCommercial && <>
                       

                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row gutters-xs">
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <div className="control-label">Ideal For</div>
                                                <select type="text" className="form-select tomselected ts-hidden-accessible" id="select-states" value="" multiple="multiple" tabIndex="-1">
                                                    <option value="AL">Alabama</option>
                                                    <option value="AK">Alaska</option>
                                                    <option value="AR">Arkansas</option>
                                                    <option value="CA">California</option>
                                                    <option value="CO">Colorado</option>
                                                    <option value="CT">Connecticut</option>
                                                    <option value="DE">Delaware</option>
                                                    <option value="DC">District of Columbia</option>
                                                    <option value="FL">Florida</option>
                                                    <option value="GA">Georgia</option>
                                                    <option value="HI">Hawaii</option>
                                                    <option value="ID">Idaho</option>
                                                    <option value="IL">Illinois</option>
                                                    <option value="IN">Indiana</option>
                                                    <option value="IA">Iowa</option>
                                                    <option value="KS">Kansas</option>
                                                    <option value="KY">Kentucky</option>
                                                    <option value="LA">Louisiana</option>
                                                    <option value="ME">Maine</option>
                                                    <option value="MD">Maryland</option>
                                                    <option value="MA">Massachusetts</option>
                                                    <option value="MI">Michigan</option>
                                                    <option value="MN">Minnesota</option>
                                                    <option value="MS">Mississippi</option>
                                                    <option value="MO">Missouri</option>
                                                    <option value="MT">Montana</option>
                                                    <option value="NE">Nebraska</option>
                                                    <option value="NV">Nevada</option>
                                                    <option value="NH">New Hampshire</option>
                                                    <option value="NJ">New Jersey</option>
                                                    <option value="NM">New Mexico</option>
                                                    <option value="NY">New York</option>
                                                    <option value="NC">North Carolina</option>
                                                    <option value="ND">North Dakota</option>
                                                    <option value="OH">Ohio</option>
                                                    <option value="OK">Oklahoma</option>
                                                    <option value="OR">Oregon</option>
                                                    <option value="PA">Pennsylvania</option>
                                                    <option value="RI">Rhode Island</option>

                                                    <option value="SD">South Dakota</option>
                                                    <option value="TN">Tennessee</option>
                                                    <option value="TX">Texas</option>
                                                    <option value="UT">Utah</option>
                                                    <option value="VT">Vermont</option>
                                                    <option value="VA">Virginia</option>
                                                    <option value="WA">Washington</option>
                                                    <option value="WV">West Virginia</option>
                                                    <option value="WI">Wisconsin</option>
                                                    <option value="AZ" selected="">Arizona</option>
                                                    <option value="SC" selected="">South Carolina</option>
                                                    <option value="WY" selected="">Wyoming</option>
                                                </select>
                                                <div className="ts-wrapper form-select multi has-items">
                                                    <div className="ts-control">
                                                        <div data-value="AZ" className="item" data-ts-item="">Arizona</div>
                                                        <div data-value="SC" className="item" data-ts-item="">South Carolina</div>
                                                        <div data-value="WY" className="item" data-ts-item="">Wyoming</div>
                                                        <input tabIndex="0" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-controls="select-states-ts-dropdown"
                                                            id="select-states-ts-control" type="select-multiple" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group">
                            <label className="control-label">Description<span className="form-required">*</span></label>
                            <textarea rows="5" className="form-control" placeholder="Here can be your description" id="Description" name='Description' value={rentalDetails?.Description} {...register("Description", { required: true, onChange: (e) => optionchanged(e, "Description") })} ></textarea>
                        </div>
                    </div>
                    {errors.Description && <span className="formError errorMssg" style={{ color: 'red' }}> Description Required</span>}
                </div>
            </div>

            <PropertySubmitButton title="Save & Continue" backClick={handleBackButton} />
        </form >
    )
}

export default PropertyRentalDetails