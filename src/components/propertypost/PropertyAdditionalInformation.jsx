import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { PropertySubmitButton } from '../../components'
import JPOapi from '../../common';
import PropertyModel from '../../common/property/PropertyModel';
import fetchAdvartiseData from '../../common/property/getPropertyAdvartiseData';
import DefaultuserImg from '../../assets/img/DefaultUserImg.jpg';


const PropertyAdditionalInformation = ({ tabItems, setSideNavTabs, isSale, isCommercial, islandorPlot, isResidential }) => {

    const { currentUser } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    const { jsonPropertyControls } = useSelector(state => state.propertyCatalog);

    const initialState = (!isCommercial && !islandorPlot) ? {
        PropertyTax: "",
        OccupancyCertificate: "",
        KhataCertificate: "",
        ReraApproved: "",
        RERANumber: "",
        SaleDeedCertificate: "",
        ConversionCertificate: "",
        EncumbranceCertificate: "",
    } : (isCommercial ? (
        {
            PreviousOccupancy: ""
        }
    ) : ((islandorPlot || isResidential) && ({
        KhataCertificate: "",
        ReraApproved: "",
        RERANumber: "",
        SaleDeedCertificate: "",
        ConversionCertificate: "",
        EncumbranceCertificate: "",
    })));
    const [additionalInfo, setAdditionalInfo] = useState(initialState);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [propertyData, setPropertyData] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        mode: "onChange"
    });


    useEffect(() => {
        if (params.tabtitle == "additionalInfo") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null) {
                    setAdditionalInfo(JSON.parse(data?.data?.PropertyObject || data?.data?.propertyObject).AdditionalInfo);
                }
            });
        }
    }, [params.tabtitle == "additionalInfo"]);

    const optionchanged = (e, id) => {
        setAdditionalInfo(select => ({ ...select, [id]: e.target.value }));
    };

    useEffect(() => {
        if (additionalInfo) {
            reset(additionalInfo);
        }
    }, [additionalInfo]);

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
                setFormSubmitLoading(false);
            }
            else {
                setFormSubmitLoading(false);
                setSideNavTabs(tabItems.map((item, index) => {
                    if (index === 6) {
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
                        tabtitle: "schedule", // <-- override the specific param values from state/etc
                    },
                );

                navigate(path + "?" + new URLSearchParams({ justpayFr: "pyp_schedule" }).toString());
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        const propertyDataVal = JSON.parse(propertyData.PropertyObject || propertyData.propertyObject);
        console.log(propertyDataVal);

        const addInfoObj = { AdditionalInfo: additionalInfo };
        console.log(addInfoObj);

        const formData = PropertyModel.properties;
        formData.PropertyObject = JSON.stringify({ ...propertyDataVal, ...addInfoObj });
        formData.userInfo = JSON.stringify({ "name": currentUser?.name, "email": currentUser?.email, "pic": currentUser?.pic != undefined ? currentUser?.pic : DefaultuserImg });
        formData.advertiseID = params.guid;
        formData.adType = isSale ? "Sale" : "Rent";
        formData.propertyType = islandorPlot ? "LandOrPlot Sale" : isCommercial ? (isSale ? "Commercial Sale" : "Commercial Rent") : isSale ? "Residential Sale" : "Residential Rent";
        formData.userID = currentUser.id;
        formData.isActive = false;
        formData.status = "Pending";
        formData.PropertyTitle = propertyData.propertyTitle;
        formData.listingStatus = "Listed";

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
                tabtitle: isSale ? "gallery" : "amenities", // <-- override the specific param values from state/etc
            },
        );
        navigate(path + "?" + new URLSearchParams({ justpayFr: isSale ? "pyp_gallery" : "pyp_amenities" }).toString());
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body p-3">
                <div className="row">

                    {(isResidential || islandorPlot) && <>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Do You have Khata Certificate?</label>
                                <div className="row gutters-xs">
                                    <div className="col-12">
                                        <div className="input-group mb-0">
                                            <select type="text" name='KhataCertificate' value={additionalInfo?.KhataCertificate} className="form-select" {...register("KhataCertificate", { required: false })} id="KhataCertificate"
                                                onChange={e => optionchanged(e, "KhataCertificate")}>
                                                <option value="" disabled> Select Khata Certificate</option>
                                                {jsonPropertyControls?.KhataCertificate?.map((option, index) => (
                                                    <option key={index} value={option}> {option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.KhataCertificate && <span className="formError errorMssg" style={{ color: 'red' }}> khata certificate required</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Is the property RERA Approved?</label>
                                <div className="input-group mb-0">
                                    <select type="text" name='ReraApproved' value={additionalInfo?.ReraApproved} className="form-select" {...register("ReraApproved", { required: false })} id="ReraApproved"
                                        onChange={e => optionchanged(e, "ReraApproved")}>
                                        <option value="" disabled> Select RERA Approved</option>
                                        {jsonPropertyControls?.RERAApproved?.map((option, index) => (
                                            <option key={index} value={option}> {option}</option>
                                        ))}
                                    </select>

                                    {(additionalInfo?.ReraApproved === 'yes' || additionalInfo?.ReraApproved === 'Yes') && (
                                        <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon2">
                                                <input type="text" className="form-control" placeholder="RERA Number" id="RERANumber" name="RERANumber" value={additionalInfo?.RERANumber}
                                                    {...register("RERANumber", { required: true, onChange: e => optionchanged(e, "RERANumber") })} />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {errors.ReraApproved && <span className="formError errorMssg" style={{ color: 'red' }}> rera approved required</span>}
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Do You have Sale Deed Certificate?</label>
                                <div className="input-group mb-0">
                                    <select type="text" name='SaleDeedCertificate' value={additionalInfo?.SaleDeedCertificate} className="form-select" {...register("SaleDeedCertificate", { required: false })} id="SaleDeedCertificate"
                                        onChange={e => optionchanged(e, "SaleDeedCertificate")}>
                                        <option value="" disabled> Select Sale Deed Certificate</option>
                                        {jsonPropertyControls?.SaleDeedCertificate?.map((option, index) => (
                                            <option key={index} value={option}> {option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {errors.SaleDeedCertificate && <span className="formError errorMssg" style={{ color: 'red' }}> sale deed certificate required</span>}
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Do you have Conversion certificate?</label>
                                <div className="input-group mb-0">
                                    <select type="text" name='ConversionCertificate' value={additionalInfo?.ConversionCertificate} className="form-select" {...register("ConversionCertificate", { required: false })} id="ConversionCertificate"
                                        onChange={e => optionchanged(e, "ConversionCertificate")}>
                                        <option value="" disabled> Select Conversion Certificate</option>
                                        {jsonPropertyControls?.ConversionCertificate?.map((option, index) => (
                                            <option key={index} value={option}> {option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {errors.ConversionCertificate && <span className="formError errorMssg" style={{ color: 'red' }}> coversion certificate required</span>}
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Do you have Encumbrance certificate?</label>
                                <div className="input-group mb-0">
                                    <select type="text" name='EncumbranceCertificate' value={additionalInfo?.EncumbranceCertificate} className="form-select" {...register("EncumbranceCertificate", { required: false })} id="EncumbranceCertificate"
                                        onChange={e => optionchanged(e, "EncumbranceCertificate")}>
                                        <option value="" disabled> Select Encumbrance Certificate</option>
                                        {jsonPropertyControls?.EncumbranceCertificate?.map((option, index) => (
                                            <option key={index} value={option}> {option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {errors.EncumbranceCertificate && <span className="formError errorMssg" style={{ color: 'red' }}> encumbrance certificate required</span>}
                        </div>
                    </>
                    }
                    {(isCommercial) && <>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Previous Occupancy</label>
                                <div className="row gutters-xs">
                                    <div className="col-12">
                                        <div className="input-group mb-0">
                                            <select type="text" name='PreviousOccupancy' value={additionalInfo?.PreviousOccupancy} className="form-select"
                                                {...register("PreviousOccupancy", { required: false })} id="PreviousOccupancy"
                                                onChange={e => optionchanged(e, "PreviousOccupancy")}>
                                                <option value="" disabled> Select Previous Occupancy</option>
                                                {jsonPropertyControls?.PreviousOccupancy?.map((option, index) => (
                                                    <option key={index} value={option}> {option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.PreviousOccupancy && <span className="formError errorMssg" style={{ color: 'red' }}> Previous Occupancy required</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <div className="form-group">
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <div className="form-label">Ideal For</div>
                                                <select type="text" className="form-select tomselected ts-hidden-accessible" id="select-states" value="" multiple="multiple" tabindex="-1">
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
                                                        <input tabindex="0" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-controls="select-states-ts-dropdown"
                                                            id="select-states-ts-control" type="select-multiple" /></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </>}
                    {!islandorPlot && !isCommercial && <>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Have you paid Property Tax?</label>
                                <div className="input-group mb-0">

                                    <select type="text" name='PropertyTax' value={additionalInfo?.PropertyTax} className="form-select" {...register("PropertyTax", { required: false })} id="PropertyTax"
                                        onChange={e => optionchanged(e, "PropertyTax")}>
                                        <option value="" disabled> Select Property Tax</option>
                                        {jsonPropertyControls?.PropertyTax?.map((option, index) => (
                                            <option key={index} value={option}> {option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {errors.PropertyTax && <span className="formError errorMssg" style={{ color: 'red' }}> property tax required</span>}
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label">Do You have Occupancy Certificate?</label>
                                <div className="input-group mb-0">
                                    <select type="text" name='OccupancyCertificate' value={additionalInfo?.OccupancyCertificate} className="form-select" {...register("OccupancyCertificate", { required: false })} id="OccupancyCertificate"
                                        onChange={e => optionchanged(e, "OccupancyCertificate")}>
                                        <option value="" disabled> Select Occupancy Certificate</option>
                                        {jsonPropertyControls?.OccupancyCertificate?.map((option, index) => (
                                            <option key={index} value={option}> {option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {errors.OccupancyCertificate && <span className="formError errorMssg" style={{ color: 'red' }}> occupancy certificate required</span>}
                        </div></>
                    }
                </div>
            </div>

            <PropertySubmitButton title="Save & Continue" backClick={handleBackButton} />
        </form>
    )
}

export default PropertyAdditionalInformation