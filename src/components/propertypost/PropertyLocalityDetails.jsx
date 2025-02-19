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

const PropertyLocalityDetails = ({ tabItems, setSideNavTabs, isSale, isCommercial, islandorPlot }) => {
    const { currentUser } = useSelector(state => state.user);
    const { jsonPropertyControls } = useSelector(state => state.propertyCatalog);
    const [locationDetails, setLocationDetails] = useState({
        state: "",
        city: "",
        locality: "",
        street: "",
        landmark: ""
    });
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [propertyData, setPropertyData] = useState([]);
    const params = useParams();
    const { userId } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: locationDetails
    });

    useEffect(() => {
        if (params.tabtitle == "location") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null) {
                    setLocationDetails(JSON.parse(data?.data?.propertyObject).LocalityDetails);
                }
            });
        }
    }, [params.tabtitle == "location"]);


    const optionchanged = (e, id) => {
        setLocationDetails(select => ({ ...select, [id]: e.target.value }));
    };

    useEffect(() => {
        if (locationDetails) {
            reset(locationDetails);
        }
    }, [locationDetails]);

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
                    userRef: currentUser._id
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
                setFormSubmitLoading(false)
                setSideNavTabs(tabItems.map((item, index) => {
                    if (index === 2) {
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
                        tabtitle: isSale ? "resale" : "rental", // <-- override the specific param values from state/etc
                    },
                );
                navigate(path + "?" + new URLSearchParams({ justpayFr: isSale ? "pyp_resale" : "pyp_rental" }).toString());
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        //get the local storage data based on guid as a key
        // const formData = JSON.parse(localStorage.getItem(params.guid));
        // add one more object to this local storage item with the key as "LocalityDetails"
        console.log(propertyData);
        const propertyDataVal = JSON.parse(propertyData.propertyObject || propertyData.PropertyObject);
        console.log(propertyDataVal);


        // create new object with key as "LocalityDetails" and value as locationDetails
        const localityObj = { LocalityDetails: locationDetails };
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
        if (propertyData.propertyTitle.indexOf(locationDetails.state) == -1) {
            formData.PropertyTitle = propertyData.propertyTitle + " In " + locationDetails?.state;
        } else {
            formData.PropertyTitle = propertyData.propertyTitle;
        }

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
                tabtitle: "property", // <-- override the specific param values from state/etc
            },
        );
        navigate(path + "?" + new URLSearchParams({ justpayFr: "pyp_property" }).toString());
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body p-3">
                <div className="row">
                    <div className="col-sm-4 col-md-4">
                        <div className="form-group">
                            <label className="control-label">State <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        {/*<div className="input-group-prepend">*/}
                                        {/*    <span className="input-group-text">*/}
                                        {/*        <img src="/svgs/flag-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                        {/*    </span>*/}
                                        {/*</div>*/}
                                        <select type="text" name='state' value={locationDetails?.state} className="form-select" {...register("state", { required: true })} id="state"
                                            onChange={e => optionchanged(e, "state")}>
                                            <option value="" disabled >Select State</option>
                                            {jsonPropertyControls?.State?.map((option, index) => (
                                                <option key={index} value={option}  > {option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.state && <span className="formError errorMssg" style={{ color: 'red' }}> state required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                        <div className="form-group">
                            <label className="control-label">City <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        {/*<div className="input-group-prepend">*/}
                                        {/*    <span className="input-group-text">*/}
                                        {/*        <img src="/svgs/city-transit-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                        {/*    </span>*/}
                                        {/*</div>*/}
                                        <select type="text" name='city' value={locationDetails?.city} className="form-select" {...register("city", { required: true })} id="city"
                                            onChange={e => optionchanged(e, "city")}>
                                            <option value="" disabled >Select City</option>
                                            {jsonPropertyControls?.City?.map((option, index) => (
                                                <option key={index} value={option}  > {option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.city && <span className="formError errorMssg" style={{ color: 'red' }}> city required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Locality <span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                {/*<div className="input-group-prepend">*/}
                                {/*    <span className="input-group-text">*/}
                                {/*        <img src="/svgs/gate-landmark-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Locality"
                                    id="locality"
                                    name='locality'
                                    value={locationDetails?.locality}
                                    onChange={e => optionchanged(e, "locality")}
                                    {...register("locality", { required: true, onChange: (e) => optionchanged(e, "locality") })}
                                />
                            </div>
                        </div>
                        {errors.locality && <span className="formError errorMssg" style={{ color: 'red' }}> locality required</span>}
                    </div>
                    <div className="col-sm-4 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Street / Area<span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                {/*<div className="input-group-prepend">*/}
                                {/*    <span className="input-group-text">*/}
                                {/*        <img src="/svgs/place-marker-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                                <input
                                    type="text"
                                    id="street"
                                    className="form-control"
                                    placeholder="street"
                                    name='street'
                                    value={locationDetails?.street}
                                    onChange={e => optionchanged(e, "street")}
                                    {...register("street", { required: true, onChange: (e) => optionchanged(e, "street") })}
                                />
                            </div>
                        </div>
                        {errors.street && <span className="formError errorMssg" style={{ color: 'red' }}> street /area required</span>}
                    </div>
                    <div className="col-sm-4 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Landmark<span className="form-required">*</span></label>
                            <div className="input-group mb-0">
                                {/*<div className="input-group-prepend">*/}
                                {/*    <span className="input-group-text">*/}
                                {/*        <img src="/svgs/signpost-svgrepo-com.svg" alt="Logo" width="15" height="15" />*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                                <input type="text" id="landmark" className="form-control" placeholder="Landmark" name='landmark' value={locationDetails?.landmark} onChange={e => optionchanged(e, "landmark")} {...register("landmark", { required: true, onChange: (e) => optionchanged(e, "landmark") })} />
                            </div>
                        </div>
                        {errors.landmark && <span className="formError errorMssg" style={{ color: 'red' }}> landmark required</span>}
                    </div>
                </div>
                <div className="card-title">Mark Locality on Map</div>
                <div className="card-body bg-dark">
                    <div id="chart-tasks" style={{ height: '15rem' }}></div>
                </div>
                <div className="alert alert-info" role="alert">
                    <strong>Note:-</strong> If you have any inquiries, please share details about your business with us. Our team of experts will thoroughly assess your needs and reach out to provide information on how RealEstateIndia.com can assist you in obtaining quotes for your business.
                </div>
            </div>
            <PropertySubmitButton title="Save & Continue" backClick={handleBackButton} />
        </form>
    )
}

export default PropertyLocalityDetails