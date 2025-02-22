import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import PropertySubmitButton from "./PropertySubmitButton";
const PropertyGalleryUpload1 = ({ tabItems, setSideNavTabs, isSale, isCommercial, islandorPlot }) => {

    const { currentUser } = useSelector(state => state.user)
    const [formSubmitLoading, setFormSubmitLoading] = useState(false)
    const params = useParams();
    const navigate = useNavigate()
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        mode: "onChange"
    });

    const [images, setImages] = useState([]);
    const maxNumber = 69;

    useEffect(() => {
        //get the data from local storage
        const data = JSON.parse(localStorage.getItem(params.guid));
        if (data && data.GalleryDetails) {
            setImages(data.GalleryDetails);
        }
    }, []);

    useEffect(() => {
        if (images) {
            reset(images);
        }
    }, [images]);

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    const onSubmit = handleSubmit((data) => {
        const formData = JSON.parse(localStorage.getItem(params.guid));
        // add one more object to this local storage item with the key as "LocalityDetails"
        localStorage.setItem(params.guid, JSON.stringify({ ...formData, GalleryDetails: images }));
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
    });


    const handleFormSubmit = async (data) => {
        try {
            setFormSubmitLoading(true)
            const res = await fetch('api/posts/create', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    imgUrl: formData.imgUrl,
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
                navigate(`/listing/${serverRes._id}`)
                setFormSubmitLoading(false)
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
        <div className="card-body">
            <div className="row">
                <form className="dropzone dz-clickable" id="dropzone-custom" onSubmit={handleSubmit(onSubmit)}  >

                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
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
                                    <div className="card-body">
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
                                            <div className="ml-auto">
                                                <button type="button" className="btn btn-primary" style={isDragging ? { color: "red" } : null} onClick={onImageUpload} {...dragProps}><i className="fe fe-plus"></i> Click or Drop here</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                                <strong> Photos added by you({imageList.length}) </strong>
                                <div className="row">
                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <img src={image.data_url} alt="" width="100" />
                                            <div className="image-item__btn-wrapper">
                                                <button type="button" onClick={() => onImageUpdate(index)}>Update</button>
                                                <button type="button" onClick={() => onImageRemove(index)}>Remove</button>
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

export default PropertyGalleryUpload1