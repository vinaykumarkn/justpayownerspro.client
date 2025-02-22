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

const PropertyLandDetails = ({ tabItems, setSideNavTabs, isSale, islandorPlot }) => {
    const { currentUser } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    const { jsonPropertyControls } = useSelector(state => state.propertyCatalog);
    const [landDetails, setLandDetails] = useState({
        PropertyType: "",
        SaleType: "",
        Ownership: "",
        PlotArea: "",
        LandUnits: "",
        ISMultiplePlots: "",
        FloorsAllowed: "",
        PlotLength: "",
        PlotWidth: "",
        BoundaryWall: "",
        GatedSecurity: ""
    });
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [propertyData, setPropertyData] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        if (params.tabtitle == "property") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null) {
                    setLandDetails(JSON.parse(data?.data?.PropertyObject || data?.data?.propertyObject).LandDetails);
                }
            });
        }
    }, [params.tabtitle == "property"]);

    useEffect(() => {
        if (landDetails) {
            reset(landDetails);
        }
    }, [landDetails]);

    const optionchanged = (e, id) => {
        setLandDetails(select => ({ ...select, [id]: e.target.value }));
    };

    const handleCheckBox = (e, id) => {
        setLandDetails(select => ({ ...select, [id]: e.target.checked ? "Yes" : "No" }));
    }

    const handleFormSubmit = async (data) => {
        try {
            setFormSubmitLoading(true);
            const postURL = (propertyData != null && propertyData != undefined && Object.keys(propertyData).length > 0) ? (JPOapi.Advertises.url + "/" + propertyData?.advertiseID) : (JPOapi.Advertises.url);
            const res = await fetch(postURL, {
                method: (propertyData != null && propertyData != undefined && Object.keys(propertyData).length > 0) ? JPOapi.Advertises.PUTmethod : JPOapi.Advertises.POSTmethod,
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
                    if (index === 1) {
                        return { ...item, isDisabled: false }
                    }
                    return item
                }));

                // redirect to next tab
                const path = generatePath(
                    islandorPlot ? "/manage/property/landorplot/sale/:guid/:tabtitle" :
                        isSale ? "/manage/property/commercial/sale/:guid/:tabtitle" :
                            "/manage/property/commercial/rent/:guid/:tabtitle",
                    {
                        ...params,       // <-- shallow copy in the existing param values
                        tabtitle: "location", // <-- override the specific param values from state/etc
                    },
                );
                navigate(path + "?" + new URLSearchParams({ justpayFr: "pyp_location" }).toString());
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
        const formData = PropertyModel.properties;
        //formData.PropertyObject = JSON.stringify({ "LandDetails": landDetails });
        //formData.userInfo = JSON.stringify({ "name": currentUser?.name, "email": currentUser?.email, "pic": currentUser?.pic != undefined ? currentUser?.pic : DefaultuserImg });

        formData.PropertyObject = JSON.stringify({
            LandDetails: landDetails,
            userInfo: {
                "name": currentUser?.name,
                "mobileNumber": maskMobileNumber(currentUser?.mobileNumber),
                "email": maskEmail(currentUser?.email),
                "pic": currentUser?.pic !== undefined ? currentUser?.pic : DefaultuserImg
            }
        });

        formData.advertiseID = params.guid;
        formData.adType = isSale ? "Sale" : "Rent";
        formData.propertyType = islandorPlot ? "LandOrPlot Sale" : (isSale ? "Commercial Sale" : "Commercial Rent");
        formData.userID = currentUser.id;
        formData.isActive = false;
        formData.status = "Draft";
        formData.listingStatus = "Listed";

        //generate property title based on the property details and title will be like example '2 BHK House For Lease In Krishnarajapura'
        formData.PropertyTitle = islandorPlot ? "LandOrPlot Sale" : (isSale ? "Commercial Sale" : "Commercial Rent");

        console.log(formData);
        console.log(propertyData);
        await handleFormSubmit(formData);
    });

    const handleBackButton = () => {
        navigate("/post-property-for-sale-rent");
    }
    return (
        <div className="card-body p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-sm-4 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Property Type<span className="form-required">*</span> </label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <select type="text" name='PropertyType' value={landDetails?.PropertyType} className="form-control"
                                            {...register("PropertyType", { required: true })} id="PropertyType"
                                            onChange={e => optionchanged(e, "PropertyType")}>
                                            <option value="" disabled >Select Property Type</option>
                                            {jsonPropertyControls?.LandPropertyType?.map((option, index) => (
                                                <option key={index} value={option}  > {option}</option>
                                            ))}
                                        </select>

                                    </div>
                                    {errors.PropertyType && <span className="formError errorMssg" style={{ color: 'red' }}> property type required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Sale Type<span className="form-required">*</span> </label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <select type="text" name='SaleType' value={landDetails?.SaleType} className="form-control" {...register("SaleType", { required: true })} id="SaleType"
                                            onChange={e => optionchanged(e, "SaleType")}>
                                            <option value="" disabled >Select Sale Type</option>
                                            {jsonPropertyControls?.SaleType?.map((option, index) => (
                                                <option key={index} value={option}  > {option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.SaleType && <span className="formError errorMssg" style={{ color: 'red' }}> sale type required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                        <div className="form-group">
                            <label className="control-label">Ownership<span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="input-group mb-0">
                                        <select type="text" name='Ownership' value={landDetails?.Ownership} className="form-control" {...register("Ownership", { required: true })} id="Ownership"
                                            onChange={e => optionchanged(e, "Ownership")}>
                                            <option value="" disabled >Select Ownership</option>
                                            {jsonPropertyControls?.Ownership?.map((option, index) => (
                                                <option key={index} value={option}  > {option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.Ownership && <span className="formError errorMssg" style={{ color: 'red' }}> ownership required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Plot Area<span className="form-required">*</span> </label>

                            <div className="input-group mb-0">
                                <input type="number" className="form-control" placeholder="Plot / Land Area" id="PlotArea" name="PlotArea" value={landDetails?.PlotArea} 
                                {...register("PlotArea", { required: true, onChange: e => optionchanged(e, "PlotArea") })} />
                                <div className="input-group-append">
                                    <span className="input-group-text" id="basic-addon2">
                                        <select type="text" name='LandUnits' value={landDetails?.LandUnits} className="form-select" {...register("LandUnits", { required: true })} id="LandUnits"
                                            onChange={e => optionchanged(e, "LandUnits")}>
                                            <option value="" disabled >Select Units</option>
                                            {jsonPropertyControls?.LandUnits?.map((option, index) => (
                                                <option key={index} value={option}  > {option}</option>
                                            ))}
                                        </select>
                                    </span>

                                </div>

                            </div>
                            {errors.PlotArea && <span className="formError errorMssg" style={{ color: 'red' }}> plot area required</span>}
                            {errors.LandUnits && <span className="formError errorMssg" style={{ color: 'red' }}>    Land units required</span>}
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="control-label">&nbsp;</label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="ISMultiplePlots" id="ISMultiplePlots" value={"Yes"} checked={landDetails?.ISMultiplePlots == "Yes"} onChange={(e) => handleCheckBox(e, "ISMultiplePlots")} />
                                        <span className="custom-control-label">Is Same Multiple Plot's Available ?</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="control-label">Floors allowed for Construction</label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                <input type="number" className="form-control" placeholder="Floors Allowed" id="FloorsAllowed" name="FloorsAllowed" value={landDetails?.FloorsAllowed} onChange={e => optionchanged(e, "FloorsAllowed")} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label">Length</label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                <input type="number" className="form-control" placeholder="Plot Length" id="PlotLength" name="PlotLength" value={landDetails?.PlotLength} onChange={e => optionchanged(e, "PlotLength")} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="control-label"> Width </label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                <input type="number" className="form-control" placeholder="Plot Width" id="PlotWidth" name="PlotWidth" value={landDetails?.PlotWidth} onChange={e => optionchanged(e, "PlotWidth")} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-md-4">
                        <div className="form-group">
                            <label className="control-label">
                                Boundary Wall
                            </label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="custom-controls-stacked">
                                        <label className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id="YesBoundry" name='BoundaryWall' value={"Yes"} checked={landDetails?.BoundaryWall == "Yes"} {...register("BoundaryWall", { required: true, onChange: e => optionchanged(e, "BoundaryWall") })} />
                                            <span className="custom-control-label">Yes</span>
                                        </label>
                                        <label className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id="NoBoundry" value={"No"} name='BoundaryWall' checked={landDetails?.BoundaryWall == "No"} {...register("BoundaryWall", { required: true, onChange: e => optionchanged(e, "BoundaryWall") })} />
                                            <span className="custom-control-label">No</span>
                                        </label>

                                    </div>
                                    {errors.BoundaryWall && <span className="formError errorMssg" style={{ color: 'red' }}> boundary wall required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="control-label">
                                Is the Land/Plot inside a gated project? <span className="form-required">*</span></label>
                            <div className="row gutters-xs">
                                <div className="col-12">
                                    <div className="custom-controls-stacked">
                                        <label className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id="YesGatedSecurity" name='GatedSecurity' value={"Yes"} checked={landDetails?.GatedSecurity == "Yes"} {...register("GatedSecurity", { required: true, onChange: e => optionchanged(e, "GatedSecurity") })} />
                                            <span className="custom-control-label">Yes</span>
                                        </label>
                                        <label className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" className="custom-control-input" id="NoGatedSecurity" value={"No"} checked={landDetails?.GatedSecurity == "No"} {...register("GatedSecurity", { required: true, onChange: e => optionchanged(e, "GatedSecurity") })} />
                                            <span className="custom-control-label">No</span>
                                        </label>
                                    </div>
                                    {errors.GatedSecurity && <span className="formError errorMssg" style={{ color: 'red' }}> gated security required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PropertySubmitButton title="Save & Continue" backClick={handleBackButton} />
            </form>
        </div>

    )
}

export default PropertyLandDetails