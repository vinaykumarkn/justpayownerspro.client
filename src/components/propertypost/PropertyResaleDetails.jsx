import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom'
import { PropertySubmitButton } from '../../components'
import JPOapi from '../../common';
import PropertyModel from '../../common/property/PropertyModel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fetchAdvartiseData from '../../common/property/getPropertyAdvartiseData';
import formatCurrency from '../../common/property/displayCurrencyFormat';
import DefaultuserImg from '../../assets/img/DefaultUserImg.jpg';

const PropertyResaleDetails = ({ tabItems, setSideNavTabs, isSale, isCommercial, islandorPlot }) => {

    const { currentUser } = useSelector(state => state.user);
    const { jsonPropertyControls } = useSelector(state => state.propertyCatalog);

    const initialState = (!islandorPlot && !isCommercial) ? {
        ExpectedPrice: "",
        BookingAmount: "",
        PriceNegotiable: false,
        CurrentlyUnderLoan: false,
        KitchenType: "",
        Furnishing: "",
        Parking: "",
        AvailableFromResale: "",
        Description: ""
    } : {
        ExpectedPrice: "",
        BookingAmount: "",
        PriceNegotiable: false,
        CurrentlyUnderLoan: false,
        AvailableFromResale: "",
        Description: ""
    }


    const [resaleDetails, setResaleDetails] = useState(initialState);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [propertyData, setPropertyData] = useState([]);
    const params = useParams();
    const { userId } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const { register, handleSubmit, getValues, reset, formState: { errors }, control } = useForm({
        mode: "onChange",
        defaultValues: resaleDetails
    });


    useEffect(() => {
        if (params.tabtitle == "resale") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null) {
                    setResaleDetails(JSON.parse(data?.data?.PropertyObject || data?.data?.propertyObject ).ReSaleDetails);
                }
            });
        }
    }, [params.tabtitle == "resale"]);

    const optionchanged = (e, id) => {
        setResaleDetails(select => ({ ...select, [id]: e.target.value }));
    };

    const onChangeDate = (date, e, id) => {
        setResaleDetails(select => ({ ...select, [id]: date }));
    }

    const checkBoxClicked = (e, id) => {
        setResaleDetails((select) => ({ ...select, [id]: e.target.checked ? "Yes" : "No" }));
    }

    useEffect(() => {
        if (resaleDetails) {
            reset(resaleDetails);
        }
    }, [resaleDetails]);

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
                    if (index === 3) {
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
                        tabtitle: "amenities", // <-- override the specific param values from state/etc
                    },
                );

                navigate(path + "?" + new URLSearchParams({ justpayFr: "pyp_amenities" }).toString());
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false);
        }
    }

    const onSubmit = handleSubmit(async (data) => {

        const propertyDataVal = JSON.parse(propertyData.PropertyObject || propertyData.propertyObject);
        console.log(propertyDataVal);

        const resaleObj = { ReSaleDetails: resaleDetails };
        console.log(resaleObj);

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
        console.log(propertyData);
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
                tabtitle: "locality", // <-- override the specific param values from state/etc
            },
        );
        navigate(path + "?" + new URLSearchParams({ justpayFr: "pyp_locality" }).toString());
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body p-3">
                <div className="row">
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Expected Price<span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12 mb-3">
                                    <div className="input-group ">
                                        {/*<div className="input-group-prepend">*/}
                                        {/*    <span className="input-group-text"></span>*/}
                                        {/*</div>*/}
                                        <input type="number" className="form-control" placeholder="Expected Price" id="ExpectedPrice" value={resaleDetails?.ExpectedPrice} onChange={(e) => optionchanged(e, "ExpectedPrice")} name='ExpectedPrice' {...register("ExpectedPrice", { required: true, onChange: e => optionchanged(e, "ExpectedPrice") })} />
                                    </div>
                                    {resaleDetails?.ExpectedPrice.length > 3 && <div className='currencyFormat' style={{ maxHeight: '0px', textAlign: 'right', color: '#009587' }}>₹ {formatCurrency(resaleDetails?.ExpectedPrice)}</div>}
                                    {errors.ExpectedPrice && <span className="formError errorMssg" style={{ color: 'red' }}> expected price required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Booking Amount<span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        {/*<div className="input-group-prepend">*/}
                                        {/*    <span className="input-group-text"></span>*/}
                                        {/*</div>*/}
                                        <input type="number" className="form-control" placeholder="Booking Amount" id="ExpectedPrice" value={resaleDetails?.BookingAmount} onChange={(e) => optionchanged(e, "BookingAmount")} name='BookingAmount' {...register("BookingAmount", { required: true, onChange: e => optionchanged(e, "BookingAmount") })} />
                                    </div>
                                    {errors.BookingAmount && <span className="formError errorMssg" style={{ color: 'red' }}> Booking price required</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <div className="row">
                                <label className="control-label">&nbsp;</label>
                                <div className="input-group mb-4 col-sm-6 col-md-6">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="PriceNegotiable" value={"Yes"} onChange={e => checkBoxClicked(e, "PriceNegotiable")} checked={resaleDetails?.PriceNegotiable == "Yes"} id="PriceNegotiable" />
                                        <span className="custom-control-label">Price Negotiable</span>
                                    </label>
                                </div>

                                <div className="input-group mb-4 col-sm-6 col-md-6">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="CurrentlyUnderLoan" value={"Yes"} onChange={e => checkBoxClicked(e, "CurrentlyUnderLoan")} checked={resaleDetails?.CurrentlyUnderLoan == "Yes"} id="CurrentlyUnderLoan" />
                                        <span className="custom-control-label">Currently Under Loan</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!islandorPlot && !isCommercial &&
                        <div className="row">
                            <div className="col-sm-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Kitchen Type</label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                                {/*<div className="input-group-prepend">*/}
                                                {/*    <span className="input-group-text"></span>*/}
                                                {/*</div>*/}
                                                <select type="text" name='KitchenType' value={resaleDetails?.KitchenType} className="form-select" {...register("KitchenType", { required: false })} id="KitchenType"
                                                    onChange={e => optionchanged(e, "KitchenType")}>
                                                    <option value="">Select Kitchen Type</option>
                                                    {jsonPropertyControls?.KitchenType?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.KitchenType && <span className="formError errorMssg" style={{ color: 'red' }}> kitchen type required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">Furnishing <span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">

                                            <div className="input-group mb-0">
                                                {/*<div className="input-group-prepend">*/}
                                                {/*    <span className="input-group-text"></span>*/}
                                                {/*</div>*/}
                                                <select type="text" name='Furnishing' value={resaleDetails?.Furnishing} className="form-select" {...register("Furnishing", { required: true })} id="Furnishing"
                                                    onChange={e => optionchanged(e, "Furnishing")}>
                                                    <option value="">Select Furnishing</option>
                                                    {jsonPropertyControls?.Floor?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.Furnishing && <span className="formError errorMssg" style={{ color: 'red' }}> furnishing  required</span>}

                                        </div>  </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <div className="form-group">
                                    <label className="control-label">
                                        Parking <span className="form-required">*</span></label>
                                    <div className="row gutters-xs">
                                        <div className="col-12">
                                            <div className="input-group mb-0">
                                                {/*<div className="input-group-prepend">*/}
                                                {/*    <span className="input-group-text"></span>*/}
                                                {/*</div>*/}
                                                <select type="text" name='Parking' value={resaleDetails?.Parking} className="form-select" {...register("Parking", { required: true })} id="Parking"
                                                    onChange={e => optionchanged(e, "Parking")}>
                                                    <option value="">Select Parking</option>
                                                    {jsonPropertyControls?.TotalFloor?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.Parking && <span className="formError errorMssg" style={{ color: 'red' }}> parking required</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Available From<span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                <div className="input-group-prepend">
                                    {/*<span className="input-group-text">*/}
                                    {/*    <img src="/svgs/monthly-calendar-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                    {/*</span>*/}
                                </div>

                                <Controller className="form-control" control={control} name="AvailableFromResale" render={({ field }) => (
                                    <DatePicker onSelect={(val, e) => onChangeDate(val, e, "AvailableFromResale")} value={resaleDetails?.AvailableFromResale}
                                        {...field} selected={resaleDetails?.AvailableFromResale} name='AvailableFromResale' id='AvailableFromResale' />

                                )} />

                                {/* <DatePicker onSelect={(val, e) => onChangeDate(val, e, "AvailableFrom")} value={select.AvailableFrom} {...register("AvailableFrom", { required: true })} selected={select.AvailableFrom} name='AvailableFrom' id='AvailableFrom' /> */}
                            </div>
                            {errors.AvailableFromResale && <span className="formError errorMssg" style={{ color: 'red' }}> AvailableFrom   Required</span>}
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <div className="form-group">
                                <label className="control-label">Property Description<span className="form-required">*</span></label>
                                <div className="row gutters-xs">
                                    <div className="col-12">
                                        <div className="input-group mb-0">
                                            <textarea rows="7" className="form-control" placeholder="Here can be your description" id="Description" 
                                            value={resaleDetails?.Description} name='Description'   {...register("Description", { required: true, onChange: e => optionchanged(e, "Description") })} ></textarea>
                                        </div>
                                        {errors.Description && <span className="formError errorMssg" style={{ color: 'red' }}> description required</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <PropertySubmitButton title="Save & Continue" backClick={handleBackButton} />
        </form>
    )
}

export default PropertyResaleDetails