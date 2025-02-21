import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import PropertySubmitButton from "./PropertySubmitButton";
import JPOapi from "../../common";
import PropertyModel from "../../common/property/PropertyModel";
import { toast } from "react-toastify";
import '../../assets/css/image-gallery.css'
import fetchAdvartiseData from "../../common/property/getPropertyAdvartiseData";
import Swal from 'sweetalert2';
import DefaultuserImg from '../../assets/img/DefaultUserImg.jpg';


const PropertyGalleryUpload = ({ tabItems, setSideNavTabs, isSale, isCommercial, islandorPlot }) => {

    const { currentUser } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [propertyData, setPropertyData] = useState([]);
    const params = useParams();
    const navigate = useNavigate()
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const [images, setImages] = useState([]);
    const [serverImages, setServerImages] = useState([]); // this is the images that are already uploaded to the server
    const maxNumber = 12;


    useEffect(() => {
        if (params.tabtitle == "gallery") { // to get fresh data from server when tab is clicked
            fetchAdvartiseData(params.guid, userId).then((data) => {
                setPropertyData(data?.data);
                if (data != null && data.data != null) {
                    setServerImages(JSON.parse(data?.data?.propertyObject).GalleryDetails);
                }
            });
        }
    }, [params.tabtitle == "gallery"]);

    useEffect(() => {
        if (serverImages) {
            reset(serverImages);
        }
    }, [serverImages]);



    const onChange = async (imageList, addUpdateIndex) => {
        if (imageList.length > maxNumber) {
            Swal.fire({
                title: 'You can only upload up to ' + maxNumber + ' images',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setImages(imageList.slice(0, maxNumber));
        } else {
            setImages(imageList);
        }
    };



    const onSubmit = handleSubmit(async (data) => {

        if (images.length === 0 && serverImages.length === 0) {
            alert("Please upload images");
            return;
        }

        const formData1 = new FormData();
        Array.from(images).forEach(file => {
            formData1.append('files', file.file);
            console.log(file);
        });

        try {
            const response = await fetch((propertyData != null && Object.keys(propertyData).length > 0) ? JPOapi.uploadPhotos.url + "?propertyId=" + propertyData?.advertiseID : JPOapi.uploadPhotos.url, {
                method: JPOapi.uploadPhotos.method,
                body: formData1,
            });

            const result = await response.json();
            console.log('File upload response:', result);
            // loop through the images and take filePath and return it as an array
            const images = result?.data?.map((item) => item.filePath);
            console.log(images);

            const propertyDataVal = JSON.parse(propertyData.propertyObject);

            const resaleObj = { GalleryDetails: serverImages != undefined ? [...serverImages, ...images] : [...images] };


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

        } catch (error) {
            console.error('Error uploading files:', error);
        }
    });


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
                    if ((isSale == true && index === 4) || index == 5) {
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
                        tabtitle: isSale ? "additionalInfo" : "schedule", // <-- override the specific param values from state/etc
                    },
                );

                navigate(path + "?" + new URLSearchParams({ justpayFr: isSale ? "pyp_additionalInfo" : "pyp_schedule" }).toString());
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }

    const handleBackButton = () => {
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

    return (
        <div id="property-gallery-upload" className="card-body p-3 px-0">
            <div className="row">
                <form className="dropzone dz-clickable pl-0 pr-5" method="post" action="#" encType="multipart/form-data" id="dropzone-custom" onSubmit={handleSubmit(onSubmit)}  >

                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        //maxNumber={maxNumber}
                        dataURLKey="data_url"
                        acceptType={["jpg"]}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps
                        }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="mb-4 text-center">
                                            {/* <img src="" alt="Apple iPhone 7 128GB" className="img-fluid" /> */}
                                        </div>
                                        <h4 className="card-title">Improve your interaction by including images to get five times more responses.</h4>
                                        <div className="card-subtitle">
                                        </div>
                                        <div className="mt-5 d-flex align-items-center">
                                            <div className="product-price">
                                                <strong></strong>
                                            </div>
                                            <div className="mx-auto">
                                                <button id="gallery-upload-btn" type="button" className="btn btn-primary" style={isDragging ? { color: "red" } : null} onClick={onImageUpload} {...dragProps}><i className="fe fe-plus"></i> Click or Drop here</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                <strong className="px-3"> Photos added by you({serverImages == undefined ? imageList.length : serverImages.length}) </strong>
                                <div className="row">
                                    {serverImages?.map((image, index) => (
                                        <div key={index} className="image-item col-md-3">
                                            <div className="card">
                                                <div className="card-header">
                                                    <img src={image} alt="" width="100" />

                                                </div>
                                                <div className="image-item__btn-wrapper text-center card-body">
                                                    <button type="button" onClick={() => onImageRemove(index)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {images.map((image, index) => (
                                        <div key={index} className="image-item col-md-3">
                                            <div className="card">
                                                <div className="card-header">
                                                    <img className="w-100" src={image.data_url} alt="" width="100" />
                                                </div>
                                                <div className="image-item__btn-wrapper text-center card-body">
                                                    <button type="button" onClick={() => onImageRemove(index)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ImageUploading>

                    <div className="card-header"></div>

                    <div className="col-md-12">
                        <div className="alert alert-primary">Are you in trouble? We can upload photos on your behalf </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Whatsapp us on</h3>
                                    </div>
                                    <div className="card-body">
                                        <div id="chart-donut" >0-9241-700-000</div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Email to</h3>
                                    </div>
                                    <div className="card-body">
                                        <div id="chart-pie" >0-9241-700-000</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PropertySubmitButton title="Save & Continue" backClick={handleBackButton} />
                </form>
            </div>
        </div>
    )
}

export default PropertyGalleryUpload