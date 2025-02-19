const backendDomain = 'http://justpayownerspro.runasp.net';

const JPOapi = {
    signUp: {
        url: `${backendDomain}/api/Auth/Register`,
        method: 'POST'
    },
    signIn: {
        url: `${backendDomain}/api/Auth/Login`,
        method: 'POST'
    },
    oneTimeRegister: {
        url: `${backendDomain}/api/Auth/oneTimeRegister`,
        method: 'POST'
    },
    GetUserInfoByMailID: {
        url: `${backendDomain}/api/Auth/GetUserInfoByMailID`,
        method: 'POST'
    },
    forgotPassword: {
        url: `${backendDomain}/api/Auth/ForgotPassword`,
        method: 'POST'
    },
    SendActivationUrl: {
        url: `${backendDomain}/api/Auth/SendActivationUrl`,
        method: 'POST'
    },
    resetPassword: {
        url: `${backendDomain}/api/Auth/ResetPassword`,
        method: 'POST'
    },
    confirmEmailLink: {
        url: `${backendDomain}/api/Auth/ConfirmEmail`,
        POSTmethod: 'POST',
    },
    Logout: {
        url: `${backendDomain}/api/Auth/logout`,
        method: 'POST'
    },
    validate: {
        url: `${backendDomain}/api/Auth/validate`,
        method: 'POST'
    },
    updateProfile: {
        url: `${backendDomain}/api/Auth/Update`,
        method: 'POST'
    },
    Advertises: {
        url: `${backendDomain}/api/DigitalAdvertisement`,
        POSTmethod: 'POST',
        GETmethod: 'GET',
        PUTmethod: 'PUT',
    },
    GetAdServiceUser: {
        url: `${backendDomain}/api/DigitalAdvertisement/GetAdServiceUser`,
        POSTmethod: 'POST',
        GETmethod: 'GET',
        PUTmethod: 'PUT',
    },
    GetAdServiceByUser: {
        url: `${backendDomain}/api/DigitalAdvertisement/GetALLAdServicesByUser`,
        POSTmethod: 'POST',
        GETmethod: 'GET',
        PUTmethod: 'PUT',
    },
    GetAdServiceByStatus: {
        url: `${backendDomain}/api/DigitalAdvertisement/GetAdServicesByStatus`,
        method: 'GET'
    },
    getUserDetail: {
        url: `${backendDomain}/api/Auth/user`,
        method: 'GET'
    },
    uploadPhotos: {
        url: `${backendDomain}/api/UploadPhotos/UploadPropertyPhotos`,
        method: 'POST'
    },
    deletePropertyPhotos: {
        url: `${backendDomain}/api/UploadPhotos/DeletePropertyPhotos`,
        method: 'POST'
    },
    propertyCatalog: {
        url: `${backendDomain}/api/PropertyCatalog`,
        method: 'GET'
    },
    PublishPropertyRentals: {
        url: `${backendDomain}/api/PropertyRentals/PublishPropertyRentals`,
        method: 'POST'
    },
    PublishPropertySales: {
        url: `${backendDomain}/api/PropertySales/PublishPropertySales`,
        method: 'POST'
    },
    UpdateAdServicesStatus: {
        url: `${backendDomain}/api/DigitalAdvertisement/UpdateAdServicesStatus`,
        method: 'PUT'
    },
    getBlogPosts: {
        url: `${backendDomain}/api/BlogPost`,
        method: 'GET'
    },
    getBlogPostsById: {
        url: `${backendDomain}/api/BlogPost`,
        method: 'GET'
    },
    getFAQs: {
        url: `${backendDomain}/api/FAQ`,
        method: 'GET'
    },
    getTestimonials: {
        url: `${backendDomain}/api/Testimonial`,
        method: 'GET'
    },
    UpdateFeedBack: {
        url: `${backendDomain}/api/Feedback`,
        method: 'POST'
    },
    UpdateComplaint: {
        url: `${backendDomain}/api/Complaint`,
        method: 'POST'
    },
    getPropertyRentals: {
        url: `${backendDomain}/api/PropertyRentals`,
        method: 'GET'
    },
    getPropertySales: {
        url: `${backendDomain}/api/PropertySales`,
        method: 'GET'
    },
    getCareers: {
        url: `${backendDomain}/api/Career`,
        method: 'GET'
    },
    GetPropertyResidentialRentalsById: {
        url: `${backendDomain}/api/PropertyRentals`,
        method: 'GET'
    },
    GetPropertyResidentialSalesById: {
        url: `${backendDomain}/api/PropertySales`,
        method: 'GET'
    },
    GetPropertyCommercialRentals: {
        url: `${backendDomain}/api/PropertyRentals/GetPropertyCommercialRentals`,
        method: 'GET'
    },
    GetPropertyResidentialRentals: {
        url: `${backendDomain}/api/PropertyRentals/GetPropertyResidentialRentals`,
        method: 'GET'
    },
    GetPropertyResidentialSales: {
        url: `${backendDomain}/api/PropertySales/GetPropertyResidentialSales`,
        method: 'GET'
    },
    GetPropertyCommercialSales: {
        url: `${backendDomain}/api/PropertySales/GetPropertyCommercialSales`,
        method: 'GET'
    },
    GetPropertyPlotSales: {
        url: `${backendDomain}/api/PropertySales/GetPropertyPlotSales`,
        method: 'GET'
    },
    GetPropertyByPropertyType: {
        url: `${backendDomain}/api/PropertyRentals/GetPropertyRentalsByCategory`,
        method: 'GET'
    },
    getTopCities: {
        url: `${backendDomain}/api/TopCities/GetTopCities`,
        method: 'GET'
    },
    getTopAreas:{
        url: `${backendDomain}/api/TopAreas/GetTopAreas`,
        method: 'GET'
    },
    UpdateEnquiry: {
        url: `${backendDomain}/api/AnonymousInquiry`,
        method: 'POST'
    },
    UpdateReport: {
        url: `${backendDomain}/api/PropertyReports`,
        method: 'POST'
    },
    UpdateGetContact: {
        url: `${backendDomain}/api/AnonymousContactOwner`,
        method: 'POST'
    },
    MyFavorites : {
        url: `${backendDomain}/api/MyFavorites`,
        method: 'POST'
    },
    GetFavoriteByUserID: {
        url: `${backendDomain}/api/MyFavorites/GetFavoriteByUserID`,
        method: 'GET'
    },
    CheckPageFavorites: {
        url: `${backendDomain}/api/MyFavorites/CheckPageFavorites`,
        method: 'GET'
    },
    DeleteMyFavourite: {
        url: `${backendDomain}/api/MyFavorites`,
        method: 'DELETE'
    },
    PublicCallEnquiry: {
        url: `${backendDomain}/api/PublicCallEnquiry`,
        method: 'POST'
    },
    GetEnquiryByPropertyID : {
        url: `${backendDomain}/api/PublicCallEnquiry/GetEnquiryByPropertyID`,
        method: 'GET'
    },
    GetExplorePropertyTypes: {
        url: `${backendDomain}/api/PropertyCatalog`,
        method: 'GET'
    }
}

export default JPOapi;